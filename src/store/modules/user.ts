import { ILoginState, IRootState } from '../type'
import { Module } from 'vuex'
import {
  accountRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login'
import localCache from '@/utils/cache'
import router from '@/router'
import mapMenusToRoutes, { mapMenusToPermissions } from '@/utils/map-menus'

const userModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
      localCache.setCache('token', token)
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)
    },
    changeUserMenus(state, userMenus: any[]) {
      state.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((item) => {
        router.addRoute('main', item)
      })
      state.permissions = mapMenusToPermissions(userMenus)
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: any) {
      const loginResult = await accountRequest({
        name: payload.account,
        password: payload.password
      })
      const { id, token } = loginResult.data
      commit('changeToken', token)
      const userInfo = await requestUserInfoById(id)
      commit('changeUserInfo', userInfo.data)
      const userMenu = await requestUserMenusByRoleId(userInfo.data.role.id)
      commit('changeUserMenus', userMenu.data)
      dispatch('getInitialDataAction', null, { root: true })
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default userModule
