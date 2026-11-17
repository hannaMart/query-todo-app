import { Link } from "react-router-dom";

export default function Exp3Aktualnosc() {
  return (
    <div className="exp3">
      <h2 className="exp3__title">Эксперимент 3 — Актуальность данных</h2>

      <p className="exp3__desc">
        Эксперимент посвящён контролю актуальности server-state и частоте
        повторных HTTP-запросов в React-приложении.
      </p>

      <ul className="exp3__list">
        <li>
          <Link to="/exp3/baseline">
            3а — Domyślne zachowanie przy pobieraniu danych
          </Link>
        </li>
        <li>
          <Link to="/exp3/page-return">
            3b — Влияние staleTime на повторные запросы
          </Link>
        </li>
        <li>
          <Link to="/exp3/tab-return">
            3c — Возврат к представлению после перерыва
          </Link>
        </li>
                <li>
          <Link to="/exp3/polling">3d -Okresowe pobieranie danych (polling)</Link>
        </li>
      </ul>

      <Link to="/">← Назад</Link>
    </div>
  );
}
