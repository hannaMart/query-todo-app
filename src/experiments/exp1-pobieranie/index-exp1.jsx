import { Link } from "react-router-dom";

export default function Exp1Pobieranie() {
  return (
    <div className="exp1">
      <h2 className="exp1__title">
        Эксперимент 1 — Получение server-state
      </h2>

      <p className="exp1__desc">
        Эксперимент посвящён анализу количества и повторяемости HTTP-запросов
        при получении одних и тех же серверных данных в разных сценариях
        React-приложения.
      </p>

      <ul className="exp1__list">
        <li>
          <Link to="/exp1/baseline">
            Базовое получение данных
          </Link>
        </li>

        <li>
          <Link to="/exp1/scaling">
            Масштабирование количества компонентов
          </Link>
        </li>

      </ul>

      <Link to="/">← Назад</Link>
    </div>
  );
}