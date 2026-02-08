import { Link } from "react-router-dom";

export default function Exp3ReturnIndex() {
  return (
    <div className="page">
      <h2>Exp3c — Возврат после перерыва</h2>
      <p>Заглушка. Выбери сценарий паузы.</p>

      <ul>
        <li>
          <Link to="/exp3/return-after-break/short">Короткая пауза</Link>
        </li>
        <li>
          <Link to="/exp3/return-after-break/long">Длинная пауза</Link>
        </li>
      </ul>

      <Link to="/exp3">← Назад к Exp3</Link>
    </div>
  );
}
