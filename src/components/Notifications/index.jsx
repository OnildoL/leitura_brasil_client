import { createContext, useReducer, useState } from "react"
import { Notification } from "./Notification"

export const NotificationContext = createContext()

export function NotificationProvider(props) {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case "add_notification":
        return [...state, {...action.payload}]
      case "remove_notification":
        return state.filter(element => element.id !== action.id)
      default:
        return state
    }
  }, [])

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className="notification_wrapper">
        {state.map((note) => {
          return <Notification dispatch={dispatch} key={note.id} {...note} />
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  )
}