import service from 'services/x-teach/front'
import { Loading } from 'element-ui'
import qs from 'qs'

export default {
  namespaced: true,
  state: () => ({
    name: 'home',
    categoryList: [],
    categoryListTop: [],
    categoryChildList: [],
    categoryCourseList: [],
    categoryCoursePage: {
      pageNum: 1,
      pageOffset: 20,
      total: 1,
    },
    likeList: [],
    relevantList: [],
    commendTeacher: [],
    commendLive: [],
    bannerList: null,
    bottom: null,
    advertisementList: [],
    columnList: [], //栏目列表
    advertisementListSide: [],
    rankFree: [], //排行
    rankPay: [],
  }),
  actions: {
    async getData(ctx, query) {
      return Promise.all([
        // ctx.dispatch('getCategoryTree', query),
        // ctx.dispatch('getCommendLive', query),
        // ctx.dispatch('getRelevantLists', query),
        // ctx.dispatch('getBottom'),
        ctx.dispatch('getLikeLists', query),
        ctx.dispatch('getBanners'),
        ctx.dispatch('getAdvertisement'),
        ctx.dispatch('getColumnList'),
      ])
    },
    async getCategoryData(ctx, query) {
      // await Promise.all([
      //   ctx.dispatch('getCategoryTree', query),
      //   ctx.dispatch('getCategoryCourse', query),
      // ])
      await ctx.dispatch('getCategoryTree', query)
      await ctx.dispatch('getCategoryCourse', query)
    },
    getColumnList(ctx, query) {
      return service.home.getColumnList().then(res => {
        ctx.state.columnList = res.data
      })
    },
    getCategoryList(ctx, query) {
      return service.course.getCategoryTree().then(res => {
        ctx.state.categoryListTop = res.data
      })
    },
    getCategoryTree(ctx, query) {
      return service.course.getCategoryTree().then(res => {
        let allData = [{ name: '全部', type: 'all', children: [] }].concat(
          res.data
        )
        ctx.dispatch('changeCateChecked', { query, data: allData })
        ctx.state.categoryList = allData
      })
    },
    getCommendLive(ctx, query) {
      return service.home.getRecommendLists({ type: 'live' }).then(res => {
        ctx.state.commendLive = res.data
      })
    },
    getLikeLists(ctx, query) {
      return service.home
        .getLikeLists({
          size: 10,
        })
        .then(res => {
          if (ctx.state.likeList && !ctx.state.likeList.length) {
            ctx.state.likeList = res.data
          }
        })
    },
    getRelevantLists(ctx, query) {
      return service.home.getRecommendLists({ type: 'course' }).then(res => {
        if (ctx.state.relevantList && !ctx.state.relevantList.length) {
          ctx.state.relevantList = res.data
        }
      })
    },
    getBanners(ctx, query) {
      return service.home.getHomeSettings({ type: 'banner_pc' }).then(res => {
        if (!(res.data && res.data.value)) return
        ctx.state.bannerList = qs.parse(res.data.value)
      })
    },
    getBottom(ctx, query) {
      return service.home.getHomeSettings({ type: 'bottom' }).then(res => {
        if (!(res.data && res.data.value)) return
        ctx.state.bottom = qs.parse(res.data.value)
        let teacher = qs.parse(res.data.value).teacher
        if (teacher) {
          ctx.state.commendTeacher = teacher.filter(
            item => item.status !== 'false'
          )
          console.log(ctx.state.commendTeacher, 222)
        }
      })
    },
    getRank(ctx, query) {
      return Promise.all([
        service.home
          .getRank({ type: 'pay', classify_id: query.id })
          .then(res => {
            ctx.state.rankPay = res.data
          }),
        service.home
          .getRank({ type: 'free', classify_id: query.id })
          .then(res => {
            ctx.state.rankFree = res.data
          }),
      ])
    },
    getAdvertisement(ctx, query) {
      return Promise.all([
        service.home.getHomeSettings({ type: 'advert' }).then(res => {
          if (!(res.data && res.data.value)) return
          ctx.state.advertisementListSide = qs.parse(res.data.value)
        }),
        service.home.getHomeSettings({ type: 'ad' }).then(res => {
          if (!(res.data && res.data.value)) return
          ctx.state.advertisementList = qs.parse(res.data.value)
        }),
      ])
    },
    // 得到分类下课程
    // getCategoryCourse(ctx, query) {
    //   // query 可能包含查询新型, 需要以query为准
    //   let data = { ...ctx.state.categoryCoursePage, ...query }
    //   ctx.dispatch('changeCateChecked', {
    //     query,
    //     data: ctx.state.categoryList,
    //   })
    //   return Promise.all([
    //     ctx.dispatch('getRank', query),
    //     service.course.getClass(data).then(res => {
    //       ctx.state.categoryCourseList = res.data
    //       ctx.state.categoryCoursePage.total = res.page.total
    //       ctx.state.categoryCoursePage.pageNum = res.page.num
    //     }),
    //   ])
    // },
    getCategoryCourse(ctx, query) {
      // query 可能包含查询新型, 需要以query为准
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      let data = { ...ctx.state.categoryCoursePage, ...query }
      ctx.dispatch('changeCateChecked', {
        query,
        data: ctx.state.categoryList,
      })
      return Promise.all([
        ctx.dispatch('getRank', query),
        service.search.search({ ...data, class_id: data.id }).then(res => {
          ctx.state.categoryCourseList = res.data
          ctx.state.categoryCoursePage.total = res.page.total
          ctx.state.categoryCoursePage.pageNum = res.page.num
          loading.close()
        }),
      ])
    },

    // 改变list 选中状态
    changeCateChecked(ctx, { query, data }) {
      if (query && query.id) {
        for (const item of data) {
          if (item.id === query.id) {
            item.checked = true
          } else {
            item.checked = false
          }
          for (const citem of item.children) {
            if (citem.id === query.id) {
              citem.checked = true
              item.checked = true
            } else {
              citem.checked = false
            }
          }
          if (item.checked) {
            ctx.state.categoryChildList = item.children
          }
        }
      } else {
        data.forEach(item => (item.checked = false))
        data[0].checked = true
        ctx.state.categoryChildList = []
      }
    },
  },
  mutations: {
    getList() {},
  },
}
