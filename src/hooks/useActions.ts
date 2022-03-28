import { createNamespacedHelpers, useStore } from 'vuex'

export default function (moduleName: string, mapper: string[]) {
  const store = useStore()
  const { mapActions } = createNamespacedHelpers(moduleName)
  const storeState: any = mapActions(mapper)
  const newStoreState: any = {}
  Object.keys(storeState).forEach((fnKey) => {
    newStoreState[fnKey] = storeState[fnKey].bind({ $store: store })
  })

  return newStoreState
}
