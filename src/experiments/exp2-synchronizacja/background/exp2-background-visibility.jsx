
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { simulateFetchTodos } from "../../../fakeServer/fakeAPI";

const formatTime = (timestamp = Date.now()) =>
  new Date(timestamp).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

// сервер — без задержки
async function fetchDataVisibility() {
  console.count("React Query API");
  return simulateFetchTodos({ delay: 0 });
}

export default function BackgroundVisibilityQuery() {
  const [openedAt] = useState(formatTime);
  const [version, setVersion] = useState(0);
  const previousUpdate = useRef(0);

  const { data, isFetching, dataUpdatedAt, error } = useQuery({
    queryKey: ["exp2-bg-visibility-query"],
    queryFn: fetchDataVisibility,

    // хотим refetch ТОЛЬКО на возврате во вкладку
    staleTime: 0,
    refetchOnWindowFocus: true,

    // запрет лишних автотрIGGERов (чтобы условия совпали с manual)
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  useEffect(() => {
    if (dataUpdatedAt > 0 && dataUpdatedAt !== previousUpdate.current) {
      previousUpdate.current = dataUpdatedAt;
      setVersion((v) => v + 1);
    }
  }, [dataUpdatedAt]);

  return (
    <div className="page">
      <h2>Background — Visibility</h2>

      <p>Dane są aktualizowane po powrocie do karty przeglądarki.</p>

      <div className="card">
        <div>
          <b>Wersja danych:</b> {version ? `v${version}` : "—"}
        </div>

        <div>
          <b>Dane:</b> {data ? `${data.length} zadań` : "—"}
        </div>

        {/* <div><b>isFetching:</b> {String(isFetching)}</div> commented as change "trom true to false" is immediate */}

        <div>
          <b>Ostatnia aktualizacja:</b>{" "}
          {dataUpdatedAt ? formatTime(dataUpdatedAt) : "—"}
        </div>

        <div>
          <b>Zdarzenie:</b>{" "}
          {version <= 1 ? "Otwarcie strony" : "Powrót do karty"}
        </div>

        <div>
          <b>Otwarcie strony:</b> {openedAt}
        </div>

        {isFetching && <p>Aktualizowanie danych…</p>}
        {error && <p>Błąd: {error.message}</p>}
      </div>

      <br />
      <Link to="/exp2">← Wróć</Link>
    </div>
  );
}
