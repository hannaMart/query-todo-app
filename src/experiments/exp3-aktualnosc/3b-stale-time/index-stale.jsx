import { Link } from "react-router-dom";

export default function Exp3StaleIndex() {
  return (
    <div className="page">
      <h2>Exp3b — staleTime</h2>
      <p>Заглушка. Выбери вариант staleTime.</p>

      <ul>
        <li>
          <Link to="/exp3/stale-time/default">staleTime: default</Link>
        </li>
        <li>
          <Link to="/exp3/stale-time/60s">staleTime: 60s</Link>
        </li>
      </ul>

      <Link to="/exp3">← Назад к Exp3</Link>
    </div>
  );
}
