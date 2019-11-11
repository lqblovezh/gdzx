<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      startTime: Date.now(),
      timer: null, // 定时器
      calculate_timer: null,
      time: 0,
    }
  },
  computed: {
    // ...mapState('course', ['examList', 'ids']),
    ...mapState('course', ['info']),
    ...mapGetters('course', {
      get_hour_course: 'course_hour_item',
      paper_list: 'paper_list',
    }),
    course_hour_item() {
      const { h_id } = this.$route.query
      return this.get_hour_course(h_id)
    },
    plan() {
      const { p_id } = this.$route.query
      return (
        this.course_hour_item.teaching_plan.find(item => item.id === p_id) || {}
      )
    },
    brothers_plan() {
      const { p_id } = this.$route.query
      return (
        this.course_hour_item.teaching_plan.filter(item => item.id !== p_id) ||
        []
      )
    },
  },
  mounted() {
    this.setTimer()
  },
  beforeRouteLeave(to, form, next) {
    console.log(this.$route.query)
    this.sendMsg()
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    if (this.calculate_timer) {
      clearTimeout(this.calculate_timer)
      this.calculate_timer = null
    }
    next()
  },
  methods: {
    setCalcuateTimer() {
      this.calculate_timer = setTimeout(() => {
        this.time-- > 0 && this.setCalcuateTimer()
      }, 1000)
    },
    setTimer() {
      // 当前计划学习的时长和应学时长
      const duration = (this.plan.time - this.plan.user_time) * 1000
      if (duration > 0) {
        this.time = duration / 1000
        this.setCalcuateTimer()
      } else {
        this.time = 0
      }
      // 如果其他计划已学完且当前计划没学完
      // 设置一个定时器
      if (
        this.brothers_plan.every(item => item.user_time / item.time >= 1) &&
        duration > 0
      ) {
        this.timer = setTimeout(this.showDia, duration)
      }
    },
    showDia() {
      const { h_id } = this.$route.query
      this.$MessageBox
        .confirm('已学习完，前往在线评测测试一下')
        .then(action => {
          const paper = this.paper_list.find(exam => exam.period_id === h_id)
          paper && this.goToTest(paper)
        })
        .catch(this.$catchError)
    },
    goToTest(paper) {
      this.$goByName('exam', {
        query: {
          paper_id: paper.id,
        },
        params: {
          course_id: this.info.id,
        },
      })
    },
    sendMsg() {
      let data = this.getSendData()
      if (data.course_time >= 1) {
        return this.$service.course.leaveVideoPonit(data).then(res => {
          this.queryCourseInfo(data)
          // this.allMedia.pitem.user_time =
          //   Number(this.allMedia.pitem.user_time) + data.course_time
        })
      } else {
        return Promise.resolve()
      }
    },
    getSendData() {
      let time = this.getTime()
      let data = {
        course_id: this.$route.query.c_id,
        course_hour_id: this.$route.query.h_id,
        course_teaching_id: this.$route.query.p_id,
        course_teaching_plan_id: this.$route.query.r_id,
        ...time,
      }
      return data
    },
    getTime() {
      return {
        course_time: (Date.now() - this.startTime) / 1000,
        resources_time: 1,
      }
    },
    ...mapActions('course', ['queryCourseInfo']),
  },
  filters: {
    formatTime(val) {
      if (val === 0) {
        return '已学完'
      }
      const minute = Math.floor(val / 60)
      const second = parseInt(val % 60)
      let str
      str = minute >= 1 ? `${minute}分钟` : ''
      str += second !== 0 ? `${second}秒` : ''
      return str
    },
  },
}
</script>
<template lang="pug">
.page-player
  .time.f14 {{time|formatTime}}
  router-view
</template>
<style lang="stylus">
.page-player
  position relative
  .time
    position absolute
    right 10px
    top 1.1em
    color #444
    z-index 99
</style>
