import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

function fetchTodos() {
  return fetch(TODOS_URL).then((response) => response.json());
}

function TodoCard({ index }) {
  const { data: todos = [] } = useQuery({
    queryKey: ["exp1", "scaling", "todos"],
    queryFn: fetchTodos,
  });

  return (
    <div>
      Component #{index} — Todos: {todos.length}
    </div>
  );
}

export default function Exp1Scaling() {
  return (
    <div className="exp1">
      <h2>Масштабирование количества компонентов — React Query</h2>

      {Array.from({ length: 10 }, (_, index) => (
        <TodoCard key={index} index={index + 1} />
      ))}

      <Link to="/exp1">← Назад</Link>
    </div>
  );
}