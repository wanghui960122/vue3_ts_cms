import * as Icons from '@element-plus/icons-vue'
import { App } from 'vue'

export default function (app: App) {
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
  })
}
