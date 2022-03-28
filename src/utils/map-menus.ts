import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null

export default function mapMenusToRoutes(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  const _recurseGetRoute = (userMenus: any[]) => {
    for (const menu of userMenus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) firstMenu = menu
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(menus)
  return routes
}

export function mapPathToMenu(
  menus: any[],
  path: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of menus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenu(menu.children ?? [], path)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}

export function pathMapBreadcrumbs(menus: any[], path: string) {
  const breadcrumbs: IBreadcrumb[] = []
  mapPathToMenu(menus, path, breadcrumbs)
  return breadcrumbs
}

// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   const breadcrumbs: IBreadcrumb[] = []

//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = mapPathToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }

//   return breadcrumbs
// }

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leftKeys
}

export { firstMenu }
