import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetchPb5Todos } from "../../fakeServer/fakeAPI";

export default function Exp5ParamCache() {
  const [filter, setFilter] = useState("all");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["pb5", "todos", filter],
    queryFn: () => fakeFetchPb5Todos(filter, 700),
    staleTime: Infinity,
  });

  return (
    <div className="exp5">
<h2 className="exp5__title">
  PB5 — Изменение параметров запроса (Query)
</h2>

<p className="exp5__desc">
  При изменении фильтра TanStack Query получает данные для
  соответствующего queryKey. При повторном выборе ранее
  использованного фильтра данные берутся из кэша
  без выполнения нового запроса.
</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          disabled={filter === "all"}
        >
          all
        </button>

        <button
          onClick={() => setFilter("active")}
          disabled={filter === "active"}
        >
          active
        </button>

        <button
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          completed
        </button>
      </div>

      <p>
        <strong>Текущий фильтр:</strong> {filter}
      </p>

      <p>
        <strong>Кэшированные данные:</strong> повторно используются
        без ограничения по времени в рамках эксперимента.
      </p>

      {isLoading && <p>Загрузка...</p>}

      {isFetching && !isLoading && <p>Фоновое обновление...</p>}

      {data && (
        <>
          <p>
            <strong>Номер запроса:</strong> {data.requestId}
          </p>

          <p>
            <strong>Количество элементов:</strong> {data.total}
          </p>

          <ul>
            {data.items.map((todo) => (
              <li key={todo.id}>
                {todo.title} — {todo.completed ? "completed" : "active"}
              </li>
            ))}
          </ul>
        </>
      )}

      <Link to="/">← Назад</Link>
    </div>
  );
}