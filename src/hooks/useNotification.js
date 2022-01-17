import { useContext } from "react"
import { NotificationContext } from "../components/Notifications"

export function useNotification() {
  const dispatch = useContext(NotificationContext)

  return (props) => {
    dispatch({
      type: "add_notification",
      payload: {
        id: "1283jh9812hj39812",
        ...props
      }
    })
  }
}