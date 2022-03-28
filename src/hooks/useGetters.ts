import { createNamespacedHelpers, useStore } from 'vuex'
import { computed } from 'vue'

export default function (moduleName: string, mapper: string[]) {
  const store = useStore()
  const { mapGetters } = createNamespacedHelpers(moduleName)
  const storeState: any = mapGetters(mapper)
  const newStoreState: any = {}
  Object.keys(storeState).forEach((fnKey) => {
    newStoreState[fnKey] = computed(storeState[fnKey].bind({ $store: store }))
  })

  return newStoreState
}
