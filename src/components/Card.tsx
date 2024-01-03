import React, { PropsWithChildren } from "react"
import { Themes } from "../types/themes"
import {
  bgForCards,
  formulsDynamic,
  formulsElectrostatic,
  wordingOfTheFormulsDynamic,
  wordingOfTheFormulsElectrostatic,
} from "../types/formuls"

interface CardWrapperProps {
  opened?: boolean
}

const CardWrapper: React.FC<PropsWithChildren<CardWrapperProps>> = ({
  children,
  opened = false,
}) => (
  <div
    className={`mont flex justify-center items-center flip-card-inner noselect ${
      opened ? "rotated" : "bg-white"
    }`}
  >
    {children}
  </div>
)

interface CardProps {
  theme: Themes
  value: number
  isOpenedVisiable: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Card: React.FC<CardProps> = ({
  theme,
  value,
  onClick,
  isOpenedVisiable,
}) => {
  if (value < 10) {
    return (
      <div
        onClick={onClick}
        onContextMenu={onClick}
        className="flip-card m-1 flex justify-center"
      >
        <CardWrapper opened={isOpenedVisiable}>
          <div className="flip-card-front" />
          <div className={`flip-card-back ${bgForCards[value]}`}>
            <p>
              {theme === Themes.dinamics
                ? `${wordingOfTheFormulsDynamic[value]}`
                : `${wordingOfTheFormulsElectrostatic[value]}`}
            </p>
          </div>
        </CardWrapper>
      </div>
    )
  }
  return (
    <div
      onClick={onClick}
      onContextMenu={onClick}
      className="flip-card m-1 flex justify-center w-40"
    >
      <CardWrapper opened={isOpenedVisiable}>
        <div className="flip-card-front" />
        <div className={`flip-card-back ${bgForCards[value - 10]}`}>
          <img
            width={180}
            src={
              theme === Themes.dinamics
                ? `${formulsDynamic[value - 10]}`
                : `${formulsElectrostatic[value - 10]}`
            }
            alt=""
          />
        </div>
      </CardWrapper>
    </div>
  )
}
export default Card
