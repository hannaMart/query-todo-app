
import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { simulateFetchTodos } from "../../../fakeServer/fakeAPI";
import { Link } from "react-router-dom";

export default function Exp2ErrorsLoadingQuery() {
  const queryClient = useQueryClient();

  // Przypadek 1
  const [fail1, setFail1] = useState(false);

  const q1 = useQuery({
    queryKey: ["exp2-errors-loading-1"],
    queryFn: () =>
      simulateFetchTodos({
        isFailure: fail1,
        delay: 3000,
      }),
    enabled: false,
    retry: 0,
  });

  const start1 = () => {
    q1.refetch();
  };

  const reset1 = () => {
    queryClient.resetQueries({
      queryKey: ["exp2-errors-loading-1"],
    });
  };

  // Przypadek 2
  const shouldFail = useRef(true);

  const q2 = useQuery({
    queryKey: ["exp2-errors-loading-2"],
    queryFn: () =>
      simulateFetchTodos({
        isFailure: shouldFail.current,
        delay: 3000,
      }),
    enabled: false,
    retry: 0,
  });

  const start2Fail = () => {
    shouldFail.current = true;
    q2.refetch();
  };

  const retry2Ok = () => {
    shouldFail.current = false;
    q2.refetch();
  };

  const reset2 = () => {
    shouldFail.current = true;

    queryClient.resetQueries({
      queryKey: ["exp2-errors-loading-2"],
    });
  };

  return (
    <div className="page">
      <h2>Kontrola stanu ładowania</h2>
{/* 
      <p>
        React Query zarządza stanem wykonywania zapytania.
        Sprawdzamy zachowanie loading w tych samych sytuacjach
        co w Manual.
      </p> */}
      {/* <h3>1. Loading znika po zakończeniu pobierania</h3>

      <label>
        <input
          type="checkbox"
          checked={fail1}
          onChange={(e) => setFail1(e.target.checked)}
        />
        Symuluj nieudane pobieranie danych
      </label>

      <br />
      <br />

      <button onClick={start1} disabled={q1.isFetching}>
        Pobierz dane
      </button>

      <button onClick={reset1}>
        Reset
      </button>

      <div>
        Status:{" "}
        {q1.isFetching
          ? "loading"
          : q1.isError
          ? "error"
          : q1.isSuccess
          ? "success"
          : "idle"}
      </div>

      {q1.isFetching && <div>Loading…</div>}

      {q1.isError && !q1.isFetching && (
        <div style={{ color: "red" }}>
          Błąd: {q1.error?.message}
        </div>
      )}

      {q1.isSuccess && (
        <ul>
          {q1.data?.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      )}

      <hr /> */}

      <h3>2. Loading pojawia się podczas ponownego pobierania</h3>

      <button onClick={start2Fail} disabled={q2.isFetching}>
        Pobierz dane (symulacja błędu)
      </button>

      <button
        onClick={retry2Ok}
        disabled={!q2.isError || q2.isFetching}
      >
        Spróbuj ponownie pobrać dane
      </button>

      <button onClick={reset2}>
        Reset
      </button>

      <div>
        Status:{" "}
        {q2.isFetching
          ? "loading"
          : q2.isError
          ? "error"
          : q2.isSuccess
          ? "success"
          : "idle"}
      </div>

      {q2.isFetching && <div>Loading…</div>}

      {q2.isError && !q2.isFetching && (
        <div style={{ color: "red" }}>
          Błąd: {q2.error?.message}
        </div>
      )}

      {q2.isSuccess && (
        <ul>
          {q2.data?.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      )}

      <br />
      <Link to="/exp2">← Wróć</Link>
    </div>
  );
}
