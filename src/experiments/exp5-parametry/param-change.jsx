import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetchTodos } from "./fakeFetchTodos";

export default function Exp5ParamChange() {
  const [filter, setFilter] = useState("all");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["todos", filter],
    queryFn: () => fakeFetchTodos(filter, 700),
  });

  return (
    <div className="exp5">
      <h2 className="exp5__title">
        5a — Изменение параметров запроса (query)
      </h2>

      <p className="exp5__desc">
        При изменении фильтра queryKey изменяется, что приводит к выполнению
        нового запроса или использованию кэшированных данных.
      </p>

      {/* Фильтры */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
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

      {/* Loading (первый запрос) */}
      {isLoading && <p>Загрузка...</p>}

      {/* Background fetching */}
      {isFetching && !isLoading && <p>Обновление данных...</p>}

      {/* Данные */}
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
                {todo.title} —{" "}
                {todo.completed ? "completed" : "active"}
              </li>
            ))}
          </ul>
        </>
      )}

      <Link to="/exp5">← Назад</Link>
    </div>
  );
}
// 🔹 Что здесь важно (очень)
// 1. queryKey: ["todos", filter]

// 👉 это ключевая разница с manual

// при смене filter
// меняется queryKey
// React Query понимает → это новый запрос
// 2. Кэш уже встроен

// Если ты:

// нажмёшь all
// потом active
// потом снова all

// 👉 данные для all уже могут быть из кэша (без нового запроса)

// 3. isLoading vs isFetching
// isLoading → первый запрос
// isFetching → фоновый запрос

// 👉 это важно для анализа UI

// 🔹 Что ты увидишь

// По сравнению с manual:

// меньше лишних запросов
// более плавное поведение
// возможное отсутствие "мигания"
// 🔹 Это уже половина эксперимента

// Теперь у тебя есть:

// manual 5a
// query 5a

// 👉 можно уже сравнивать