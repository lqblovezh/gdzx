import * as service from 'services/x-teach/front/search'
module.exports = {
  namespaced: true,
  state: {
    hots: [],
  },
  mutations: {
    SET_HOTS (state, data) {
      state.hots = data
    }
  },
  actions: {
    async getHots ({ commit }) {
      try {
        const res = await service.getHotSearchList()
        res.data && commit('SET_HOTS', res.data)
      } catch(e) {
        console.error(`[vuex getHots]：${e.toString()}`)
      }
    }
  }
}