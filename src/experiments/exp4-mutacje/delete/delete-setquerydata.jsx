import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fakeDeletePb4Todo,
  fakeFetchPb4Todos,
  resetPb4Todos,
} from "../../../fakeServer/fakeAPI";

export default function DeleteSetQueryData() {
  const queryClient = useQueryClient();

  useEffect(() => {
    resetPb4Todos();
  }, []);

  const { data } = useQuery({
    queryKey: ["pb4Todos"],
    queryFn: fakeFetchPb4Todos,
  });

  const mutation = useMutation({
    mutationFn: fakeDeletePb4Todo,
    onSuccess: (result) => {
      queryClient.setQueryData(["pb4Todos"], (oldData) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          todos: oldData.todos.filter(
            (todo) => todo.id !== result.deletedId
          ),
        };
      });
    },
  });

  function handleDelete(id) {
    mutation.mutate(id);
  }

  const todos = data?.todos || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>PB4 — 4b Delete (query, setQueryData)</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}

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