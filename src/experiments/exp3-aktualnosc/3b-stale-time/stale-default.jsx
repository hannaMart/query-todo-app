import { useQuery } from "@tanstack/react-query";
import { fakeFetch } from "../fakeFetch";

export default function Exp3StaleDefault() {
  const { data, isLoading } = useQuery({
    queryKey: ["pb3", "stale-default"],
    queryFn: fakeFetch,
    // staleTime НЕ задаём (default)
  });

  return (
    <div>
      <h2>PB3 – 3b – Query (staleTime = default)</h2>

      {isLoading && <p>Loading…</p>}

      {data && (
        <div>
          <p>
            <strong>Fetched at:</strong> {data.fetchedAt}
          </p>
          <p>
            <strong>Request ID:</strong> {data.requestId}
          </p>

          <p>
            <strong>Todos:</strong>
          </p>
          <ul>
            {data.todos.map((t) => (
              <li key={t.id}>{t.todoName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
