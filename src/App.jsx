import TodosCardQuery from "./components/TodosCardQuery";
import "./index.css";


export default function App() {
  return (
    <div className="page">
      <h2>Experiment 1a — query (10 components)</h2>

      <div className="cards">
        {Array.from({ length: 10 }).map((_, i) => (
          <TodosCardQuery key={i} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
