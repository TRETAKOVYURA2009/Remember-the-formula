import React from "react"
import { useNavigate } from "react-router-dom"
import PageLinks from "../types/pages"
import Button from "../components/ui/Button"
import { ReactComponent as BackIcon } from "../icons/backIcon.svg"
import Game from "../components/Game"
import { Themes } from "../types/themes"

export const DynamicsLevel: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="pt-2 pl-2 h-screen">
      <div className="w-28">
        <Button colour="pink" onClick={() => navigate(PageLinks.home)}>
          <div>
            <BackIcon className="w-8 h-7 mx-3" />
          </div>
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <ul>
          <h1 className="text-center text-3xl balans">Remember the formula</h1>
          <h3 className="text-center text-2xl mont">Динамика</h3>
          <Game theme={Themes.dinamics} />
        </ul>
      </div>
    </div>
  )
}
