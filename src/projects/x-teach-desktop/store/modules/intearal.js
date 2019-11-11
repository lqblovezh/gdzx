import service from 'services/x-teach/front'
import qs from 'qs'

const PAGESIZE = 16
export default {
  namespaced: true,
  state: () => ({
    name: 'intearal',
    page: {
      pageNum: 1,
      pageOffset: PAGESIZE,
      total: 1,
    },
    collegeList: [],
    collegePage: {
      pageNum: 1,
      pageOffset: PAGESIZE,
      total: 1,
    },
    collegeDetail: {},
    collegeCourse: [],
    collegeCoursePage: {
      pageNum: 1,
      pageOffset: PAGESIZE,
      total: 1,
    },
    collegeBanner: [],
    list: [],
  }),
  actions: {
    getList({ commit, state }, data = {}) {
      if (!data.type) {
        data.type = 'books'
      }
      return service.intearal.getList({ ...state.page, ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    getCollegeIndex({ dispatch, state }, data = {}) {
      // 获取大学列表
      return Promise.all([
        dispatch('getCollegeList', data),
        dispatch('getCollegeBanner', data),
      ])
    },
    getCollegeList({ state }, data = {}) {
      service.university
        .getList({ ...state.collegePage, ...data })
        .then(res => {
          state.collegeList = res.data
          state.collegePage.total = res.page.total
          state.collegePage.pageNum = res.page.num
        })
    },
    getCollegeAll({ dispatch, state }, data = {}) {
      return Promise.all([
        dispatch('getCollegeDetail', data),
        dispatch('getCollegeCourse', data),
      ])
    },
    getCollegeDetail({ commit, state }, data = {}) {
      service.university.detail(data).then(res => {
        state.collegeDetail = res.data
      })
    },
    getCollegeCourse({ commit, state }, data = {}) {
      service.university
        .getInfoList({ ...state.collegeCoursePage, status: 1, ...data })
        .then(res => {
          state.collegeCourse = res.data
          state.collegeCoursePage.total = res.page.total
          state.collegeCoursePage.pageNum = res.page.num
        })
    },
    getCollegeBanner({ commit, state }, data = {}) {
      service.home.getHomeSettings({ type: 'colleges_pc' }).then(res => {
        if (!(res.data && res.data.value)) return
        state.collegeBanner = qs.parse(res.data.value)
        // console.log(state.collegeBanner.length, 1111)
      })
    },
  },
  mutations: {},
}
