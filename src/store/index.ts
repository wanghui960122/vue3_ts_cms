import { createStore } from 'vuex'
import userModule from './modules/user'
import system from './modules/main/system'
import product from './modules/main/product'
import dashboard from './modules/main/analysis/dashboard'
import { getPageListData, deletePageData } from '@/service/main/system'
import { IRootState } from './type'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderwhy',
      age: 12,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    },
    async getPageList({ commit }, payload: any) {
      const result = await getPageListData(
        `/${payload.pageName}/list`,
        payload.queryInfo
      )
      const changePageName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1)
      commit(
        `${payload.moduleName}/change${changePageName}List`,
        result.data.list
      )
      commit(
        `${payload.moduleName}/change${changePageName}ListCount`,
        result.data.totalCount
      )
    },
    async deletePageData({ dispatch }, payload) {
      await deletePageData(`/${payload.pageName}/${payload.id}`)
      dispatch('getPageList', payload)
    }
  },
  modules: {
    userModule,
    system,
    product,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('userModule/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export default store
