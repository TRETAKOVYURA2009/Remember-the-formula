import { GameStatus } from "../types/game"

export function getRandNumber(max: number) {
  return Math.floor(Math.random() * max)
}

export function createMatrixWithValue<Type>(
  value: Type,
  width: number,
  height: number
): Type[][] {
  return Array(height)
    .fill(null)
    .map(() => Array(width).fill(value))
}

export function checkForVictory(status: GameStatus) {
  if (status === GameStatus.finished) return "WIN"
  return undefined
}
