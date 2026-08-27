import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { simulateFetchTodos } from "../../../fakeServer/fakeAPI";

export default function Exp2ErrorsQuery() {
  const [isFailure, setIsFailure] = useState(false);

  const query = useQuery({
    // Один и тот же server-state во всём сценарии.
    queryKey: ["exp2-errors"],

    // Тот же fake API и та же задержка, что в manual.
    queryFn: () =>
      simulateFetchTodos({
        isFailure,
        delay: 2000,
      }),

    // Как в manual: запрос запускается только кнопкой.
    enabled: false,

    // Автоматический retry отключаем,
    // чтобы условия сравнения были одинаковыми.
    retry: 0,
  });

  const handleFetch = () => {
    query.refetch();
  };

  return (
    <div className="page">
      <h2>Exp2 — Errors / retry (React Query)</h2>

      <label>
        <input
          type="checkbox"
          checked={isFailure}
          onChange={(e) => setIsFailure(e.target.checked)}
        />
        Symuluj błąd zapytania
      </label>

      <br />
      <br />

      <button onClick={handleFetch} disabled={query.isFetching}>
        Fetch
      </button>

      {query.isFetching && <div>Loading…</div>}

      {query.isError && (
        <div>
          <div>Błąd: {query.error?.message}</div>

          <button onClick={handleFetch} disabled={query.isFetching}>
            Retry
          </button>
        </div>
      )}

      {query.isSuccess && (
        <ul>
          {query.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Manual BUG: Fetch успешно → появился список → включить ошибку → Fetch → появляется ошибка, но старый список остаётся. Это и есть демонстрируемый баг.
// Manual FIX: та же последовательность → при ошибке старый список исчезает, потому что ты сама написала setData(null); после снятия checkbox и Retry список появляется снова.
// React Query: визуально ведёт себя как FIX: успех → ошибка → Retry → успех, но тебе не приходится вручную вести status, errorMsg и переходы между состояниями — Query даёт isError, isSuccess, isFetching.

// И важная точность: React Query не обязательно физически удаляет старые данные из кеша при ошибке. Просто твой интерфейс при isError их не отображает. Поэтому вывод не «Query очищает данные», а «Query предоставляет согласованную модель состояния запроса, а в Manual эту логику разработчик формирует сам».

//  в нашем конкретном сценарии надо говорить точно.

// React Query при неудачном повторном запросе не удаляет предыдущие успешные данные из кеша. query.data остаётся.

// Но наш JSX показывает список только при:

// query.isSuccess

// После ошибки isError === true, поэтому старые данные не отображаются, хотя в кеше они есть.

// То есть отличие от Manual FIX важное:

// Manual FIX: мы сами физически делаем setData(null).
// React Query: старые данные сохраняет, а состояние запроса (error) управляется отдельно.