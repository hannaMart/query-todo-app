import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { simulateFetchTodos } from "../../../fakeServer/fakeAPI";

export default function Exp2ErrorsLoadingQuery() {
  const queryClient = useQueryClient();

  // CASE 1
  // Сравнение с manual BUG 1:
  // в manual можно установить loading и забыть завершить его.
  // В React Query isFetching связан с реальным запросом
  // и автоматически меняется после его завершения.

  const [fail1, setFail1] = useState(false);

  const q1 = useQuery({
    queryKey: ["exp2-errors-loading-1"],
    queryFn: () =>
      simulateFetchTodos({
        isFailure: fail1,
        delay: 1200,
      }),
    enabled: false,
    retry: 0,
  });

  const start1 = () => {
    q1.refetch();
  };

  const reset1 = () => {
    queryClient.resetQueries({
      queryKey: ["exp2-errors-loading-1"],
    });
  };

  // CASE 2
  // Сравнение с manual BUG 2:
  // первый запрос заканчивается ошибкой,
  // затем выполняется retry того же query.
  //
  // В manual можно забыть снова установить loading.
  // React Query при refetch автоматически устанавливает isFetching=true.

  const shouldFail = useRef(true);

  const q2 = useQuery({
    queryKey: ["exp2-errors-loading-2"],
    queryFn: () =>
      simulateFetchTodos({
        isFailure: shouldFail.current,
        delay: 800,
      }),
    enabled: false,
    retry: 0,
  });

  const start2Fail = () => {
    shouldFail.current = true;
    q2.refetch();
  };

  const retry2Ok = () => {
    shouldFail.current = false;
    q2.refetch();
  };

const reset2 = () => {
  shouldFail.current = true;

  queryClient.resetQueries({
    queryKey: ["exp2-errors-loading-2"],
  });
};

  return (
    <div className="page">
      <h2>Exp2 — Loading / errors — React Query</h2>

      <hr />

      <h3>CASE 1 — loading nie pozostaje zablokowany</h3>

      <label>
        <input
          type="checkbox"
          checked={fail1}
          onChange={(e) => setFail1(e.target.checked)}
        />
        Symuluj błąd
      </label>

      <br />
      <br />

      <button onClick={start1} disabled={q1.isFetching}>
        Start
      </button>

      <button onClick={reset1}>Reset</button>

      <div>
        Status:{" "}
        {q1.isFetching
          ? "loading"
          : q1.isError
          ? "error"
          : q1.isSuccess
          ? "success"
          : "idle"}
      </div>

      {q1.isFetching && <div>Loading…</div>}
      {q1.isError && !q1.isFetching && (
        <div>Błąd: {q1.error?.message}</div>
      )}

      {q1.isSuccess && (
        <ul>
          {q1.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}

      <hr />

      <h3>CASE 2 — retry otrzymuje stan loading</h3>

      <button onClick={start2Fail} disabled={q2.isFetching}>
        Start z błędem
      </button>

      <button
        onClick={retry2Ok}
        disabled={!q2.isError || q2.isFetching}
      >
        Retry z OK
      </button>

      <button onClick={reset2}>Reset</button>

      <div>
        Status:{" "}
        {q2.isFetching
          ? "loading"
          : q2.isError
          ? "error"
          : q2.isSuccess
          ? "success"
          : "idle"}
      </div>

      {q2.isFetching && <div>Loading…</div>}
      {q2.isError && !q2.isFetching && (
        <div>Błąd: {q2.error?.message}</div>
      )}

      {q2.isSuccess && (
        <ul>
          {q2.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}