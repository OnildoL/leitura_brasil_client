import { useCan } from "./useCan"

export function usePermission() {
  const userCanSeeDev = useCan({
    roles: ["developer"]
  })
  const userCanSeeAdmin = useCan({
    roles: ["developer", "manager"]
  })

  const userCanSeeUsers = useCan({
    permissions: ["all", "users.find"],
  })

  const userCanRegisterUsers = useCan({
    permissions: ["all", "users.create"]
  })

  const userCanSeeSelectStore = useCan({
    permissions: ["all", "goals.stores"]
  })

  return {
    userCanSeeDev,
    userCanSeeAdmin,
    userCanSeeUsers,
    userCanRegisterUsers,
    userCanSeeSelectStore
  }
}
