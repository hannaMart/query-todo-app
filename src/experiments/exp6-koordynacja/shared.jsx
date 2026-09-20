import { useQuery } from "@tanstack/react-query";

import { fakeFetchPb6Todos } from "../../fakeServer/fakeAPI";

// Каждый компонент самостоятельно использует useQuery
function TodoList({ title }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pb6-todos"],
    queryFn: fakeFetchPb6Todos,
    staleTime: 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>{title}</h3>

      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} — {todo.completed ? "Done" : "Active"}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Главный компонент эксперимента
export default function Shared() {
  return (
    <div>
      <h2>PB6a — Shared (React Query)</h2>

      <TodoList title="Component A" />
      <TodoList title="Component B" />
    </div>
  );
}