import { Link } from "react-router-dom";

export default function Exp3Aktualnosc() {
  return (
    <div className="exp3">
      <h2 className="exp3__title">
        Эксперимент 3 — Актуальность данных
      </h2>

      <p className="exp3__desc">
        Эксперимент посвящён контролю актуальности server-state и
        частоте повторных HTTP-запросов в React-приложении.
      </p>

      <ul className="exp3__list">
        <li>
          <Link to="/exp3/3a-no-freshness">
            Отсутствие контроля актуальности данных
          </Link>
        </li>
        <li>
          <Link to="/exp3/3b-stale-time">
            Влияние staleTime на повторные запросы
          </Link>
        </li>
        <li>
          <Link to="/exp3/3c-return-after-break">
            Возврат к представлению после перерыва
          </Link>
        </li>
      </ul>

      <Link to="/">← Назад</Link>
    </div>
  );
}
