import { Routes, Route, NavLink } from "react-router-dom";
import TodosPage from "./pages/TodosPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import "./index.css";

export default function App() {
  return (
    <div className="page">
      <h2>Experiment 1b — query</h2>

      <nav className="nav">
        <NavLink to="/">/todos</NavLink>
        <NavLink to="/about">/about</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}
