// a new component of game

import React, { useEffect, useMemo, useState } from "react"
import logic from "../gameLogic"
import { GameStatus, FieldParams } from "../types/game"
import Button from "./ui/Button"
import StopWatch from "./StopWatch"
import { Themes } from "../types/themes"
import Field from "./Field"

interface GameProps {
  theme: Themes
}

const Game: React.FC<GameProps> = ({ theme }) => {
  const [fieldParams, setFieldParams] = useState<FieldParams>({
    width: 4,
    height: 3,
  })
  const [isOpenedMatrix, setIsOpenedMatrix] = useState<boolean[][]>(
    logic.createMatrixWithValue(false, fieldParams.width, fieldParams.height)
  )
  const [isOpenedMatrixVisiable, setIsOpenedMatrixVisiable] = useState<
    boolean[][]
  >(logic.createMatrixWithValue(false, fieldParams.width, fieldParams.height))

  const [field, setField] = useState<number[][]>(
    logic.createMatrixWithValue(0, fieldParams.width, fieldParams.height)
  )

  const [openedPairsCount, setOpenedPairsCount] = useState<number>(0)
  const [seriesCount, setSeriesCount] = useState<number>(0)

  const [status, setStatus] = useState<GameStatus>(GameStatus.notStarted)

  const [coordsFirstCard, setCoordsFirstCard] = useState<number[] | null>(null)
  const [coordsSecondCard, setCoordsSecondCard] = useState<number[] | null>(
    null
  )
  // eslint-disable-next-line no-undef
  const [timerId, setTimerId] = useState<NodeJS.Timeout>()

  // const setGameOver = (rowIndex: number, colIndex: number) => {
  //   setStatus(GameStatus.gameOver)
  //   setIsOpenedMatrix(
  //     logic.createMatrixWithValue(true, fieldParams.width, fieldParams.height)
  //   )
  // }

  const openCell = (rowIndex: number, colIndex: number, fIeld: number[][]) => {
    if (seriesCount === 0) {
      const newIsOpenedMatrix = [...isOpenedMatrix]
      const newIsOpenedMatrixVisiable = [...isOpenedMatrixVisiable]

      if (coordsFirstCard && coordsSecondCard) {
        clearTimeout(timerId)
        if (coordsFirstCard && coordsSecondCard) {
          newIsOpenedMatrix[coordsFirstCard[0]][coordsFirstCard[1]] = false
          newIsOpenedMatrix[coordsSecondCard[0]][coordsSecondCard[1]] = false
          newIsOpenedMatrixVisiable[coordsFirstCard[0]][coordsFirstCard[1]] =
            false
          newIsOpenedMatrixVisiable[coordsSecondCard[0]][coordsSecondCard[1]] =
            false
        }
      }

      newIsOpenedMatrix[rowIndex][colIndex] = true
      newIsOpenedMatrixVisiable[rowIndex][colIndex] = true

      setSeriesCount(1)
      setIsOpenedMatrix(newIsOpenedMatrix)
      setIsOpenedMatrixVisiable(newIsOpenedMatrixVisiable)
      setCoordsFirstCard([rowIndex, colIndex])
    } else if (coordsFirstCard) {
      const newCoordsSecondCard = [rowIndex, colIndex]
      if (
        field[coordsFirstCard[0]][coordsFirstCard[1]] ===
        field[newCoordsSecondCard[0]][newCoordsSecondCard[1]]
      ) {
        const newIsOpenedMatrix = [...isOpenedMatrix]
        const newIsOpenedMatrixVisiable = [...isOpenedMatrixVisiable]

        setSeriesCount(0)
        setOpenedPairsCount(openedPairsCount + 1)

        newIsOpenedMatrix[newCoordsSecondCard[0]][newCoordsSecondCard[1]] = true
        newIsOpenedMatrixVisiable[newCoordsSecondCard[0]][
          newCoordsSecondCard[1]
        ] = true

        setIsOpenedMatrix(newIsOpenedMatrix)
        setIsOpenedMatrixVisiable(newIsOpenedMatrixVisiable)
        setCoordsFirstCard(null)
      } else {
        const newIsOpenedMatrix = [...isOpenedMatrix]
        const newIsOpenedMatrixVisiable = [...isOpenedMatrixVisiable]

        newIsOpenedMatrix[coordsFirstCard[0]][coordsFirstCard[1]] = false
        newIsOpenedMatrix[newCoordsSecondCard[0]][newCoordsSecondCard[1]] =
          false

        newIsOpenedMatrixVisiable[newCoordsSecondCard[0]][
          newCoordsSecondCard[1]
        ] = true

        setSeriesCount(0)
        setCoordsSecondCard(newCoordsSecondCard)
        setIsOpenedMatrix(newIsOpenedMatrix)
        setIsOpenedMatrixVisiable(newIsOpenedMatrixVisiable)

        const timer = setTimeout(() => {
          const newISOpenedMatrixVisiable = [...isOpenedMatrixVisiable]

          newISOpenedMatrixVisiable[coordsFirstCard[0]][coordsFirstCard[1]] =
            false
          newISOpenedMatrixVisiable[newCoordsSecondCard[0]][
            newCoordsSecondCard[1]
          ] = false
          setIsOpenedMatrixVisiable(newISOpenedMatrixVisiable)
        }, 900)
        setTimerId(timer)
      }
    }
  }

  const generateField = (rowIndex: number, colIndex: number) => {
    const newField = [
      [0, 0, 1, 1],
      [2, 2, 3, 3],
      [4, 4, 5, 5],
    ]
    setField(newField)
    openCell(rowIndex, colIndex, newField)
  }

  const cellOpenHandler = (rowIndex: number, colIndex: number) => {
    if (status === GameStatus.notStarted) {
      generateField(rowIndex, colIndex)
    } else if (status === GameStatus.started) {
      openCell(rowIndex, colIndex, field)
    }
  }

  const restartGame = () => {
    const newIsOpenedMatrixVisiable = [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ]
    const newIsOpenedMatrix = [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ]
    setIsOpenedMatrix(newIsOpenedMatrix)
    setIsOpenedMatrixVisiable(newIsOpenedMatrixVisiable)
  }

  const gameStatusLabel = useMemo(
    () => logic.checkForGameOver(status),
    [status]
  )

  return (
    <div className="flex items-center flex-col">
      <StopWatch status={status} />
      <h1
        className={`text-center ${
          status === 3 ? "win text-lg mb-1" : "game-over mb-2"
        }`}
      >
        {gameStatusLabel || <span>&nbsp;</span>}
      </h1>
      <Field
        status={status}
        theme={theme}
        field={field}
        isOpenedMatrix={isOpenedMatrix}
        isOpenedMatrixVisiable={isOpenedMatrixVisiable}
        onCellOpen={cellOpenHandler}
      />
      <div className="my-4 text-center w-32">
        <Button colour="black" shape="rounded" onClick={restartGame}>
          Restart
        </Button>
      </div>
    </div>
  )
}

export default Game
