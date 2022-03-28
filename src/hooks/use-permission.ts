import { useStore } from 'vuex'

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  const permissions = store.state.userModule.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`

  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item: any) => item === verifyPermission)
}
