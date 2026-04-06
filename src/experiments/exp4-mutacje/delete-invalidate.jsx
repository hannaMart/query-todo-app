import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fakeDeleteTodo, fakeFetchTodos, resetFakeTodos } from "./fakeApi";

export default function DeleteInvalidate() {
  const queryClient = useQueryClient();

  useEffect(() => {
    resetFakeTodos();
  }, []);

  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: fakeFetchTodos,
  });

  const mutation = useMutation({
    mutationFn: fakeDeleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  function handleDelete(id) {
    mutation.mutate(id);
  }

  const todos = data?.todos || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>PB4 — 4b Delete (query, invalidate)</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todoName}
            <button
              onClick={() => handleDelete(todo.id)}
              style={{ marginLeft: "8px" }}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}