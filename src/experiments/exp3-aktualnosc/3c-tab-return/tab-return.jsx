import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetchFreshness } from "../../../fakeServer/fakeAPI";

const STALE_TIME_MS = 30_000;

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
      <h2>3c. Aktualność danych po powrocie do karty przeglądarki</h2>

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
        <strong>Pobieranie w toku: </strong> {isFetching ? "tak" : "nie"}
      </p>

      <p>
        <strong>Todos:</strong>
      </p>

      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <Link to="/exp3">← Powrót</Link>
    </div>
  );
}
