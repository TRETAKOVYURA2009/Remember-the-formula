import { createMatrixWithValue, getRandNumber } from "./utils"

export interface LoosObject {
  [key: string]: any
}

export function getNumbers() {
  const c: LoosObject = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "11": 11,
    "12": 12,
    "13": 13,
    "14": 14,
    "15": 15,
    "16": 16,
    "17": 17,
    "18": 18,
    "19": 19,
  }
  let len = 19
  const result = []
  for (let i = 0; i < 20; i++) {
    const x = getRandNumber(20 - i)
    result.push(c[`${x}`])
    for (let j = x; j < len; j++) {
      c[`${j}`] = c[`${j + 1}`]
    }
    len -= 1
  }
  return result
}

export function generateFieldMatrix(
  fieldHeight: number,
  fieldWidth: number,
  Numbers: number[]
) {
  let indexOfNumber = 0
  const field: number[][] = createMatrixWithValue(0, fieldWidth, fieldHeight)
  for (let i = 0; i < fieldHeight; i++) {
    for (let j = 0; j < fieldWidth; j++) {
      field[i][j] = Numbers[indexOfNumber]
      indexOfNumber += 1
    }
  }
  return field
}
