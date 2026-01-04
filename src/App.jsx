import { useQuery } from "@tanstack/react-query";

function App() {
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=5").then((r) =>
        r.json()
      ),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>Todo app (React Query)</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
