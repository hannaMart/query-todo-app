
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetchFreshness } from "../../fakeServer/fakeAPI";

const INTERVAL_MS = 15_000;

export default function Exp3PollingQuery() {
  const { data } = useQuery({
    queryKey: ["pb3", "polling"],
    queryFn: fakeFetchFreshness,
    staleTime: 30_000,
    refetchInterval: INTERVAL_MS,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="page">
      <h2>3d. Okresowe pobieranie danych (polling)</h2>

      <p><strong>Interwał:</strong> 10 sekund</p>

      {data ? (
        <>
          <p>
            <strong>Ostatnie pobranie:</strong>{" "}
            {new Date(data.fetchedAt).toLocaleTimeString("pl-PL")}
          </p>
          <p><strong>Numer żądania:</strong> {data.requestId}</p>

          <p><strong>Todos:</strong></p>
          <ul>
            {data.todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Ładowanie danych…</p>
      )}

      <Link to="/exp3">← Powrót</Link>
    </div>
  );
}
