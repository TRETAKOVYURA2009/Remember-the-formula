import React from "react"
import { useNavigate } from "react-router-dom"
import PageLinks from "../types/pages"
import Button from "../components/ui/Button"

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center h-screen bg-homePage">
      <ul className="mt-28 text-center">
        <li>
          <h1 className="text-4xl balans">Remember the formula</h1>
        </li>
        <li>
          <h3 className="text-2xl space-y-4 mont">Выберете тему</h3>
        </li>
        <li className="flex justify-center">
          <div className="space-y-4 w-36">
            <div className="w-40">
              <Button
                colour="red"
                onClick={() => navigate(PageLinks.dinamicLevel)}
              >
                Динамика
              </Button>
            </div>
            <div className="w-40">
              <Button
                colour="blue"
                onClick={() => navigate(PageLinks.electrostaticLevel)}
              >
                Элекростатика
              </Button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
