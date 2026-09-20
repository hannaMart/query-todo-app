import { useEffect, useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fakeFetchPb6UpdateTodos,
  fakeAddPb6Todo,
  resetPb6Todos,
} from "../../fakeServer/fakeAPI";

// Общие настройки запроса
const queryKey = ["pb6-update-todos"];

const queryOptions = {
  queryKey,
  queryFn: fakeFetchPb6UpdateTodos,
  staleTime: 60_000,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

// Component A — добавление задачи
function TodoAdd() {
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (title) => fakeAddPb6Todo(title),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey,
        exact: true,
      });
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle || isPending) return;

    try {
      await mutateAsync(trimmedTitle);
      setTitle("");
    } catch {
      // Ошибка отображается через состояние useMutation
    }
  }

  return (
    <div>
      <h3>Component A — Add Todo</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New todo"
          disabled={isPending}
        />

        <button
          type="submit"
          disabled={isPending || !title.trim()}
        >
          {isPending ? "Updating..." : "Add Todo"}
        </button>
      </form>

      {isError && <p>Error: {error.message}</p>}
    </div>
  );
}

// Component B — полный список задач
function TodoList() {
  const { data } = useQuery(queryOptions);

  return (
    <div>
      <h3>Component B — Todo List</h3>

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

// Component C — количество и статистика
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

      <p>Total todos: {data.todos.length}</p>
      <p>Completed: {completed}</p>
      <p>Active: {active}</p>
    </div>
  );
}

// Главный компонент эксперимента
export default function Update() {
  const queryClient = useQueryClient();

  const [ready, setReady] = useState(false);

  // Восстановление исходного состояния перед проверкой
  useEffect(() => {
    resetPb6Todos();

    queryClient.removeQueries({
      queryKey,
      exact: true,
    });

    setReady(true);
  }, [queryClient]);

  // Первоначальная загрузка
  const {
    isLoading,
    isError,
    error,
  } = useQuery({
    ...queryOptions,
    enabled: ready,
  });

  if (!ready || isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>PB6c — Update (React Query)</h2>

      <TodoAdd />

      <TodoList />

      <TodoStats />
    </div>
  );
}