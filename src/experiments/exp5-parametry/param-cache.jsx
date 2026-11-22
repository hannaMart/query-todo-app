
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
        PB5 — Zmiana parametrów zapytania i pamięć podręczna
      </h2>
{/* 
      <p className="exp5__desc">
        Przy zmianie filtra React Query pobiera dane dla odpowiedniego
        queryKey. Przy ponownym wyborze wcześniej używanego filtra
        dane mogą zostać wykorzystane z pamięci podręcznej
        bez wykonywania nowego żądania.
      </p> */}

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
        <strong>Aktualny filtr:</strong> {filter}
      </p>

      <p>
        <strong>Pamięć podręczna:</strong> dane są uznawane
        za aktualne (staleTime: Infinity), dopóki pozostają
        w pamięci podręcznej.
      </p>

      {isLoading && <p>Ładowanie...</p>}

      {isFetching && !isLoading && <p>Odświeżanie danych...</p>}

      {data && (
        <>
          <p>
            <strong>Numer żądania:</strong> {data.requestId}
          </p>

          <p>
            <strong>Liczba elementów:</strong> {data.total}
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

      <Link to="/">← Powrót</Link>
    </div>
  );
}
