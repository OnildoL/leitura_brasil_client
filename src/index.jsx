import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import { NotificationProvider } from "./components/Notifications"
import { AuthProvider } from "./contexts/AuthContext"

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
     <AuthProvider>
      <App />
     </AuthProvider>
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById("root")
)