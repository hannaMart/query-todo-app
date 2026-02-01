import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { simulateFetchTodos } from "./forErrAPI";

export default function Exp2ErrorsLoadingQuery() {
  // ===== CASE 1: odpowiednik BUG 1 (w manual można "zablokować loading")
  // Tu pokazujemy: Query utrzymuje spójny status, a reset to remove().
  const [fail1, setFail1] = useState(false);

  const q1 = useQuery({
    queryKey: ["exp2c-loading-1", { fail1 }],
    queryFn: () => simulateFetchTodos({ isFailure: fail1, delay: 1200 }),
    enabled: false,
    retry: 0,
  });

  const start1 = () => q1.refetch();
  const reset1 = () => q1.remove();

  // ===== CASE 2: odpowiednik BUG 2 (w manual retry bez loading, bo nie ustawiono statusu)
  // Tu pokazujemy: refetch zawsze przełącza isFetching na czas żądania.
  const q2 = useQuery({
    queryKey: ["exp2c-loading-2"],
    queryFn: async () => {
      // start zawsze błędny (jak "Start z błędem"), retry zawsze ok
      // ale sterujemy tym przyciskami przez osobny stan:
      // - w trybie "fail": isFailure=true
      // - w trybie "ok": isFailure=false
      // (logika poniżej)
      return [];
    },
    enabled: false,
    retry: 0,
  });

  // Zrobimy q2 jako "manualny refetch" z parametrem,
  // ale bez zmiany queryKey (żeby było jak w manual: retry bez zmiany scenariusza).
  // Najprościej: wywołujemy simulateFetchTodos bezpośrednio przez queryClient? — nie trzeba.
  // W TanStack Query v5 refetch przyjmuje opcje, ale queryFn i tak jest zdefiniowany.
  // Dlatego robimy osobne dwa query dla case2: fail i ok.
  const q2Fail = useQuery({
    queryKey: ["exp2c-loading-2", "fail"],
    queryFn: () => simulateFetchTodos({ isFailure: true, delay: 800 }),
    enabled: false,
    retry: 0,
  });

  const q2Ok = useQuery({
    queryKey: ["exp2c-loading-2", "ok"],
    queryFn: () => simulateFetchTodos({ isFailure: false, delay: 800 }),
    enabled: false,
    retry: 0,
  });

  const start2Fail = () => q2Fail.refetch();
  const retry2Ok = () => q2Ok.refetch();

  const reset2 = () => {
    q2Fail.remove();
    q2Ok.remove();
  };

  // Для UI case2 используем “активное состояние”:
  // если ok уже успешен — показываем ok, иначе показываем fail (если он был)
  const case2 =
    q2Ok.isSuccess
      ? { status: "success", data: q2Ok.data, error: null, isFetching: q2Ok.isFetching }
      : q2Fail.isError
      ? { status: "error", data: null, error: q2Fail.error, isFetching: q2Fail.isFetching }
      : q2Fail.isFetching
      ? { status: "loading", data: null, error: null, isFetching: true }
      : q2Fail.isSuccess
      ? { status: "success", data: q2Fail.data, error: null, isFetching: q2Fail.isFetching }
      : { status: "idle", data: null, error: null, isFetching: false };

  return (
    <div className="page">
      <h2>Exp2c — Loading (errors) — query</h2>

      <hr />

      <h3>CASE 1 — brak “zablokowanego loading”</h3>

      <label>
        <input
          type="checkbox"
          checked={fail1}
          onChange={(e) => setFail1(e.target.checked)}
        />
        Symuluj błąd
      </label>

      <br />
      <br />

      <button onClick={start1} disabled={q1.isFetching}>
        Start
      </button>
      <button onClick={reset1}>Reset</button>

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
      {q1.isError && <div>Błąd: {q1.error?.message}</div>}
      {q1.isSuccess && (
        <ul>
          {q1.data?.map((t) => (
            <li key={t.id}>{t.todoName}</li>
          ))}
        </ul>
      )}

      <hr />

      <h3>CASE 2 — retry zawsze pokazuje loading (isFetching)</h3>

      <button onClick={start2Fail} disabled={q2Fail.isFetching || q2Ok.isFetching}>
        Start z błędem
      </button>

      <button
        onClick={retry2Ok}
        disabled={!q2Fail.isError || q2Fail.isFetching || q2Ok.isFetching}
      >
        Retry z OK
      </button>

      <button onClick={reset2}>Reset</button>

      <div>Status: {case2.status}</div>

      {(q2Fail.isFetching || q2Ok.isFetching) && <div>Loading…</div>}

      {case2.status === "error" && <div>Błąd: {case2.error?.message}</div>}

      {case2.status === "success" && (
        <ul>
          {case2.data?.map((t) => (
            <li key={t.id}>{t.todoName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
