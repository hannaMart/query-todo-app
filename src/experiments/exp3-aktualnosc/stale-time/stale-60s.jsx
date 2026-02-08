import { Link } from "react-router-dom";

export default function Exp3Stale60s() {
  return (
    <div className="page">
      <h2>Exp3b — staleTime (60s)</h2>
      <p>Заглушка. Здесь будет вариант со staleTime = 60 секунд.</p>

      <Link to="/exp3/stale-time">← Назад к выбору staleTime</Link>
    </div>
  );
}
