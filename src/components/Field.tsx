import React from "react"
import { GameStatus } from "../types/game"
import Card from "./Card"
import { Themes } from "../types/themes"

interface FieldProps {
  status: GameStatus
  theme: Themes
  field: number[][]
  isOpenedMatrix: boolean[][]
  isOpenedMatrixVisiable: boolean[][]
  onCellOpen: (rowIndex: number, colIndex: number) => void
}

const Field: React.FC<FieldProps> = ({
  status,
  theme,
  field,
  isOpenedMatrix,
  isOpenedMatrixVisiable,
  onCellOpen,
}) => {
  const handleCellClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rIndex: number,
    cIndex: number
  ) => {
    if (event.nativeEvent.button === 0 && !isOpenedMatrix[rIndex][cIndex]) {
      onCellOpen(rIndex, cIndex)
    }
    event.preventDefault()
  }

  return (
    <div className="flex flex-col w-fit rounded-md field" id="field">
      {field.map((row, rIndex) => (
        <div className="flex">
          {row.map((value, cIndex) => (
            <Card
              theme={theme}
              isOpenedVisiable={isOpenedMatrixVisiable[rIndex][cIndex]}
              value={value}
              onClick={(event) => handleCellClick(event, rIndex, cIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Field
