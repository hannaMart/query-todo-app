import { useState } from "react";
import { simulateFetchTodos } from "./forErrAPI";

export default function Exp2ErrorsBugged() {
  const [isFailure, setIsFailure] = useState(false);

  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFetch = () => {
    setStatus("loading");
    setErrorMsg(null);

    simulateFetchTodos({ isFailure, delay: 2000 })
      .then((result) => {
        setData(result);
        setStatus("success");
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setStatus("error");
      });
  };

  return (
    <div className="page">
      <h2>Exp2c — Errors / retry (manual) — BUG</h2>

      <label>
        <input
          type="checkbox"
          checked={isFailure}
          onChange={(e) => setIsFailure(e.target.checked)}
        />
        Symuluj błąd zapytania
      </label>

      <button onClick={handleFetch} disabled={status === "loading"}>
        Fetch
      </button>

      {status === "loading" && <div>Loading…</div>}

      {status === "error" && (
        <div>
          <div>Błąd: {errorMsg}</div>
          <button onClick={handleFetch}>Retry</button>
        </div>
      )}

      {data && (
        <ul>
          {data.map((t) => (
            <li key={t.id}>{t.todoName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
