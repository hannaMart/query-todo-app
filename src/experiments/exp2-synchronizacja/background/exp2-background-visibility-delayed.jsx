import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// сервер — с задержкой (как в manual)
async function fetchDataDelayed() {
  await sleep(1500);
  return {
    version: (Math.random() * 100).toFixed(0),
    updatedAt: new Date().toLocaleTimeString(),
  };
}

export default function Exp2BackgroundVisibilityDelayedQuery() {
  // локальная "намеренная очистка UI" (как setData(null) в manual)
  const [cleared, setCleared] = useState(false);

  const {
    data,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["exp2-bg-visibility-delayed-query"],
    queryFn: fetchDataDelayed,

    // никаких автотриггеров — мы управляем сами
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,

    // чтобы первый рендер был сразу (как baseline)
    initialData: () => ({
      version: 1,
      updatedAt: new Date().toLocaleTimeString(),
    }),
  });

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;

      // намеренная очистка UI на время обновления
      setCleared(true);

      // запускаем "запрос" вручную (как timeout в manual)
      refetch().finally(() => {
        setCleared(false);
      });
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [refetch]);

  const shownData = cleared ? null : data;

  return (
    <div className="page">
      <h2>Background — visibility (query, delayed)</h2>

      <p>
        Добавлена задержка, чтобы увидеть,
        что происходит с UI во время обновления.
      </p>

      <div className="card">
        <div><b>Loading:</b> {isFetching ? "true" : "false"}</div>

        <hr />

        <div><b>Версия:</b> {shownData ? shownData.version : "—"}</div>
        <div><b>Обновлено:</b> {shownData ? shownData.updatedAt : "—"}</div>

        {isFetching && <p><i>Обновление…</i></p>}
      </div>
    </div>
  );
}
