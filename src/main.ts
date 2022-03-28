import { createApp } from 'vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import global from './global'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-loading.css'
import './assets/css/normalize.less'
import App from './App.vue'

const app = createApp(App)
setupStore()
app.use(router).use(store).use(global).mount('#app')
