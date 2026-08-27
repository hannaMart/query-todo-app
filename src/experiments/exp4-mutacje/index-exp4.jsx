import { Link } from "react-router-dom";

export default function Exp4Mutacje() {
  return (
    <div className="exp4">
      <h2 className="exp4__title">
        Эксперимент 4 — Мутации и синхронизация данных
      </h2>

      <p className="exp4__desc">
        Эксперимент посвящён анализу поведения приложения при изменении данных
        (мутациях) и способам синхронизации server-state после выполнения
        операций добавления и удаления.
      </p>

      <ul className="exp4__list">
        <li>
          <Link to="/exp4/add">
            Добавление элемента (add)
          </Link>
        </li>
        <li>
          <Link to="/exp4/delete">
            Удаление элемента (delete)
          </Link>
        </li>
      </ul>

      <Link to="/">← Назад</Link>
    </div>
  );
}