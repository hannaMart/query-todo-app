import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// "сервер": вернуть значение сразу (без задержки)
async function fetchSnapshotTime() {
  return new Date().toLocaleTimeString();
}

export default function BgBasicQuery() {
  // реальные часы (всегда идут)
  const [realTime, setRealTime] = useState(
    () => new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const id = setInterval(() => {
      setRealTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const { data: snapshotTime } = useQuery({
    queryKey: ["exp2-bg-base-query"],
    queryFn: fetchSnapshotTime,
    staleTime: Infinity,          // не устаревает
    refetchOnWindowFocus: false,  // НЕ обновляется при возврате во вкладку
    initialData: () => new Date().toLocaleTimeString(), // baseline = сразу
  });

  return (
    <div className="page">
      {/* Реальные часы */}
      <div style={{ marginBottom: 16 }}>
        <strong>Реальное время:</strong> {realTime}
      </div>

      <hr />

      {/* Блок эксперимента */}
      <h2>Background — base (query)</h2>

      <p>
        Снимок времени (UI): <b>{snapshotTime}</b>
      </p>
    </div>
  );
}
