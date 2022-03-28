import { createNamespacedHelpers, useStore, mapState } from 'vuex'
import { computed } from 'vue'

export default function (moduleName: string | string[], mapper?: string[]) {
  const newStoreState: any = {}
  const store = useStore()
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    const { mapState } = createNamespacedHelpers(moduleName)
    const storeState: any = mapState(mapper as string[])
    Object.keys(storeState).forEach((fnKey) => {
      newStoreState[fnKey] = computed(storeState[fnKey].bind({ $store: store }))
    })
  } else {
    const storeState: any = mapState(moduleName as string[])
    Object.keys(storeState).forEach((fnKey) => {
      newStoreState[fnKey] = computed(storeState[fnKey].bind({ $store: store }))
    })
  }
  return newStoreState
}
