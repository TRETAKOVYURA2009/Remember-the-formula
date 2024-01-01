// component of cards with formuls
import React, { PropsWithChildren } from "react"
import { Themes } from "../types/themes"

interface CardWrapperProps {
  opened?: boolean
}

const CardWrapper: React.FC<PropsWithChildren<CardWrapperProps>> = ({
  children,
  opened = false,
}) => (
  <div
    className={`mont flex justify-center items-center flip-card-inner ${
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
}) => (
  <div
    onClick={onClick}
    onContextMenu={onClick}
    className="flip-card m-1 flex justify-center"
  >
    <CardWrapper opened={isOpenedVisiable}>
      <div className="flip-card-front">
        <h1>A</h1>
      </div>
      <div className="flip-card-back">
        <h1>{value}</h1>
      </div>
    </CardWrapper>
  </div>
)

export default Card
