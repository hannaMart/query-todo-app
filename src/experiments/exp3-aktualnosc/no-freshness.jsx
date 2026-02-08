import { useQuery } from "@tanstack/react-query";
import { fakeFetchPB3 } from "./fakeFetch";

export default function Exp3NoFreshnessQuery() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["pb3", "no-freshness"],
    queryFn: fakeFetchPB3,
    // 👶 специально НИЧЕГО не задаём:
    // staleTime не трогаем, cacheTime/gcTime не трогаем
  });

  return (
    <div>
      <h2>PB3 – 3a – React Query (no freshness config)</h2>

      {isLoading && <p>Loading…</p>}

      {error && <p>Ошибка запроса.</p>}

      {data && (
        <div>
          <p>
            <strong>Data:</strong> {data.value}
          </p>
          <p>
            <strong>Fetched at:</strong> {data.fetchedAt}
          </p>
          <p>
            <strong>Request count:</strong> {data.requestCount}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {isFetching ? "Fetching…" : "Idle"}
          </p>
        </div>
      )}
    </div>
  );
}
