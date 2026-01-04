import { useQuery } from "@tanstack/react-query";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

function fetchTodos() {
  return fetch(TODOS_URL).then((r) => r.json());
}

export default function TodosCardQuery({ index }) {
  const { data = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <div className="card">
      <h3>Query component #{index}</h3>
      <div>Todos: {data.length}</div>
    </div>
  );
}
