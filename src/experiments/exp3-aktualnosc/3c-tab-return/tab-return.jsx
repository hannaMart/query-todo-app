import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetchFreshness } from "../../../fakeServer/fakeAPI";

const STALE_TIME_MS = 60_000;

export default function Exp3TabReturnQuery() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["pb3", "tab-return"],
    queryFn: fakeFetchFreshness,

    // Данные считаются свежими 60 секунд.
    staleTime: STALE_TIME_MS,

    // При возврате на вкладку React Query проверяет,
    // устарели ли данные, и при необходимости делает refetch.
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="page">
      <h2>PB3 – 3c – Query – возврат на вкладку</h2>

      <p>
        <strong>Fetching:</strong> {isFetching ? "yes" : "no"}
      </p>

      <p>
        <strong>Fetched at:</strong> {data.fetchedAt}
      </p>

      <p>
        <strong>Request ID:</strong> {data.requestId}
      </p>

      <p><strong>Todos:</strong></p>

      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <Link to="/exp3">← Powrót</Link>
    </div>
  );
}