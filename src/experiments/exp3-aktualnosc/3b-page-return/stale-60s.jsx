import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetchFreshness } from "../../../fakeServer/fakeAPI";

const STALE_TIME_MS = 60_000;

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
      <h2>PB3 – 3b – Query – возврат на страницу</h2>

      {isLoading && <p>Loading…</p>}

      {data && (
        <>
          <p>
            <strong>Request ID:</strong> {data.requestId}
          </p>

          <p>
            <strong>Fetched at:</strong> {data.fetchedAt}
          </p>

          <p>
            <strong>Fetching:</strong> {isFetching ? "yes" : "no"}
          </p>

          <p>
            <strong>Todos:</strong>
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