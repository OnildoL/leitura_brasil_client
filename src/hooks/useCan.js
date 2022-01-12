import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export function useCan({ permissions, roles }) {
  const { user, isAuthenticated } = useContext(AuthContext)
  
  if (!isAuthenticated) {
    return false
  }

  if (permissions) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permission.includes(permission)
    })

    if (!hasAllPermissions) {
      return false
    }
  }
  
  if (roles) {
    const hasAllRoles = roles.some(role => {
      return user.role.includes(role)
    })

    if (!hasAllRoles) {
      return false
    }
  }

  return true
}