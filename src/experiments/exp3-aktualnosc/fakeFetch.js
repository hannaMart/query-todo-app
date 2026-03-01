// src/experiments/exp3-aktualnosc/fakeFetchTodos.js

const TODOS = [
  { id: 1, todoName: "PB3 — Zadanie 1" },
  { id: 2, todoName: "PB3 — Zadanie 2" },
  { id: 3, todoName: "PB3 — Zadanie 3" },
];

let counter = 0;

/**
 * PB3 fake fetch:
 * - counter: чтобы считать реальное число запросов/refetch
 * - fetchedAt: чтобы видеть "свежесть" данных
 * - delay: чтобы поведение было повторяемым
 */
export function fakeFetch({ delay = 600 } = {}) {
  const requestId = ++counter;
  const startedAt = Date.now();

  console.log(`[PB3] request #${requestId} START (delay=${delay}ms)`);

  return new Promise((resolve) => {
    setTimeout(() => {
      const fetchedAt = new Date().toISOString();
      const tookMs = Date.now() - startedAt;

      console.log(`[PB3] request #${requestId} END (+${tookMs}ms) fetchedAt=${fetchedAt}`);

      resolve({
        requestId,
        fetchedAt,
        todos: TODOS,
      });
    }, delay);
  });
}
