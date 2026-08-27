import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fakeAddPb4Todo,
  fakeFetchPb4Todos,
  resetPb4Todos,
} from "../../../fakeServer/fakeAPI";

export default function AddInvalidate() {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    resetPb4Todos();
  }, []);

  const { data } = useQuery({
    queryKey: ["pb4Todos"],
    queryFn: fakeFetchPb4Todos,
  });

  const mutation = useMutation({
    mutationFn: fakeAddPb4Todo,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["pb4Todos"],
      });
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
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}