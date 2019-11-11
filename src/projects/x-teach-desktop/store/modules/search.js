import service from 'services/x-teach/front'

export default {
  namespaced: true,
  state: () => ({
    formdata: {
      type: '1',
      name: '',
    },
    list: {
      course: {
        type: '1',
        name: '课程',
      },
      teacher: {
        type: '2',
        name: '教师',
      },
    },
    page: {
      pageNum: 1,
      pageOffset: 20,
      total: 1,
    },
    courseList: [],
  }),
  actions: {
    async getData(ctx, query) {
      const { type, name } = query
      ctx.state.formdata = { type, name }
      return Promise.all([ctx.dispatch('search', query)])
    },
    search(ctx, query) {
      let data = { ...ctx.state.page, ...query }
      return service.search.search(data).then(res => {
        ctx.state.courseList = res.data
        ctx.state.page.total = res.page.total
        ctx.state.page.pageNum = res.page.num
      })
    },
  },
}
