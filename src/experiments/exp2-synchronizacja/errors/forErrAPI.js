const TODOS = [
  { id: 1, todoName: "Kupuj mleko baz laktozy" },
  { id: 2, todoName: "Notatki dla poezji" },
  { id: 3, todoName: "Spacer 10 minut" },
];

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
