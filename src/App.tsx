import React from "react"
import { Routes, Route, HashRouter } from "react-router-dom"
import PageLinks from "./types/pages"
import { HomePage, DynamicsLevel, ElectrostaticsLevel } from "./pages"

const App: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path={PageLinks.home} element={<HomePage />} />
      <Route path={PageLinks.dinamicLevel} element={<DynamicsLevel />} />
      <Route
        path={PageLinks.electrostaticLevel}
        element={<ElectrostaticsLevel />}
      />
    </Routes>
  </HashRouter>
)

export default App
