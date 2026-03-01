import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetch } from "../fakeFetch";

const STALE_TIME_MS = 60000;

export default function Exp3ReturnQuery() {
  const { data, isFetching } = useQuery({
    queryKey: ["exp3-3c"],
    queryFn: fakeFetch,
    staleTime: STALE_TIME_MS,
  });

  if (!data) return <p>Loading…</p>;

  return (
    <div className="page">
      <h2>PB3 – 3c – Возврат после перерыва (React Query)</h2>

      <p><strong>Fetching:</strong> {isFetching ? "yes" : "no"}</p>
      <p><strong>Fetched at:</strong> {data.fetchedAt}</p>
      <p><strong>Request ID:</strong> {data.requestId}</p>

      <p><strong>Todos:</strong></p>
      <ul>
        {data.todos.map((t) => (
          <li key={t.id}>{t.todoName}</li>
        ))}
      </ul>

      <br />
      <Link to="/exp3">
        ← Назад к выбору сценария
      </Link>
    </div>
  );
}