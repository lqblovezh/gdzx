import service from 'services/x-teach/front'

export default {
  namespaced: true,
  state: () => ({
    name: 'lives',
    page: {},
    list: [],
  }),
  actions: {
    getList({commit},data = {}) {
      return service.lives.getList({...data}).then(res => {
        commit('setList',res.data)
        commit('setPage',res.page)
      })
    },
  },
  mutations: {
    setList(state,data) {
      state.list = data
    },
    setPage(state,data) {
      state.page = data
    }
  },
}
