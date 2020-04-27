import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSidebar: true,
  },
  mutations: {
    // 设置左侧展开收缩
    SET_SIDEBAR(state, value) {
      state.isSidebar = value
    },
  },
  actions: {
    // 更新左侧展开收缩
    SET_SIDEBAR({ commit }, value) {
      commit('SET_SIDEBAR', value)
    },
  },
  getters:{
    isSidebar: state => state.isSidebar,
  },
  modules: {
  }
})
