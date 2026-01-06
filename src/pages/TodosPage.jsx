import { useQuery } from "@tanstack/react-query";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

function fetchTodos() {
  return fetch(API_URL).then((res) => res.json());
}

export default function TodosPage() {
const { data = [] } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  staleTime: 30_000,
  gcTime: 5_000,
});

  return (
    <div>
      <h3>Lista zadań (query)</h3>

      <ul>
        {data.slice(0, 10).map((todo) => (
          <li key={todo.id}>
            #{todo.id} {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
