import { useEffect, useState } from "react";

export default function BackgroundVisibility() {
  const [version, setVersion] = useState(1);
  const [updatedAt, setUpdatedAt] = useState(() => new Date().toLocaleTimeString());
  const [trigger, setTrigger] = useState("init");

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        setVersion((v) => v + 1);
        setUpdatedAt(new Date().toLocaleTimeString());
        setTrigger("visibility:visible");
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="page">
      <h2>Background — visibility</h2>

      <p>
        “Данные” обновляются <b>только</b> при возврате во вкладку
        (visibility → visible).
      </p>

      <div className="card">
        <div><b>Версия:</b> v{version}</div>
        <div><b>Обновлено:</b> {updatedAt}</div>
        <div><b>Триггер:</b> {trigger}</div>
        <div><b>visibilityState:</b> {document.visibilityState}</div>
      </div>
    </div>
  );
}
