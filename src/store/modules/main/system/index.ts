import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootState } from '../../../type'
import { createPageData, editPageData } from '@/service/main/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      usersListCount: 0,
      roleList: [],
      roleListCount: 0,
      menuList: [],
      menuListCount: 0
    }
  },
  getters: {
    getPageList(state) {
      return (pageNmae: string) => {
        return (state as any)[`${pageNmae}List`]
      }
    },
    getPageListCount(state) {
      return (pageNmae: string) => {
        return (state as any)[`${pageNmae}ListCount`]
      }
    }
  },
  mutations: {
    changeUsersList(state, usersList) {
      state.usersList = usersList
    },
    changeUsersListCount(state, usersListCount) {
      state.usersListCount = usersListCount
    },
    changeRoleList(state, roleList) {
      state.roleList = roleList
    },
    changeRoleListCount(state, roleListCount) {
      state.roleListCount = roleListCount
    },
    changeMenuList(state, menuList) {
      state.menuList = menuList
    },
    changeMenuListCount(state, menuListCount) {
      state.menuListCount = menuListCount
    }
  },
  actions: {
    getPageListAction({ dispatch }, payload) {
      dispatch('getPageList', payload, { root: true })
    },
    deletePageDataAction({ dispatch }, payload) {
      dispatch('deletePageData', payload, { root: true })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData, moduleName } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        moduleName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id, moduleName } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        moduleName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
