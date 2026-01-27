import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <h2>Experiments</h2>

      <div className="experiments-grid">
        <Link to="/exp1" className="exp-btn">Exp1</Link>
        <Link to="/exp2" className="exp-btn">Exp2</Link>
        <Link to="/exp3" className="exp-btn">Exp3</Link>
        <Link to="/exp4" className="exp-btn">Exp4</Link>
        <Link to="/exp5" className="exp-btn">Exp5</Link>
        <Link to="/exp6" className="exp-btn">Exp6</Link>
      </div>
    </div>
  );
}
