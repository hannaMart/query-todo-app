import { useQuery } from "@tanstack/react-query";
import { fakeFetchFreshness } from "../../fakeServer/fakeAPI";

export default function Exp3Baseline() {
  const { data, isLoading } = useQuery({
    queryKey: ["pb3", "no-freshness"],
    queryFn: fakeFetchFreshness,
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
      <h2>3a. Domyślne zachowanie przy pobieraniu danych</h2>

      {isLoading && <p>Loading…</p>}

      {data && (
        <div>
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
            <strong>Todos:</strong>
          </p>
          <ul>
            {data.todos.map((t) => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
