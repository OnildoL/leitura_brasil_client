import { useContext } from "react"
import { v4 } from "uuid"
import { NotificationContext } from "../components/Notifications"

export function useNotification() {
  const dispatch = useContext(NotificationContext)

  return (props) => {
    dispatch({
      type: "add_notification",
      payload: {
        id: v4(),
        ...props
      }
    })
  }
}