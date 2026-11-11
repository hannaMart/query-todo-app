import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
        <strong>Aktualny czas:</strong> {realTime}
      </div>

      <hr />

      <h2>Background — Base</h2>
      <p>
        Czas ostatniego odczytu: <b>{snapshotTime}</b>
      </p>
      <br/>
      <Link to="/exp2">← Wróć</Link>
    </div>
  );
}
