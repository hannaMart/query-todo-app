import { Link } from "react-router-dom";

export default function Exp2Synchronizacja() {
  return (
    <div className="exp2">
      <h2 className="exp2__title">Experiment 2 — Synchronizacja</h2>

      <p className="exp2__desc">
        Eksperyment dotyczy problemów synchronizacji server-state w aplikacjach React.
      </p>

      <ul className="exp2__list">
        <li>
          <Link to="/exp2/race">Race condition</Link>
        </li>
        <li>
          <Link to="/exp2/background">Background refetch</Link>
        </li>
        <li>
          <Link to="/exp2/errors">Error handling</Link>
        </li>
      </ul>

      <Link to="/">← Powrót</Link>
    </div>
  );
}
