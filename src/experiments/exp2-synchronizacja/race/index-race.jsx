import { Link } from "react-router-dom";

export default function Exp2RaceIndex() {
  return (
    <div className="race">
      <h2 className="race__title">Exp2 — Race condition</h2>

      <p className="race__desc">
        Race condition występuje, gdy kilka zapytań asynchronicznych konkuruje
        o aktualizację tego samego stanu aplikacji, co może prowadzić do
        niespójnych danych.
      </p>

      <h3>Warianty eksperymentu</h3>

      <ul className="race__list">
        <li>
          <Link to="/exp2/race/base">Wersja podstawowa (problem)</Link>
        </li>
      </ul>

      <Link className="race__back" to="/exp2">← Powrót do Exp2</Link>
    </div>
  );
}
