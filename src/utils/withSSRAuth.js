import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { parseCookies } from "nookies"
import { useNotification } from "../hooks/useNotification"

export function useWithSSRAuth() {
  const cookies = parseCookies()
  const navigate = useNavigate()
  const dispatch = useNotification()

  useEffect(() => {
    if (!cookies["leitura_brasil.token"]) {
      navigate("/")
      
      dispatch({
        type: "error",
        message: `Conexão com o servidor expirada!`,
      })
    }
  }, [])
}

export function useTheTokenIfItExists() {
  const cookies = parseCookies()
  const navigate = useNavigate()

  useEffect(() => {
    if (cookies["leitura_brasil.token"]) {
      navigate("/main")
    }
  }, [])
}
