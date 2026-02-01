import { useQuery } from "@tanstack/react-query";

// сервер — без задержки
function fetchDataInstant() {
  return Promise.resolve({ value: new Date().toLocaleTimeString() });
}

export default function BackgroundVisibilityQuery() {
  const { data, isLoading, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ["exp2-bg-visibility-query"],
    queryFn: fetchDataInstant,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="page">
      <h2>Background — visibility (query)</h2>

      {isLoading && <p>Loading…</p>}

      {!isLoading && (
        <div className="card">
          <div><b>Data:</b> {data?.value}</div>
          <div><b>isFetching:</b> {String(isFetching)}</div>
          <div>
            <b>dataUpdatedAt:</b>{" "}
            {dataUpdatedAt
              ? new Date(dataUpdatedAt).toLocaleTimeString()
              : "-"}
          </div>
          <div><b>visibilityState:</b> {document.visibilityState}</div>
        </div>
      )}
    </div>
  );
}
