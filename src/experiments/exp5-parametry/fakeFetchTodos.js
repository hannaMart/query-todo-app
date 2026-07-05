let requestId = 0;

const TODOS = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

function applyFilter(todos, filter) {
  if (filter === "active") {
    return todos.filter((t) => !t.completed);
  }

  if (filter === "completed") {
    return todos.filter((t) => t.completed);
  }

  return todos;
}

export function fakeFetchTodos(filter = "all", delay = 700) {
  const id = ++requestId;

  console.log(`request #${id} START | filter=${filter}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = applyFilter(TODOS, filter);

      console.log(`request #${id} END | filter=${filter}`);

      resolve({
        requestId: id,
        items: data,
        total: data.length,
      });
    }, delay);
  });
}