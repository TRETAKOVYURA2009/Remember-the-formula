import React from "react"
import { Routes, Route, HashRouter } from "react-router-dom"
import PageLinks from "./types/pages"
import { HomePage, DynamicsLevel, ElectrostaticsLevel } from "./pages"

const App: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path={PageLinks.home} element={<HomePage />} />
      <Route path={PageLinks.easyLevel} element={<DynamicsLevel />} />
      <Route path={PageLinks.normalLevel} element={<ElectrostaticsLevel />} />
    </Routes>
  </HashRouter>
)

export default App
