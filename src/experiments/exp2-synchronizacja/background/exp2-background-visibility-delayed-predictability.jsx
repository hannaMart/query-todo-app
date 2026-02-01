import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// "сервер" с задержкой 1500ms (симметрия с manual delayed)
function fetchDataDelayed() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ value: new Date().toLocaleTimeString() });
    }, 1500);
  });
}

export default function BackgroundVisibilityDelayedPredictabilityQuery() {
  const [log, setLog] = useState([]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLog((prev) => [`${time} — ${msg}`, ...prev].slice(0, 12));
  };

  const {
    data,
    isLoading,
    isFetching,
    dataUpdatedAt,
    fetchStatus,
    status,
    refetch,
  } = useQuery({
    queryKey: ["exp2-bg-visibility-delayed-predictability-query"],
    queryFn: fetchDataDelayed,
    staleTime: 0,
    refetchOnWindowFocus: true, // тот же триггер, что и раньше
    // важно: keepPreviousData в v5 убрали; по умолчанию data остаётся при refetch
  });

  // ручной refetch-кнопкой для стресс-теста (не меняет условия, просто помогает тестировать)
  const onManualRefetch = () => {
    addLog("MANUAL refetch() click");
    refetch();
  };

  return (
    <div className="page">
      <h2>Background — visibility (query, delayed + predictability)</h2>

      <p style={{ marginBottom: 12 }}>
        Условия те же: refetch при возврате во вкладку + задержка 1500ms.
        Проверяем предсказуемость и сохранение data во время refetch.
      </p>

      {isLoading && <p>Loading…</p>}

      {!isLoading && (
        <>
          <div className="card" style={{ marginBottom: 16 }}>
            <div><b>Status:</b> {status}</div>
            <div><b>fetchStatus:</b> {fetchStatus}</div>
            <div><b>isFetching:</b> {String(isFetching)}</div>

            <hr />

            <div><b>Data:</b> {data?.value}</div>
            <div>
              <b>dataUpdatedAt:</b>{" "}
              {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "-"}
            </div>
            <div><b>visibilityState:</b> {document.visibilityState}</div>

            {isFetching && (
              <div style={{ marginTop: 8 }}>
                <i>Фоновое обновление… старые данные остаются.</i>
              </div>
            )}

            <div style={{ marginTop: 12 }}>
              <button onClick={onManualRefetch}>Manual refetch (stress)</button>
            </div>
          </div>

          <div className="card">
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <b>Лог:</b>
              <button
                onClick={() => setLog([])}
                style={{ marginLeft: "auto" }}
              >
                Clear log
              </button>
            </div>

            <ul style={{ marginTop: 10 }}>
              {log.length === 0 ? (
                <li>
                  Лог пуст. Сделай быстрые переключения вкладок или нажми manual
                  refetch несколько раз.
                </li>
              ) : (
                log.map((line, i) => <li key={i}>{line}</li>)
              )}
            </ul>

            <p style={{ marginTop: 10 }}>
              Наблюдение: при множественных refetch данные не должны “скакать
              назад”. В query это обычно предсказуемо: применяется последний
              завершившийся запрос для данного queryKey, а UI не очищается.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
