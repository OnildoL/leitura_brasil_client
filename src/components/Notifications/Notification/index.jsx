import { useEffect, useState } from "react"

export function Notification(props) {
  const [exit, setExit] = useState(false)
  const [width, setWidth] = useState(0)
  const [intervalID, setIntervalID] = useState(null)

  function handleStartTimer() {
    const id = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5
        }

        clearInterval(id)

        return prev
      })
    }, 20)

    setIntervalID(id)
  }

  function handlePauseTimer() {
    clearInterval(intervalID)
  }

  function handleCloseNotification() {
    handlePauseTimer()

    setExit(true)

    setTimeout(() => {
      props.dispatch({
        type: "remove_notification",
        id: props.id
      })
    }, 400)
  }

  useEffect(() => {
    if (width === 100) {
      handleCloseNotification()
    }
  }, [width])

  useEffect(() => {
    handleStartTimer()
  }, [])

  return (
    <div 
      onMouseEnter={handlePauseTimer} 
      onMouseLeave={handleStartTimer}
      className={`notification_item ${props.type === "success" ? "success": "error"} ${exit && "exit"}`}
    >
      {props.title && <h2>{props.title}</h2>}
      <p>{props.message}</p>
      <div className="bar" style={{width: `${width}%`}}/>
    </div>
  )
}