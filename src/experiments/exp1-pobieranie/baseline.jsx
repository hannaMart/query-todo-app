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
      <h2>Pobieranie danych — jeden komponent</h2>
      <p>Liczba zadań: {todos.length}</p>
      <Link to="/exp1">← Wróć</Link>
    </div>
  );
}