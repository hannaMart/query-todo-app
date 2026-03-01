import { useQuery } from "@tanstack/react-query";
import { fakeFetch } from "./fakeFetch";

export default function Exp3NoFreshness() {
  const { data, isLoading } = useQuery({
    queryKey: ["pb3", "no-freshness"],
    queryFn: fakeFetch,
    // Это 3a

    // Поведение:
    // нет staleTime
    // каждый mount = новый запрос
    // база для сравнения
    
    // ВАЖНО:
    // нет staleTime
    // нет cacheTime / gcTime
    // намеренно без контроля актуальности
  });

  return (
    <div>
      <h2>PB3 – 3a – Query (no freshness)</h2>

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
