import { App } from 'vue'
import registerIcon from './register-icon'
import registerProps from './register-props'

export default function (app: App): void {
  app.use(registerIcon)
  app.use(registerProps)
}
