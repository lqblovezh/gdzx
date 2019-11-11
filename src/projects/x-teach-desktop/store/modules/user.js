import service from 'services/x-teach/front'
const PAGESIZE = 16
export default {
  namespaced: true,
  state: () => ({
    name: 'userCenter',
    page: {
      pageNum: 1,
      pageOffset: PAGESIZE,
      total: 0,
    },
    list: [],
    totalMessageNum: 0,
  }),
  actions: {
    courseList({ commit, state }, data = {}) {
      return service.userCenter.courseList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    classList({ commit, state }, data = {}) {
      return service.userCenter.classList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    messageList({ commit, state }, data = {}) {
      return service.userCenter.messageList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    talkListList({ commit, state }, data = {}) {
      return service.userCenter.talkListList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    teacherList({ commit, state }, data = {}) {
      return service.userCenter.teacherList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    orderList({ commit, state }, data = {}) {
      return service.userCenter.orderList({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    integralList({ commit, state }, data = {}) {
      return service.intearal.integral({ ...data }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
    async getMessageStatus({ commit }) {
      try {
        const res = await service.userCenter.messageStatus()
        res.data && commit('setTotalMsg', getMsgTotal(res.data) )
      } catch (e) {
        console.error(`[vuex getMessageStatus]：${e.toString()}`)
      }
    }
  },
  mutations: {
    setList(state, data) {
      state.list = data
    },
    setPage(
      state,
      data = {
        pageNum: 1,
        pageOffset: PAGESIZE,
        total: 1,
      }
    ) {
      state.page = data
    },
    setTotalMsg(state, num) {
      state.totalMessageNum = num
    }
  },
}
function getMsgTotal(list) {
  let sum = 0
  list.forEach(item => sum += item.total)
  return sum
}