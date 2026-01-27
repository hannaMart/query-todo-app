import { useEffect, useState } from "react";

export default function BgBasic() {
  // реальные часы (всегда идут)
  const [realTime, setRealTime] = useState(
    new Date().toLocaleTimeString()
  );

  // снимок для эксперимента (меняется только по триггеру)
  const [snapshotTime, setSnapshotTime] = useState("");

  useEffect(() => {
    // реальные часы обновляются всегда
    const clockId = setInterval(() => {
      setRealTime(new Date().toLocaleTimeString());
    }, 1000);

    // baseline: берем время ОДИН РАЗ
    setSnapshotTime(new Date().toLocaleTimeString());

    return () => clearInterval(clockId);
  }, []);

  return (
    <div className="page">
      {/* Реальные часы */}
      <div style={{ marginBottom: 16 }}>
        <strong>Реальное время:</strong> {realTime}
      </div>

      <hr />

      {/* Блок эксперимента */}
      <h2>Background — base</h2>
      <p>
        Снимок времени (UI): <b>{snapshotTime}</b>
      </p>
    </div>
  );
}
