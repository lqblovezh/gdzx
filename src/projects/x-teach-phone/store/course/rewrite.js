import {
  getDetail,
  getPaper
} from 'services/x-teach/front/course'
import { isArray } from '@/utils/helpers'

module.exports = {
  namespaced: true,
  state: {
    info: {}, // 课程信息
    paper_info: {} // 试卷列表信息
  },
  getters: {
    // 通过课时id，从总的信息对象中筛选出需要的
    course_hour_item: (state) => (id) => {
      const item = isArray(state.info.course_period_list) && state.info.course_period_list.find(item => item.id === id)
      return item ? item : {}
    },
    // 根据id列表，从数据中心选择出资源
    resourse_info: (state) => ({ h_id, p_id, r_id }) => {
      const h_item = isArray(state.info.course_period_list) && state.info.course_period_list.find(item => item.id === h_id)
      let temp = {}
      if (h_item) {
        const { teaching_plan } = h_item
        const p_item = isArray(teaching_plan) && teaching_plan.find(item => item.id === p_id)
        if (p_item) {
          const { teaching_plan_info } = p_item
          temp = isArray(teaching_plan_info) && teaching_plan_info.find(item => item.id === r_id)
        }
      }
      return temp ? temp : {}
    },
    // 课程的教师信息
    teacher_info(state) {
      return state.info.teach_user || {}
    },
    paper_list(state) {
      return state.paper_info.list || []
    },
    report(state) {
      const {
        pager_end_string,
        pager_start_string,
        total_percentage,
        course_title
      } = state.paper_info
      return {
        pager_end_string,
        pager_start_string,
        total_percentage,
        course_title
      }
    }
  },
  mutations: {
    set_info(state, data) {
      state.info = data
    },
    set_paper_info(state, data) {
      state.paper_info = data
    }
  },
  actions: {
    init({ dispatch }, params) {
      Promise.all([
        dispatch('queryCourseInfo', params),
        dispatch('queryPaperList', params)
      ])
    },
    async queryCourseInfo({ commit }, { course_id } = {}) {
      try {
        const { data } = await getDetail({ id: course_id })
        commit('set_info', data)
      } catch (e) {
        console.warn(`something wrong had happen ${e.toString()}`);
      }
    },
    async queryPaperList({ commit }, { course_id } = {}) {
      try {
        const { data } = await getPaper({ id: course_id })
        commit('set_paper_info', data)
      } catch (e) {
        console.warn(`something wrong had happen ${e.toString()}`);
      }
    }
  }
}