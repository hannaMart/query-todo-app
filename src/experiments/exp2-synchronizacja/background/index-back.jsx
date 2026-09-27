import { Link } from "react-router-dom";

export default function Exp2BackIndex() {
  return (
    <div className="page">
      <h2>Exp2 — Background synchronizacja</h2>

      <p>
        Background synchronizacja opisuje sytuacje, w których dane w UI są
        aktualizowane automatycznie (np. po powrocie do karty), bez jawnej akcji
        użytkownika.
      </p>

      <h3>Warianty eksperymentu (React Query)</h3>

      <ol>
        <li>
          <Link to="/exp2/background/base">
            Wersja bazowa — brak synchronizacji w tle
          </Link>
        </li>

        <li>
          <Link to="/exp2/background/visibility">
            Visibility — synchronizacja przy powrocie do karty
          </Link>
        </li>

        <li>
          <Link to="/exp2/background/visibility-delayed">
            Visibility + opóźnienie — obserwacja zachowania UI podczas aktualizacji
          </Link>
        </li>
      </ol>

      <Link to="/exp2">← Powrót do Exp2</Link>
    </div>
  );
}