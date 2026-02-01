import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// задержка 1500ms как в manual
async function fetchDelayed() {
  await sleep(1500);
  return {
    version: Math.floor(Math.random() * 100),
    updatedAt: new Date().toLocaleTimeString(),
  };
}

export default function BackgroundVisibilityDelayedQuerySafe() {
  const [cleared, setCleared] = useState(false);
  const [lastApplied, setLastApplied] = useState("init");

  // только для наглядности (НЕ защита)
  const triggerCounter = useRef(0);

  const { data, isFetching, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["exp2-bg-visibility-delayed-safe-query"],
    queryFn: fetchDelayed,

    // мы полностью управляем триггерами сами (как в manual)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 0,

    // стартовые данные, чтобы не было "пусто" до первого запроса
    initialData: () => ({
      version: 1,
      updatedAt: new Date().toLocaleTimeString(),
    }),
  });

  const runRequest = async (label) => {
    const id = ++triggerCounter.current;

    // имитируем manual: провал UI во время обновления
    setCleared(true);

    // запускаем запрос вручную
    const result = await refetch();

    // если это был самый последний триггер — отмечаем как применённый
    // (в Query реальная защита встроена: "старый ответ" не должен перезатереть новый)
    if (id === triggerCounter.current && result.data) {
      setLastApplied(`${label} / trigger#${id}`);
    }

    setCleared(false);
  };

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      runRequest("visibility");
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doubleTrigger = () => {
    runRequest("manual-1");
    setTimeout(() => runRequest("manual-2"), 100);
  };

  const shownData = cleared ? null : data;

  return (
    <div className="page">
      <h2>Background — visibility (query, delayed SAFE)</h2>

      <p>
        В Query нет “проблемы устаревших ответов” для одного queryKey:
        библиотека защищает от перезаписи старыми результатами.
        Здесь мы запускаем 2 обновления подряд и наблюдаем, что применится “последнее ожидаемое”.
      </p>

      <div className="card">
        <div><b>Loading (isFetching):</b> {String(isFetching)}</div>
        <div><b>visibilityState:</b> {document.visibilityState}</div>
        <div><b>Последний применённый ответ:</b> {lastApplied}</div>

        <hr />

        <div><b>Версия:</b> {shownData ? `v${shownData.version}` : "—"}</div>
        <div><b>Обновлено:</b> {shownData ? shownData.updatedAt : "—"}</div>
        <div>
          <b>dataUpdatedAt:</b>{" "}
          {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "-"}
        </div>

        {isFetching && (
          <div style={{ marginTop: 8 }}>
            <i>Обновление… (1500ms)</i>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <button onClick={doubleTrigger}>Запустить 2 обновления подряд</button>
        </div>
      </div>
    </div>
  );
}
