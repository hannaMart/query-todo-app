import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetchTodos } from "./fakeFetchTodos";

function getDelay(filter) {
  if (filter === "all") return 900;
  if (filter === "active") return 300;
  if (filter === "completed") return 700;
  return 700;
}

export default function Exp5ParamFastChange() {
  const [filter, setFilter] = useState("all");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["todos", filter],
    queryFn: () => fakeFetchTodos(filter, getDelay(filter)),
  });

  const runSequence = () => {
    setFilter("all");

    setTimeout(() => {
      setFilter("active");
    }, 100);

    setTimeout(() => {
      setFilter("completed");
    }, 200);
  };

  return (
    <div className="exp5">
      <h2 className="exp5__title">
        5b — Быстрая последовательная смена параметров (query)
      </h2>

      <p className="exp5__desc">
        При быстром изменении фильтра queryKey меняется последовательно, а
        TanStack Query связывает каждый ответ с соответствующим ключом запроса.
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
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

        <button onClick={runSequence}>Запустить быструю последовательность</button>
      </div>

      <p>
        <strong>Текущий фильтр:</strong> {filter}
      </p>

      <p>
        <strong>Задержка для текущего фильтра:</strong> {getDelay(filter)} ms
      </p>

      {isLoading && <p>Загрузка...</p>}
      {isFetching && !isLoading && <p>Обновление данных...</p>}

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

      <Link to="/exp5">← Назад</Link>
    </div>
  );
}
// Что тут главное

// В manual ты защищалась через ignore, чтобы старый ответ не перезаписал новый.
// Здесь эта логика уже не пишется вручную: ключ ["todos", filter] отделяет состояния друг от друга.

// То есть:

// all — один ключ
// active — другой
// completed — третий

// Поэтому этот файл как раз хорошо показывает отличие query от manual в сценарии быстрых изменений.