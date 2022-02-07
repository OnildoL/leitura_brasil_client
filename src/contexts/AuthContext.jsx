import { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies, destroyCookie } from "nookies"
import { api } from "../services/api"

export const AuthContext = createContext({})

export function signOut() {
  destroyCookie(undefined, "leitura_brasil.token")
  destroyCookie(undefined, "leitura_brasil.refresh_token")

  window.location.href = "/"
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const isAuthenticated = !!user
  
  useEffect(() => {
    const { "leitura_brasil.token": token } = parseCookies()
    
    if (token) {
      api.get("/users/user").then(response => {
        const { user, name, role, store, permission } = response.data

        setUser({ user, name, role, store, permission })
      }).catch(() => {
        signOut()
      })
    }
  }, [])

  async function signIn({ user, password }) {
    try {
      const { data } = await api.post("sessions", {
        user,
        password,
      })
      
      const { user: userNumber, name, role, store, permission } = data.user
      const { token, refresh_token } = data

      setCookie(undefined, "leitura_brasil.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/"
      })

      setCookie(undefined, "leitura_brasil.refresh_token", refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/"
      })
      
      setUser({ userNumber, name, role, store, permission})

      api.defaults.headers["Authorization"] = `Bearer ${token}`

      return true
    } catch (error) {
      alert(error.response.data.message)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}