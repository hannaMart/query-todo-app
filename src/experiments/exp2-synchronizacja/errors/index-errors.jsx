import { Link } from "react-router-dom";

export default function Exp2ErrorsIndex() {
  return (
    <div>
      <h2>Exp2 — Errors / retry (synchronizacja)</h2>

      <p>
        Obsługa błędów opisuje zachowanie interfejsu użytkownika w sytuacji, gdy
        zapytanie sieciowe kończy się niepowodzeniem oraz gdy użytkownik
        podejmuje próbę ponownego pobrania danych.
      </p>

      <h3>Warianty eksperymentu</h3>

      <ul>
        <li>
          <Link to="/exp2/errors/base">
            Kwestia niespójnego stanu UI
          </Link>
        </li>

        <li>
          <Link to="/exp2/errors/loading">Loading błędy</Link>
        </li>
      </ul>

      <Link to="/exp2">← Powrót do Exp2</Link>
    </div>
  );
}
