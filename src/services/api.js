import { signOut } from "../contexts/AuthContext"
import { parseCookies, setCookie } from "nookies"
import axios from "axios"

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue = []

export const api = axios.create({
  baseURL: "http://192.168.1.7:8080",
  headers: {
    Authorization: `Bearer ${cookies["leitura_brasil.token"]}`
  }
})

api.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    if (error.response.data?.message === "Token inválido!") {
      cookies = parseCookies()

      const { "leitura_brasil.refresh_token": refresh_token } = cookies
      const originalConfig = error.config

      if (!isRefreshing) {
        isRefreshing = true

        api.post("/refresh-token", {
          refresh_token
        }).then(response => {
          setCookie(undefined, "leitura_brasil.token", response.data.token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/"
          })

          setCookie(undefined, "leitura_brasil.refresh_token", response.data.refresh_token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/"
          })
  
          api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`

          failedRequestsQueue.forEach(request => request.onSuccess(response.data.token))
          failedRequestsQueue = []
        }).catch(error => {
          failedRequestsQueue.forEach(request => request.onFailure(error))
          failedRequestsQueue = []
        }).finally(() => {
          isRefreshing = false
        })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token) => {
            originalConfig.headers["Authorization"] = `Bearer ${token}`

            resolve(api(originalConfig))
          },
          onFailure: (error) => {
            reject(error)
          }
        })
      })
    } else {
      signOut()
    }
  }

  return Promise.reject(error)
})