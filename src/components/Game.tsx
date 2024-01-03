import React, { useMemo, useState } from "react"
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
    width: 5,
    height: 4,
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

  const openCell = (rowIndex: number, colIndex: number, fIeld: number[][]) => {
    const newIsOpenedMatrix = [...isOpenedMatrix]
    const newIsOpenedMatrixVisiable = [...isOpenedMatrixVisiable]
    if (seriesCount === 0) {
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
      const numberBehindFirstCard =
        field[coordsFirstCard[0]][coordsFirstCard[1]]
      const numberBehindFirstCardPotential = numberBehindFirstCard + 10

      const numberBehindSecondCard =
        field[newCoordsSecondCard[0]][newCoordsSecondCard[1]]
      const numberBehindSecondCardPotential = numberBehindSecondCard + 10
      if (
        numberBehindFirstCard === numberBehindSecondCardPotential ||
        numberBehindFirstCardPotential === numberBehindSecondCard
      ) {
        setSeriesCount(0)
        const newOpenedPairsCount = openedPairsCount + 1
        if (newOpenedPairsCount === 10) {
          setStatus(GameStatus.finished)
        }
        setOpenedPairsCount(openedPairsCount + 1)

        newIsOpenedMatrix[newCoordsSecondCard[0]][newCoordsSecondCard[1]] = true
        newIsOpenedMatrixVisiable[newCoordsSecondCard[0]][
          newCoordsSecondCard[1]
        ] = true

        setIsOpenedMatrix(newIsOpenedMatrix)
        setIsOpenedMatrixVisiable(newIsOpenedMatrixVisiable)
        setCoordsFirstCard(null)
      } else {
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
        }, 1500)
        setTimerId(timer)
      }
    }
  }

  const generateField = (rowIndex: number, colIndex: number) => {
    const newField = logic.generateFieldMatrix(
      fieldParams.height,
      fieldParams.width,
      logic.getNumbers()
    )
    setStatus(GameStatus.started)
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
    setIsOpenedMatrix(
      logic.createMatrixWithValue(false, fieldParams.width, fieldParams.height)
    )
    setIsOpenedMatrixVisiable(
      logic.createMatrixWithValue(false, fieldParams.width, fieldParams.height)
    )
    setField(
      logic.createMatrixWithValue(0, fieldParams.width, fieldParams.height)
    )
    setOpenedPairsCount(0)
    setSeriesCount(0)
    setCoordsFirstCard(null)
    setCoordsSecondCard(null)
    setStatus(GameStatus.notStarted)
  }

  const gameStatusLabel = useMemo(() => logic.checkForVictory(status), [status])

  return (
    <div className="flex items-center flex-col">
      <StopWatch status={status} />
      <h1 className={`text-center ${status === 2 ? "win text-2xl mb-1" : ""}`}>
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
