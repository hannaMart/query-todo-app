const INITIAL_TODOS = [
  { id: 1, todoName: "PB4 — Zadanie 1" },
  { id: 2, todoName: "PB4 — Zadanie 2" },
  { id: 3, todoName: "PB4 — Zadanie 3" },
];

let todosDb = [...INITIAL_TODOS];
let requestCounter = 0;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resetFakeTodos() {
  todosDb = [...INITIAL_TODOS];
  requestCounter = 0;
}

export async function fakeFetchTodos({ delay = 600 } = {}) {
  const requestId = ++requestCounter;
  console.log(`[GET] #${requestId}`);

  await wait(delay);

  return {
    requestId,
    todos: [...todosDb],
  };
}

export async function fakeAddTodo(todoName, { delay = 600 } = {}) {
  const requestId = ++requestCounter;
  console.log(`[POST] #${requestId}`);

  await wait(delay);

  const newTodo = {
    id: Date.now(),
    todoName,
  };

  todosDb = [...todosDb, newTodo];

  return {
    requestId,
    todo: newTodo,
  };
}

export async function fakeDeleteTodo(id, { delay = 600 } = {}) {
  const requestId = ++requestCounter;
  console.log(`[DELETE] #${requestId}`);

  await wait(delay);

  todosDb = todosDb.filter((todo) => todo.id !== id);

  return {
    requestId,
    deletedId: id,
  };
}