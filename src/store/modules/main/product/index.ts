import { Module } from 'vuex'
import { IProductState } from './type'
import { IRootState } from '../../../type'
// import { getPageListData } from '@/service/main/system'

const productModule: Module<IProductState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      goodsList: [],
      goodsListCount: 0
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
    changeGoodsList(state, goodsList) {
      state.goodsList = goodsList
    },
    changeGoodsListCount(state, goodsListCount) {
      state.goodsListCount = goodsListCount
    }
  },
  actions: {
    async getPageListAction({ dispatch }, payload) {
      dispatch('getPageList', payload, { root: true })
    }
  }
}

export default productModule
