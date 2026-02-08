import { Link } from "react-router-dom";

export default function Exp3StaleDefault() {
  return (
    <div className="page">
      <h2>Exp3b — staleTime (default)</h2>
      <p>Заглушка. Здесь будет вариант с настройками по умолчанию.</p>

      <Link to="/exp3/stale-time">← Назад к выбору staleTime</Link>
    </div>
  );
}
