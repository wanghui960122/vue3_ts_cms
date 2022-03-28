import { createWebHashHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localeCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

// interface routerObj {
//   path: string
//   component: () => void
// }

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('@/views/not-found/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localeCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})

// router.addRoute({

// })

export default router
