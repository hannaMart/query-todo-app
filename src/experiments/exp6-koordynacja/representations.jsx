import { useQuery } from "@tanstack/react-query";

import { fakeFetchPb6Todos } from "../../fakeServer/fakeAPI";

// Общие настройки запроса
const queryOptions = {
  queryKey: ["pb6-todos"],
  queryFn: fakeFetchPb6Todos,
  staleTime: 60_000,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

// Component A — полный список задач
function TodoList() {
  const { data } = useQuery(queryOptions);

  return (
    <div>
      <h3>Component A — Todo List</h3>

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

// Component B — общее количество задач
function TodoTotal() {
  const { data } = useQuery(queryOptions);

  return (
    <div>
      <h3>Component B — Total</h3>

      <p>Total todos: {data.todos.length}</p>
    </div>
  );
}

// Component C — статистика задач
function TodoStats() {
  const { data } = useQuery(queryOptions);

  const completed = data.todos.filter(
    (todo) => todo.completed
  ).length;

  const active = data.todos.filter(
    (todo) => !todo.completed
  ).length;

  return (
    <div>
      <h3>Component C — Statistics</h3>

      <p>Completed: {completed}</p>
      <p>Active: {active}</p>
    </div>
  );
}

// Главный компонент эксперимента
export default function Representations() {
  const { isLoading, isError, error } = useQuery(queryOptions);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>PB6b — Representations (React Query)</h2>

      <TodoList />
      <TodoTotal />
      <TodoStats />
    </div>
  );
}