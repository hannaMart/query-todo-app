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

import Home from "./pages/Home";

// ===== EXP2 =====
import Exp2 from "./experiments/exp2-synchronizacja/index-sync.jsx";

import Exp2RaceIndex from "./experiments/exp2-synchronizacja/race/index-race.jsx";
import Exp2Race from "./experiments/exp2-synchronizacja/race/exp2-race";

import Exp2BackIndex from "./experiments/exp2-synchronizacja/background/index-back.jsx";
import Exp2Back from "./experiments/exp2-synchronizacja/background/exp2-background.jsx";
import Exp2BackVisibility from "./experiments/exp2-synchronizacja/background/exp2-background-visibility.jsx";
import Exp2BackVisibilityDelayed from "./experiments/exp2-synchronizacja/background/exp2-background-visibility-delayed-predictability.jsx";

import Exp2ErrorsIndex from "./experiments/exp2-synchronizacja/errors/index-errors.jsx";
import Exp2Errors from "./experiments/exp2-synchronizacja/errors/exp2-errors";
import Exp2ErrorsLoading from "./experiments/exp2-synchronizacja/errors/exp2-errors-loading";

// ===== EXP3 =====
import Exp3 from "./experiments/exp3-aktualnosc/index-exp3.jsx";
import Exp3Baseline from "./experiments/exp3-aktualnosc/3a-baseline.jsx";

import Exp3PageReturn from "./experiments/exp3-aktualnosc/3b-page-return/stale-60s.jsx";

import Exp3TabReturn from "./experiments/exp3-aktualnosc/3c-tab-return/tab-return.jsx";

// ===== EXP4 =====
import Exp4 from "./experiments/exp4-mutacje/index-exp4.jsx";
import Exp4AddInvalidate from "./experiments/exp4-mutacje/add-invalidate.jsx";
import Exp4DeleteInvalidate from "./experiments/exp4-mutacje/delete-invalidate.jsx";

// ===== EXP5 =====
import Exp5Parametry from "./experiments/exp5-parametry/index-exp5";
import Exp5ParamChange from "./experiments/exp5-parametry/param-change";
import Exp5ParamFastChange from "./experiments/exp5-parametry/param-fast-change";
import Exp5ParamCache from "./experiments/exp5-parametry/param-cache";

// ===== EXP6 =====
import Exp6Koordynacja from "./experiments/exp6-koordynacja/index-exp6.jsx";
import Exp6Shared from "./experiments/exp6-koordynacja/shared.jsx";
import Exp6Representations from "./experiments/exp6-koordynacja/representations.jsx";
import Exp6Update from "./experiments/exp6-koordynacja/update.jsx";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* ===== EXP2 ===== */}
      <Route path="/exp2" element={<Exp2 />} />

      <Route path="/exp2/race" element={<Exp2RaceIndex />} />
      <Route path="/exp2/race/base" element={<Exp2Race />} />

      <Route path="/exp2/background" element={<Exp2BackIndex />} />
      <Route path="/exp2/background/base" element={<Exp2Back />} />
      <Route
        path="/exp2/background/visibility"
        element={<Exp2BackVisibility />}
      />
      <Route
        path="/exp2/background/visibility-delayed"
        element={<Exp2BackVisibilityDelayed />}
      />

      <Route path="/exp2/errors" element={<Exp2ErrorsIndex />} />
      <Route path="/exp2/errors/base" element={<Exp2Errors />} />
      <Route path="/exp2/errors/loading" element={<Exp2ErrorsLoading />} />

      {/* ===== EXP3 ===== */}
      <Route path="/exp3" element={<Exp3 />} />

      {/* 3a */}
      <Route path="/exp3/baseline" element={<Exp3Baseline />} />

      {/* 3b */}

      <Route path="/exp3/page-return" element={<Exp3PageReturn />} />

      {/* 3c */}
      <Route
        path="/exp3/tab-return"
        element={<Exp3TabReturn />}
      />

      {/* ===== EXP4 ===== */}

      <Route path="/exp4" element={<Exp4 />} />
      <Route path="/exp4/add-invalidate" element={<Exp4AddInvalidate />} />
      <Route
        path="/exp4/delete-invalidate"
        element={<Exp4DeleteInvalidate />}
      />

      {/* ===== EXP5 ===== */}

      <Route path="/exp5" element={<Exp5Parametry />} />
      <Route path="/exp5/param-change" element={<Exp5ParamChange />} />
      <Route path="/exp5/param-fast-change" element={<Exp5ParamFastChange />} />
      <Route path="/exp5/param-cache" element={<Exp5ParamCache />} />

      {/* placeholders */}
      <Route
        path="/exp1"
        element={<div className="exp-btn">Exp1 — позже</div>}
      />

              {/* ===== EXP6 ===== */}

      <Route path="/exp6" element={<Exp6Koordynacja />} />
      <Route path="/exp6/shared" element={<Exp6Shared />} />
      <Route
        path="/exp6/representations"
        element={<Exp6Representations />}
      />
            <Route
        path="/exp6/update"
        element={<Exp6Update/>}
      />

      <Route path="*" element={<Navigate to="/" replace />} />


    </Routes>
  );
}
