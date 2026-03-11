import { useEffect, useRef, useState } from 'react'
import './styles'

function App() {

  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalIdRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(() => {
    if(isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10)
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }

  }, [isRunning])
  
  const start = () => {
    setIsRunning(true)
    startTimeRef.current = Date.now() - elapsedTime
  }

  const stop = () => {
    setIsRunning(false)
  }
  
  const reset = () => {
    setElapsedTime(0)
    setIsRunning(false)
  }
  
  const formateTime = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
    let seconds = Math.floor(elapsedTime / 1000 % 60)
    let milliseconds = Math.floor((elapsedTime % 1000) / 10)

    hours = String(hours).padStart(2, '0')
    minutes = String(minutes).padStart(2, '0')
    seconds = String(seconds).padStart(2, '0')
    milliseconds = String(milliseconds).padStart(2, '0')

    return(
      `${minutes}:${seconds}:${milliseconds}`
    )
  }

  return (
    <div className='timer'>
      <h1 className="timer__time">{formateTime()}</h1>
      <div className="timer__buttons">
        <button type='button' onClick={start} className="timer__button button button--start">start</button>
        <button type='button' onClick={stop} className="timer__button button button--stop">stop</button>
        <button type='button' onClick={reset} className="timer__button button button--reset">reset</button>
      </div>
    </div>
  )
}

export default App
