import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

function fetchTodos() {
  return fetch(TODOS_URL).then((response) => response.json());
}

export default function Exp1Baseline() {
  const { data: todos = [] } = useQuery({
    queryKey: ["exp1", "baseline", "todos"],
    queryFn: fetchTodos,
  });

  return (
    <div className="exp1">
      <h2>Базовое получение данных — React Query</h2>

      <p>
        Один компонент получает server-state при монтировании с помощью
        useQuery.
      </p>

      <p>Todos: {todos.length}</p>

      <Link to="/exp1">← Назад</Link>
    </div>
  );
}