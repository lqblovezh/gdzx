// import * from './types'
import qs from 'qs'
import {
  getBanners,
  getColumnList,
  getLikeLists,
} from 'services/x-teach/front/home'
import { getCategoryTree } from 'services/x-teach/front/course'

import { TOGGLE_LOADING } from '../types'

module.exports = {
  namespaced: true,
  state: {
    isShowLogin: false,
    isShowFooter: true,
    order_list: [],
    config: null,
    showHeadMsg: {
      status: false,
    },
    showLoading: false,
    banners: [], // 首页banner图
    category: [], // 分类查看,
    daily_course: [], // 每日推荐
    index_data: null, // 首页数据
  },
  getters: {
    // 精品课程
    spec_course(state) {
      return (
        (state.index_data &&
          state.index_data.find(item => item.type === 'course')) ||
        {}
      )
    },
    // 轨道名师
    teacher_list(state) {
      return (
        (state.index_data &&
          state.index_data.find(item => item.type === 'teacher')) ||
        {}
      )
    },
    // 经典课程
    classic_course(state) {
      return (
        (state.index_data &&
          state.index_data.find(item => item.type === 'class_course')) ||
        {}
      )
    },
    shop(state) {
      return (
        (state.index_data &&
          state.index_data.find(item => item.type === 'shop')) ||
        {}
      )
    },
  },
  mutations: {
    [TOGGLE_LOADING](state, data) {
      state.showLoading = data
    },
    toggleHeadMsg(state, data) {
      state.showHeadMsg = Object.assign(
        {
          content: '默认文字',
        },
        data
      )
    },
    setConfig(state, data) {
      state.config = data
    },
    setOrderInfo(state, data) {
      state.order_list = data
    },
    setHpState(state, data) {
      state.home_data = data
    },
    setLoginLayer(state, status) {
      state.isShowLogin = status
    },
    setFooterStatus(state, status) {
      state.isShowFooter = status
    },
    setLivePre(state, data) {
      state.livePre = data
    },
    set_index_data(state, data) {
      state.index_data = data
    },
    set_daily_course(state, data) {
      state.daily_course = data
      console.log(state.daily_course)
    },
  },
  actions: {
    async getInitialState({ dispatch }) {
      return Promise.all([
        dispatch('getBanner'),
        dispatch('queryIndexData'),
        dispatch('queryDailyCourse'),
      ])
    },
    getBanner(context) {
      return getBanners({ type: 'banner_mobile' }).then(res => {
        context.state.banners = res.data
          ? Object.values(qs.parse(res.data.value))
          : []
      })
    },
    async queryIndexData({ commit }) {
      const { data } = await getColumnList()
      commit('set_index_data', data)
    },
    async queryDailyCourse({ commit }) {
      console.log('----------------')
      const { data } = await getLikeLists()
      commit('set_daily_course', data)
    },
    async getCategoryTree({ state }) {
      const { data } = await getCategoryTree()
      state.category = data
    },
  },
}
