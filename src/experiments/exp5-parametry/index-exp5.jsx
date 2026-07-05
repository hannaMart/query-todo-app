import { Link } from "react-router-dom";

export default function Exp5Parametry() {
  return (
    <div className="exp5">
      <h2 className="exp5__title">
        Эксперимент 5 — Изменение параметров запроса
      </h2>

      <p className="exp5__desc">
        Эксперимент посвящён анализу поведения приложения при изменении
        параметров запроса (например, фильтров) и сравнению подходов управления
        server-state с точки зрения количества HTTP-запросов и согласованности
        отображаемых данных.
      </p>

      <ul className="exp5__list">
        <li>
          <Link to="/exp5/param-change">
            5a — Изменение параметров запроса
          </Link>
        </li>

        <li>
          <Link to="/exp5/param-fast-change">
            5b — Быстрая смена параметров
          </Link>
        </li>

        <li>
          <Link to="/exp5/param-cache">
            5c — Использование кэша
          </Link>
        </li>
      </ul>

      <Link to="/">← Назад</Link>
    </div>
  );
}