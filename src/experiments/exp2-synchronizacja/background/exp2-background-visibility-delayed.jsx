
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { simulateFetchTodos } from "../../../fakeServer/fakeAPI";

export default function Exp2BackgroundVisibilityDelayedQuery() {
  const queryClient = useQueryClient();
  const queryKey = ["exp2-bg-visibility-delayed-query"];

  const { data, isFetching, dataUpdatedAt } = useQuery({
    queryKey,

    queryFn: async () => {
      // Pierwsze pobranie bez opóźnienia, kolejne z opóźnieniem
      const delay = queryClient.getQueryData(queryKey) ? 3000 : 0;

      const todos = await simulateFetchTodos({ delay });

      return {
        todos,
        version: Math.floor(Math.random() * 100) + 1,
      };
    },

    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const updatedAt = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("pl-PL")
    : "—";

  return (
    <div className="page">
      <h2>Background — Visibility + Delayed</h2>

      <p>
        Aktualizacja danych po powrocie do karty
        z opóźnieniem 3000 ms.
      </p>

      <div className="card">
        <div>
          <b>Aktualizacja w toku:</b> {isFetching ? "Tak" : "Nie"}
        </div>

        <div>
          <b>Wersja odpowiedzi:</b> {data?.version ?? "—"}
        </div>

        <div>
          <b>Ostatnia aktualizacja:</b> {updatedAt}
        </div>

        {isFetching && <p><i>Aktualizowanie danych…</i></p>}

        <hr />

        <b>Lista zadań:</b>
        <ul>
          {data?.todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>

        <Link to="/exp2">← Wróć</Link>
      </div>
    </div>
  );
}
