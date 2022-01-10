import { createContext } from "react"
import { api } from "../services/api"

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const isAuthenticated = false
  
  async function signIn({ user, password }) {
    try {
      const response = await api.post("sessions", {
        user,
        password
      })

      console.log(response)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}