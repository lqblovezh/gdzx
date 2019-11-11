export default {
  data () {
    return {
      core_timer: null,
      rest_time: 0, // 剩余时间
    }
  },
  methods: {
    initTimer() {
      const cur_pitem = this.allMedia.pitem,
        duration = (cur_pitem.time - cur_pitem.user_time) * 1000
      let time = duration > 0 ? (this.allMedia.pitem.study_time ? this.allMedia.pitem.study_time : cur_pitem.time - cur_pitem.user_time) : 0
      this.rest_time = parseInt(time)
      console.log('开始设置定时器', duration)
      duration > 0 && !this.core_timer && this.start()
    },
    start() {
      this.core_timer = setTimeout(() => {
        this.allMedia.pitem.study_time = --this.rest_time
        // --this.rest_time
        parseInt(this.rest_time) === 0 && this.sendMsg().then(this.whichDialog)
        this.rest_time > 0 && this.start()
      }, 1000)
    },
    /**
     * 如果除当前计划外的计划已学习完，弹除跳转到测试试卷的框
     * 如果下一个计划未学习完，提示xs后自动跳转到下一个计划的资源中
     * 否则什么也不做
     */
    whichDialog() {
      console.log('show dialog')
      const pitems = this.allMedia.pitemList.filter(pl => pl.id !== this.allMedia.pitem.id),
        isOhterHasLearned = pitems.every(item => item.user_time / item.time > 1)
      if (isOhterHasLearned) {
        this.showDia()
      } else if (this.getNextPlan()) {
        this.nextPlanDia()
      }
    },
    // 获取下一计划的第一个资源
    getNextPlan () {
      let flag = false,
          result = null
      this.allMedia.pitemList.forEach((pl, index) => {
        if (flag && pl.user_time / pl.time < 1 && pl.teaching_plan_info.length > 0) {
          result = {
            pid: pl.id,
            item: pl.teaching_plan_info[0]
          }
          flag = false
        }
        if (pl.id === this.allMedia.pitem.id) {
          flag = true
        }
      })
      return result
    },
    // 当前计划学习完毕，如果有下一个未学完的计划
    // 则在S时间后自动跳转到该计划
    nextPlanDia () {
      this.$UIDialog({
        message: '将在5s内自动跳转至下一计划...',
        duration: 5000
      }).then(() => {
        this.clearTimer()
        this.jumpToNextItem()
      }).catch(this.clearTimer)
    },
    clearTimer() {
      console.warn('clear timer at first')
      clearTimeout(this.core_timer)
      this.core_timer = null
    },
    jumpToNextItem () {
      const { pid: course_teaching_id, item } = this.getNextPlan()
      this.changeRoute({
        course_teaching_id,
        course_teaching_plan_id: item.id,
        course_id: this.$route.query.course_id,
        course_hour_id: this.$route.query.course_hour_id
      })
    },
    showDia () {
      const course_hour_id = this.allMedia.ids.course_hour_id
      let item = this.papers.filter(item => item.period_id === course_hour_id)
      item[0] && this.$confirm('你已完成该课时，去在线评测测试一下吧', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.sendMsg().then(() => {
          this.$go('/course/exam', {
            id: item[0].course_id,
            exam_id: item[0].id
          })
        })
      }).catch(console.error)
    },
  }
}