import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fakeAddTodo, fakeFetchTodos, resetFakeTodos } from "./fakeApi";

export default function AddInvalidate() {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    resetFakeTodos();
  }, []);

  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: fakeFetchTodos,
  });

  const mutation = useMutation({
    mutationFn: fakeAddTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  function handleAdd() {
    mutation.mutate(newTodo);
    setNewTodo("");
  }

  const todos = data?.todos || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>PB4 — 4a Add (query, invalidate)</h2>

      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nowe zadanie"
      />

      <button onClick={handleAdd} style={{ marginLeft: "8px" }}>
        Dodaj
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.todoName}</li>
        ))}
      </ul>
    </div>
  );
}