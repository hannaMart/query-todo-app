import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { simulateFetchTodos } from "./forErrAPI";

export default function Exp2ErrorsQuery() {
  const [isFailure, setIsFailure] = useState(false);

  const query = useQuery({
    queryKey: ["exp2c-errors", { isFailure }],
    queryFn: () => simulateFetchTodos({ isFailure, delay: 2000 }),
    enabled: false, // jak w manual: start dopiero po kliknięciu "Fetch"
    retry: 0, // jak w manual: Retry robimy ręcznie przyciskiem
  });

  const handleFetch = () => {
    query.refetch();
  };

  return (
    <div className="page">
      <h2>Exp2c — Errors / retry (query)</h2>

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
          {query.data?.map((t) => (
            <li key={t.id}>{t.todoName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
