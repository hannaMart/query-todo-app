import { TODOS } from "./db";


export function simulateFetchTodos({ isFailure, delay = 800 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFailure) {
        reject(new Error("Błąd połączenia w symulacji"));
        return;
      }
      resolve(TODOS);
    }, delay);
  });
}


// exp2-Race
export function fakeFetchTodosRace(filter) {
  const delay = Math.random() * 2000 + 300; // 300–2300 ms

  let items = TODOS;
  if (filter === "active") {
    items = items.filter((item) => !item.completed);
  }

  if (filter === "completed") {
    items = items.filter((item) => item.completed);
  }

  // В научной логике ты сейчас делаешь:
  // Controlled experiment
  // (контролируемая среда вместо реального мира)
  // Ты исследуешь механизм синхронизации, а не качество API.
  // Формулировка (запомни, потом вставим в текст):
  // В эксперименте 2 используется симулированный асинхронный источник данных, позволяющий детерминированно управлять задержками и порядком ответов, что необходимо для анализа проблем синхронизации server-state.

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        filter,
        items,
        delay: Math.round(delay),
      });
    }, delay);
  });
}


//Exp3-aktualnosc;


/**
 * - counter: чтобы считать реальное число запросов/refetch
 * - fetchedAt: чтобы видеть "свежесть" данных
 * - delay: чтобы поведение было повторяемым
 */
let exp3Counter = 0;

export function fakeFetchFreshness({ delay = 600 } = {}) {
  const requestId = ++exp3Counter;

  console.log(`[PB3] request #${requestId} START`);

  return new Promise((resolve) => {
    setTimeout(() => {
      const fetchedAt = new Date().toISOString();

      console.log(`[PB3] request #${requestId} END`);

      resolve({
        requestId,
        fetchedAt,
        todos: TODOS,
      });
    }, delay);
  });
}

//Exp 4

// Exp4 — Mutacje

let pb4TodosDb = PB4_TODOS.map((todo) => ({ ...todo }));
let exp4RequestCounter = 0;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resetPb4Todos() {
  pb4TodosDb = PB4_TODOS.map((todo) => ({ ...todo }));
  exp4RequestCounter = 0;
}

export async function fakeFetchPb4Todos({ delay = 600 } = {}) {
  const requestId = ++exp4RequestCounter;

  console.log(`[PB4][GET] #${requestId}`);

  await wait(delay);

  return {
    requestId,
    todos: pb4TodosDb.map((todo) => ({ ...todo })),
  };
}

export async function fakeAddPb4Todo(title, { delay = 600 } = {}) {
  const requestId = ++exp4RequestCounter;

  console.log(`[PB4][POST] #${requestId}`);

  await wait(delay);

  const newTodo = {
    id: Math.max(0, ...pb4TodosDb.map((todo) => todo.id)) + 1,
    title,
    completed: false,
  };

  pb4TodosDb = [...pb4TodosDb, newTodo];

  return {
    requestId,
    todo: { ...newTodo },
  };
}

export async function fakeDeletePb4Todo(id, { delay = 600 } = {}) {
  const requestId = ++exp4RequestCounter;

  console.log(`[PB4][DELETE] #${requestId}`);

  await wait(delay);

  pb4TodosDb = pb4TodosDb.filter((todo) => todo.id !== id);

  return {
    requestId,
    deletedId: id,
  };
}