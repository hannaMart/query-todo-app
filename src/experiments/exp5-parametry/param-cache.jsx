import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fakeFetchTodos } from "./fakeFetchTodos";

export default function Exp5ParamCache() {
  const [filter, setFilter] = useState("all");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["todos", filter],
    queryFn: () => fakeFetchTodos(filter, 700),
    staleTime: 60_000,
  });

  return (
    <div className="exp5">
      <h2 className="exp5__title">5c — Использование кэша (query)</h2>

      <p className="exp5__desc">
        При повторном выборе уже использованного фильтра TanStack Query может
        взять данные из кэша без нового HTTP-запроса, если они ещё считаются
        актуальными.
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
      </div>

      <p>
        <strong>Текущий фильтр:</strong> {filter}
      </p>

      <p>
        <strong>staleTime:</strong> 60000 ms
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

      <Link to="/exp5">← Назад</Link>
    </div>
  );
}

// Почему тут staleTime нужен

// Именно он делает этот подпункт методически чистым:

// первый выбор фильтра → идёт запрос
// переход на другой фильтр → идёт запрос
// возврат к уже использованному фильтру в пределах staleTime → данные берутся из кэша

// То есть здесь ты показываешь не просто наличие кэша, а повторное использование кэшированных данных по параметру запроса.

// Что должно получиться в сравнении
// manual 5c
// ты сама пишешь логику кэша
// сама решаешь, когда брать из объекта cache
// query 5c
// кэш встроен
// логика повторного использования данных реализуется через queryKey и staleTime

// Это как раз хороший и чистый контраст для диплома.