// import * from './types'
import { isLogin } from 'services/x-teach/front/user'

module.exports = {
  namespaced: true,
  state: {
    userInfo: null,
    shopInfo: null,
    messageInfo: null,
  },
  getters: {
    info(state) {
      return state.userInfo || {}
    },
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setShopInfo(state, data) {
      state.shopInfo = data
    },
    setMessageInfo(state, data) {
      state.messageInfo = data
    },
    // 在用户退出之后将用户的相关信息清除
    clearState(state) {
      state.userInfo = null
      state.shopInfo = null
      state.messageInfo = null
    },
  },
  actions: {
    queryUserInfo({ commit }) {
      return isLogin()
        .then(res => {
          // alert(JSON.stringify(res.data))
          commit('setUserInfo', res.data.user)
        })
        .catch(() => {})
    },
  },
}
