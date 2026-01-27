import { Link } from "react-router-dom";

export default function Exp2BackIndex() {
  return (
    <div>
      <h2>Exp2 — Background synchronizacja</h2>

      <p>
        Background synchronizacja opisuje sytuację, w której dane w interfejsie
        użytkownika są aktualizowane automatycznie, bez bezpośredniej akcji
        użytkownika.
      </p>

      <h3>Warianty eksperymentu</h3>

      <ul>
        <li>
          <Link to="/exp2/background/base">
            Wersja podstawowa (brak synchronizacji)
          </Link>
        </li>
        <li>
          <Link to="/exp2/background/visibility">
            Synchronizacja przy powrocie do karty (Visibility)
          </Link>
        </li>
      </ul>

      <Link to="/exp2">← Powrót do Exp2</Link>
    </div>
  );
}
