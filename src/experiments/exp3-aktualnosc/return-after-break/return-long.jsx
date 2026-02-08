import { Link } from "react-router-dom";

export default function Exp3ReturnLong() {
  return (
    <div className="page">
      <h2>Exp3c — Возврат (длинная пауза)</h2>
      <p>Заглушка. Здесь будет сценарий длинного перерыва.</p>

      <Link to="/exp3/return-after-break">← Назад к выбору паузы</Link>
    </div>
  );
}
