import React, { useEffect, useMemo, useState } from "react"
import { GameStatus } from "../types/game"

interface StopWatchProps {
  status: GameStatus
}

const StopWatch: React.FC<StopWatchProps> = ({ status }) => {
  const [counter, setCounter] = useState(0)
  const timeUnits = useMemo(() => {
    const minutes = Math.floor(counter / 60)
    const seconds = Math.ceil(counter) % 60
    return {
      minutes,
      seconds: `${minutes && seconds < 10 ? "0" : ""}${seconds}`,
    }
  }, [counter])

  useEffect(() => {
    if (status === GameStatus.started) {
      setTimeout(() => setCounter(counter + 0.125), 125)
    } else if (status === GameStatus.notStarted) {
      setCounter(0)
    }
  }, [counter, status])

  return (
    <div className="border-2 rounded-lg border-gray-950 w-24 h-10 text-center flex items-center justify-center">
      {!!timeUnits.minutes && (
        <span className="mont text-2xl">{`${timeUnits.minutes}:`}</span>
      )}
      <span className="mont text-2xl">{`${timeUnits.seconds}`}</span>
    </div>
  )
}

export default StopWatch
