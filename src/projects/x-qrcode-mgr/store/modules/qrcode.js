export default {
  state: {
    list: null,
    groupList: null,
    page: null,
  },
  mutations: {
    setQrcodelist(state, data) {
      state.list = data
    },
    setQrcodelistPage(state, data) {
      state.page = data
    },
    setQrcodeGrouplist(state, data) {
      state.groupList = data
    },
    resetPage(state) {
      state.page = {}
    },
  },
  actions: {}, //异步操作state
  getters: {},
}
