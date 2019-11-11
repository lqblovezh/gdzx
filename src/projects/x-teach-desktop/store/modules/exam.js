import service from 'services/x-teach/front'

export default {
  namespaced: true,

  state: () => ({
    topics: [],
    paperList: {},
    paperDetail: [],
    paperScore: '',
    isHistoryPaperList: false,
  }),
  actions: {
    async getExamData(ctx, query) {
      return Promise.all([ctx.dispatch('getPaper', query)])
    },
    // 课程试卷列表
    getPaper(ctx, query) {
      return service.course.getPaper(query).then(res => {
        ctx.state.isHistoryPaperList = false
        ctx.state.paperList = res.data
      })
    },
    // 试卷详情
    getPaperDetail(ctx, query) {
      return Promise.all([
        ctx.dispatch('getPapaeResult', query),
        ctx.dispatch('getPaperScore', query),
      ])
    },
    // 试卷详情 得分
    getPapaeResult(ctx, query) {
      const { type } = query
      return service.course.getExercise(query).then(res => {
        ctx.state.paperDetail =
          type === 'mistake'
            ? (function() {
                return res.data.filter(item => {
                  return item.account !== item.score
                })
              })()
            : res.data
      })
    },
    // 试卷得分
    getPaperScore(ctx, query) {
      return service.course.getPaperScore(query).then(res => {
        ctx.state.paperScore = res.data
      })
    },
    // 课程历史错题
    getHistory(ctx, query) {
      return service.course.getHistory(query).then(res => {
        ctx.state.isHistoryPaperList = true
        ctx.state.paperList = res.data
      })
    },
    // 习题答案提交
    answer(ctx, query) {
      return service.course.answer(query).then(res => {})
    },
    // 试卷在做一次
    rePaper(ctx, query) {
      return service.course.rePaper(query).then(res => {})
    },
  },
}
