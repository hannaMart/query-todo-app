// exp2-background.jsx  (QUERY / base — без фонового обновления)
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// "сервер": вернуть значение сразу (без задержки)
function fetchSnapshotTime() {
  return Promise.resolve(new Date().toLocaleTimeString());
}

export default function BgBasicQuery() {
  const [realTime, setRealTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const id = setInterval(() => setRealTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  const { data: snapshotTime, isLoading, isError } = useQuery({
    queryKey: ["exp2-bg-base-query"],
    queryFn: fetchSnapshotTime,
    staleTime: Infinity,          // не устаревает
    refetchOnWindowFocus: false,  // НЕ обновляется при возврате во вкладку
  });

  return (
    <div className="page">
      <div style={{ marginBottom: 16 }}>
        <strong>Реальное время:</strong> {realTime}
      </div>

      <hr />

      <h2>Background — base (query)</h2>

      {isLoading && <p>Loading…</p>}
      {isError && <p>Error</p>}

      {!isLoading && !isError && (
        <p>
          Снимок времени (UI): <b>{snapshotTime}</b>
        </p>
      )}
    </div>
  );
}
