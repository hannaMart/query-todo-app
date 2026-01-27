import { useState } from "react";
import { simulateFetchTodos } from "./forErrAPI";

export default function Exp2ErrorsLoading() {
  const [fail1, setFail1] = useState(false);
  const [status1, setStatus1] = useState("idle");
  const [data1, setData1] = useState(null);
  const [error1, setError1] = useState(null);

  const startBug1 = () => {
    setStatus1("loading");
    setData1(null);
    setError1(null);

    simulateFetchTodos({ isFailure: fail1, delay: 1200 })
      .then((result) => {
        setData1(result);
      })
      .catch((err) => {
        setError1(err.message);
      });
  };

  const resetBug1 = () => {
    setStatus1("idle");
    setData1(null);
    setError1(null);
  };

  const [status2, setStatus2] = useState("idle");
  const [data2, setData2] = useState(null);
  const [error2, setError2] = useState(null);

  const startBug2Fail = () => {
    setStatus2("loading");
    setData2(null);
    setError2(null);

    simulateFetchTodos({ isFailure: true, delay: 800 })
      .then((result) => {
        setData2(result);
        setStatus2("success");
      })
      .catch((err) => {
        setError2(err.message);
        setStatus2("error");
      });
  };

  const retryBug2Ok = () => {
    setError2(null);

    simulateFetchTodos({ isFailure: false, delay: 800 })
      .then((result) => {
        setData2(result);
        setStatus2("success");
      })
      .catch((err) => {
        setError2(err.message);
        setStatus2("error");
      });
  };

  const resetBug2 = () => {
    setStatus2("idle");
    setData2(null);
    setError2(null);
  };

  return (
    <div className="page">
      <h2>Exp2c — Loading (errors)</h2>

      <hr />

      <h3>BUG 1 — loading zablokowany</h3>

      <label>
        <input
          type="checkbox"
          checked={fail1}
          onChange={(e) => setFail1(e.target.checked)}
        />
        Symuluj błąd
      </label><br /><br />

      <button onClick={startBug1}>Start</button>
      <button onClick={resetBug1}>Reset</button>

      <div>Status: {status1}</div>
      {status1 === "loading" && <div>Loading…</div>}
      {error1 && <div>Błąd: {error1}</div>}
      {data1 && (
        <ul>
          {data1.map((t) => (
            <li key={t.id}>{t.todoName}</li>
          ))}
        </ul>
      )}

      <hr />

      <h3>BUG 2 — retry bez loading</h3>

      <button onClick={startBug2Fail}>Start z błędem</button>
      <button onClick={retryBug2Ok} disabled={status2 !== "error"}>
        Retry z OK
      </button>
      <button onClick={resetBug2}>Reset</button>

      <div>Status: {status2}</div>
      {status2 === "loading" && <div>Loading…</div>}
      {status2 === "error" && <div>Błąd: {error2}</div>}
      {status2 === "success" && data2 && (
        <ul>
          {data2.map((t) => (
            <li key={t.id}>{t.todoName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
