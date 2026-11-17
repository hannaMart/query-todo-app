import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetchFreshness } from "../../../fakeServer/fakeAPI";

const STALE_TIME_MS = 30_000;

export default function Exp3PageReturnQuery() {
  const { data, isLoading, isFetching } = useQuery({
    // Отдельный ключ изолирует 3b от других частей PB3.
    queryKey: ["pb3", "page-return"],

    // Тот же fake API, что и в manual.
    queryFn: fakeFetchFreshness,

    // Аналог ручного TTL = 60 секунд.
    staleTime: STALE_TIME_MS,
  });

  return (
    <div className="page">
      <h2>3b. Aktualność danych przy powrocie na stronę</h2>

      {isLoading && <p>Loading…</p>}

      {data && (
        <>
          <p>
            <strong>Ostatnie pobranie:</strong>{" "}
            {new Date(data.fetchedAt).toLocaleTimeString("pl-PL", {
              timeZone: "Europe/Warsaw",
              hour12: false,
            })}
          </p>
          <p>
            <strong>Numer żądania:</strong> {data.requestId}
          </p>
          <p>
            <strong>Pobieranie w toku</strong> {isFetching ? "tak" : "nie"}
          </p>

          <p>
            <strong>Lista zadań:</strong>
          </p>

          <ul>
            {data.todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </>
      )}

      <Link to="/exp3">← Powrót</Link>
    </div>
  );
}
