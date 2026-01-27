// import { Routes, Route, NavLink } from "react-router-dom";
// import TodosPage from "./pages/TodosPage.jsx";
// import AboutPage from "./pages/AboutPage.jsx";
// import "./index.css";

// export default function App() {
//   return (
//     <div className="page">
//       <h2>Experiment 1b — query</h2>

//       <nav className="nav">
//         <NavLink to="/">/todos</NavLink>
//         <NavLink to="/about">/about</NavLink>
//       </nav>

//       <Routes>
//         <Route path="/" element={<TodosPage />} />
//         <Route path="/about" element={<AboutPage />} />
//       </Routes>
//     </div>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home"
import Exp2 from "./experiments/exp2-synchronizacja/index-sync.jsx";
import Exp2RaceIndex from "./experiments/exp2-synchronizacja/race/index-race.jsx";
import Exp2Race from "./experiments/exp2-synchronizacja/race/exp2-race";
import Exp2BackIndex from "./experiments/exp2-synchronizacja/background/index-back.jsx";
import Exp2Back from "./experiments/exp2-synchronizacja/background/exp2-background.jsx";
import Exp2BackVisibility from "./experiments/exp2-synchronizacja/background/exp2-background-visibility.jsx";
import Exp2ErrorsIndex from "./experiments/exp2-synchronizacja/errors/index-errors.jsx";
import Exp2Errors from "./experiments/exp2-synchronizacja/errors/exp2-errors";
import Exp2ErrorsFixed from "./experiments/exp2-synchronizacja/errors/exp2-errors-fixed";
import Exp2ErrorsLoading from "./experiments/exp2-synchronizacja/errors/exp2-errors-loading";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exp2" element={<Exp2 />} />
      <Route path="/exp2/race" element={<Exp2RaceIndex />} />
      <Route path="/exp2/race/base" element={<Exp2Race />} />
      <Route path="/exp2/background" element={<Exp2BackIndex />} />
      <Route path="/exp2/background/base" element={<Exp2Back />} />
      <Route path="/exp2/background/visibility" element={<Exp2BackVisibility />} />
      <Route path="/exp2/errors" element={<Exp2ErrorsIndex />}/>
      <Route path="/exp2/errors/base" element={<Exp2Errors />} />
      <Route path="/exp2/errors/fixed" element={<Exp2ErrorsFixed />} />
      <Route path="/exp2/errors/loading" element={<Exp2ErrorsLoading />} />

      <Route
        path="/exp1"
        element={<div className="exp-btn">Exp1 — позже</div>}
      />
      <Route path="/exp3" element={<div className="page">Exp3 — позже</div>} />
      <Route path="/exp4" element={<div className="page">Exp4 — позже</div>} />
      <Route path="/exp5" element={<div className="page">Exp5 — позже</div>} />
      <Route path="/exp6" element={<div className="page">Exp6 — позже</div>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
