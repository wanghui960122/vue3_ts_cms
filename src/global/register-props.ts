import { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

export default function (app: App) {
  app.config.globalProperties.$filters = {
    formatDate: (data: string) => {
      return formatUtcString(data)
    }
  }
}
