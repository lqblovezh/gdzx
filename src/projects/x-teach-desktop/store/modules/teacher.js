import service from 'services/x-teach/front'
const PAGESIZE = 20

export default {
  namespaced: true,
  state: () => ({
    name: 'teacher',
    page: {
      pageNum: 1,
      pageOffset: PAGESIZE,
      total: 0,
    },
    list: [],
    teacher: {}
  }),
  actions: {
    getList({commit,state},data = {}) {
      return service.teacher.getTeacherList({...state.page,...data}).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    getTeacherDate({commit,state},data = {}) {
      return service.teacher.getDetailTeacher({...data}).then(res => {
        state.teacher = res.data
      })
    },
    getCourseByTid({commit,state},data = {}) {
      return service.teacher.getCourseByTid({...state.page,...data}).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    getClassByTid({commit,state},data = {}) {
      return service.teacher.getClassByTid({...state.page,...data}).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    getLivesByTid({commit,state},data = {}) {
      const params = {
        teacher_id: data.id
      }
      return service.teacher.getLivesByTid({...state.page, ...params}).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    getTeacherMessage({commit,state},data = {}) {
      return service.teacher.getTeacherMessage({...state.page,...data}).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    }
  },
  mutations: {
    setList(state,data) {
      state.list = data
    },
    setPage(state,data = {
      pageNum: 1,
      pageOffset: PAGESIZE,
      total: 1,
    }) {
      state.page = data
    }
  },
}
