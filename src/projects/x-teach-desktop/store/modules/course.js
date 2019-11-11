import service from 'services/x-teach/front'
import localforage from 'localforage'
const PAGESIZE = 8

export default {
  namespaced: true,
  state: () => ({
    name: 'home',
    categoryList: [],
    clazzList: [],
    courseHour: null, // 当前课时
    courseDetail: null, // 详情页
    courseVideoDetail: null,
    courseDetailInfo: {},
    ids: {
      course_hour_id: '', // 课时
      course_teaching_id: '', //计划
      course_teaching_plan_id: '', // 资源
    },
    collegeList: [],
    collegePage: {
      pageNum: 1,
      pageOffset: PAGESIZE,
      total: 1,
    },
    mediaIndex: {
      itemIndex: '', // 课时index
      pitemIndex: '', //计划index
      citemIndex: '', // 资源index
    },
    teacherAnswerList: [],
    taPage: {
      pageNum: 1,
      pageOffset: 20,
      total: 1,
    },
    discussList: [],
    disPage: {
      pageNum: 1,
      pageOffset: 20,
      total: 1,
    },
  }),
  getters: {
    allMedia: state => {
      //console.log('计算')
      if (!state.courseVideoDetail) return null
      let itemList = state.courseVideoDetail.course_period_list
      for (let iIndex = 0; iIndex < itemList.length; iIndex++) {
        const item = itemList[iIndex]
        if (item.checkedVideo) {
          let pitemList = item.teaching_plan
          for (let pIndex = 0; pIndex < pitemList.length; pIndex++) {
            const pitem = pitemList[pIndex]
            if (pitem.checkedVideo) {
              let citemList = pitem.teaching_plan_info
              for (let cIndex = 0; cIndex < citemList.length; cIndex++) {
                const citem = citemList[cIndex]
                if (citem.type == 1) {
                  localStorage.setItem('access_code', citem.access_code)
                }
                if (citem.checkedVideo) {
                  let ids = {
                    course_hour_id: item.id,
                    course_teaching_id: pitem.id,
                    course_teaching_plan_id: citem.id,
                  }
                  let mediaIndex = {
                    itemIndex: iIndex,
                    pitemIndex: pIndex,
                    citemIndex: cIndex,
                  }
                  return {
                    itemList,
                    pitemList,
                    citemList,
                    item,
                    pitem,
                    citem,
                    mediaIndex,
                    ids,
                  }
                }
              }
              return {}
            }
          }
        }
      }
      return {}
    },
  },
  mutations: {
    updateCourse(state, data) {
      state.courseVideoDetail = data
    },
  },
  actions: {
    async getData(ctx, query) {
      return Promise.all([
        ctx.dispatch('getDetail', query),
        ctx.dispatch('getClazzList', query),
      ])
    },
    async getVideoData(ctx, query) {
      return Promise.all([ctx.dispatch('getVideoDetail', query)])
    },
    getDetail(ctx, query) {
      return service.course.getDetail(query).then(res => {
        let data = res.data
        if (data.price == 0 || data.user_speed_buy_status) {
          res.data.pass = true
        } else {
          res.data.pass = false
        }
        ctx.state.courseDetail = res.data
      })
    },
    getVideoDetail(ctx, query) {
      return service.course.getDetail({ id: query.course_id }).then(res => {
        return ctx.dispatch('checkedVideo', { query, data: res.data })
      })
    },
    checkedVideo(ctx, { query, data }) {
      // 给所有视频加上checked 字段, 避免之后频繁修改 难得$set
      ctx.dispatch('unChecked', { data })
      // 根据query, 选视频
      ctx.dispatch('checkedQuery', { data, query })
      localforage.clear()
      ctx.state.courseVideoDetail = data
    },
    checkedQuery(ctx, { query, data }) {
      const {
        course_id,
        course_hour_id,
        course_teaching_id,
        course_teaching_plan_id,
      } = query
      // if-for 大法
      if (course_hour_id) {
        for (const item of data.course_period_list) {
          if (item.id === course_hour_id) {
            item.checkedVideo = true
            if (course_teaching_id) {
              for (const pitem of item.teaching_plan) {
                if (pitem.id === course_teaching_id) {
                  pitem.checkedVideo = true
                  // 如果资源id存在
                  if (course_teaching_plan_id) {
                    for (const citem of pitem.teaching_plan_info) {
                      if (citem.id === course_teaching_plan_id) {
                        citem.checkedVideo = true
                      }
                    }
                  } else {
                    // 如果资源id不存在, 那么就是, 点击该课时 => 计划 进来
                    ////console.log('没有具体资源id  点击计划学习')
                    pitem.teaching_plan_info[0].checkedVideo = true
                  }
                }
              }
            } else {
              // 如果有course_hour_id, 却没有course_teaching_id
              // 说明就是点击课时, 继续学习
              // 遍历该课时
              item.teaching_plan[0].checkedVideo = true
              item.teaching_plan[0].teaching_plan_info[0].checkedVideo = true
              // frendly copy
            }
          }
        }
      } else {
        ////console.log('没有课时id   course_hour_id')
        if (data.end_speed_info) {
          // 继续学习
          ctx.dispatch('checkedQuery', { query: data.end_speed_info, data })
          ////console.log(data.end_speed_info)
        } else {
          // 第一次学
          data.course_period_list[0].checkedVideo = true
          data.course_period_list[0].teaching_plan[0].checkedVideo = true
          data.course_period_list[0].teaching_plan[0].teaching_plan_info[0].checkedVideo = true
          // frendly copy
        }
      }
    },
    unChecked(ctx, { data }) {
      try {
        for (const item of data.course_period_list) {
          item.checkedVideo = false
          for (const pitem of item.teaching_plan) {
            pitem.checkedVideo = false
            if (pitem.teaching_plan_info) {
              for (const citem of pitem.teaching_plan_info) {
                citem.checkedVideo = false
              }
            } else {
              throw new Error('没有资源')
            }
          }
        }
      } catch (error) {
        ctx.state.courseDetailInfo = data
      }
    },
    getClazzList(ctx, query) {
      return service.clazz.getClazzByCourse(query).then(res => {
        ctx.state.clazzList = res.data
      })
    },
    getTeacherAnswer(ctx, query) {
      return service.message
        .getTeacherAnswer({ ...query, ...ctx.state.taPage })
        .then(res => {
          ctx.state.teacherAnswerList = res.data
          ctx.state.taPage.total = res.page.total
          ctx.state.taPage.pageNum = res.page.num
        })
    },
    getComment(ctx, query) {
      return service.message
        .getComment({ ...query, ...ctx.state.taPage })
        .then(res => {
          ctx.dispatch('recursiveCommentStart', { data: res.data })
          ctx.state.discussList = res.data
          ctx.state.disPage.total = res.page.total
          ctx.state.disPage.pageNum = res.page.num
        })
    },
    // double recursion
    recursiveCommentStart(ctx, { data }) {
      data.forEach(item => {
        item.children = []
        ctx.dispatch('recursiveComment', { data: item, arr: item.children })
        if (item.reply) {
          ctx.dispatch('recursiveCommentStart', { data: item.reply })
        }
      })
    },
    recursiveComment(ctx, { data, arr }) {
      if (data.reply && data.reply.length) {
        data.reply.forEach(item => {
          arr.push(item)
          ctx.dispatch('recursiveComment', { data: item, arr })
        })
      }
    },
    getCollegeList({ state }, { clear = false, ...query }) {
      // 获取大学列表
      if (!clear) {
        state.collegePage.pageNum += 1
      }
      service.university
        .getList({ ...state.collegePage, ...query })
        .then(res => {
          if (clear) {
            state.collegeList = [{ name: '全部', type: 'all' }]
            state.collegePage = {
              pageNum: 1,
              pageOffset: PAGESIZE,
              total: 1,
            }
          }
          state.collegeList = state.collegeList.concat(res.data)
          state.collegePage.total = res.page.total
          state.collegePage.pageNum = res.page.num
        })
    },
  },
  mutations: {
    getList() {},
  },
}
