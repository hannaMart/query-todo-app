import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fakeFetchTodosRace } from "../../../fakeServer/fakeAPI";

export default function Exp2Race() {
  const [filter, setFilter] = useState("all");

  const { data, isLoading } = useQuery({
    // filter входит в queryKey, потому что он определяет,
    // какой набор server-state запрашивается.
    queryKey: ["todos", filter],

    // Используем тот же fake API, что и в manual-версии.
    queryFn: () => fakeFetchTodosRace(filter),
  });

  return (
    <div style={{ padding: 16 }}>
      <h2>Exp2 — race condition (query)</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setFilter("all")}>all</button>
        <button onClick={() => setFilter("active")}>active</button>
        <button onClick={() => setFilter("completed")}>completed</button>
      </div>

      <p>
        <strong>Текущий filter:</strong> {filter}
      </p>

      {isLoading && <p>Loading…</p>}

      {data && (
        <div>
          <p>
            Ответ для filter: <b>{data.filter}</b> (delay: {data.delay} ms)
          </p>

          <ul>
            {data.items.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/exp2/race">← Powrót</Link>
    </div>
  );
}