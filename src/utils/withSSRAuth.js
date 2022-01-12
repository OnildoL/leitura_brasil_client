import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { parseCookies } from "nookies"

export function useWithSSRAuth() {
  const cookies = parseCookies()
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies["leitura_brasil.token"]) {
      navigate("/")
    }
  }, [])
}
