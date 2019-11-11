<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      teaching_plan_time: [],
      teaching_plan_time_number: 0,
      // planDetail: false,
      pageType: false,
    }
  },
  computed: {
    ...mapState({
      //
      detail: state => state.course.courseDetail,
      stepList: state => state.course.courseDetail.course_period_list,
    }),
    planDetail() {
      let query = this.$route.query
      for (const item of this.stepList) {
        if (item.id === query.detailId) {
          return item
        }
      }
    },
  },
  created() {
    // 只初始化数据, 不进行dom操作!
    this.init()
    this.timeNumber()
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.init()
  },
  methods: {
    getRestOfCourse(array) {
      if (!array || !array.length) return
      let result
      for (let i in array) {
        let item = array[i]
        if (!result && parseFloat(item.user_time) / item.time < 1) {
          result = item
        }
      }
      return result
    },
    init() {
      let query = this.$route.query
      this.pageType = query.type
      if (this.pageType === 'detail') {
        // 获取详情信息
        this.stepList.forEach(item => {
          if (item.id === query.detailId) {
          }
        })
      } else {
        // 获取了信息
      }
    },
    timeNumber() {
      // console.log(this.stepList)
      for (let p = 0; p < this.stepList.length; p++) {
        this.teaching_plan_time_number = 0
        let data = this.stepList[p].teaching_plan || []
        for (let t = 0; t < data.length; t++) {
          this.teaching_plan_time_number =
            this.stepList[p].teaching_plan[t].time +
            this.teaching_plan_time_number
        }
        this.teaching_plan_time.push(this.teaching_plan_time_number)
      }
    },
    go(item) {
      this.$go('/course/step', {
        id: this.$route.query.id,
        type: 'detail',
        detailId: item.id,
      })
    },
    goVideo(item = {}) {
      if (!this.detail.user_speed_buy_status) {
        this.$message.error('请购买!')
        return
      }
      const course_plan_item = this.getRestOfCourse(item.teaching_plan)
      if (!this.$isUser()) return
      if (
        this.toNumber(this.detail.effective_duration_start) >
        this.toNumber(this.detail.the_server_time)
      ) {
        return this.$message.warning('学习未开始!')
      }
      if (
        this.toNumber(this.detail.effective_duration_end) <
        this.toNumber(this.detail.the_server_time)
      ) {
        return this.$message.warning('学习已结束!')
      }
      let params = {
        course_id: this.$route.query.id, // 课程id
        // 课时id, 点击继续学习, 则无此id,
        // 课时的继续学习, 和上一次的继续学习无关, 纯粹是进入该课时视频
        course_hour_id: item.id || this.$route.query.detailId, // 课时
        // 计划id进去, 那么从该计划id开始播放
        // 播放完成的, 从0开始, 没完成的继续
        course_teaching_id: course_plan_item && course_plan_item.id,
        course_teaching_plan_id: '',
      }
      this.$go('/video', params)
    },
    toNumber(time) {
      return Number(new Date(Date.parse(time)))
    },
    goVideoFromPlan(item) {
      if (
        this.toNumber(this.detail.effective_duration_start) >
        this.toNumber(this.detail.the_server_time)
      ) {
        return this.$message.warning('学习未开始!')
      }
      if (
        this.toNumber(this.detail.effective_duration_end) <
        this.toNumber(this.detail.the_server_time)
      ) {
        return this.$message.warning('学习已结束!')
      }
      let params = {
        course_id: this.$route.query.id, // 课程id
        // 课时id, 点击继续学习, 则无此id,
        // 课时的继续学习, 和上一次的继续学习无关, 纯粹是进入该课时视频
        course_hour_id: this.$route.query.detailId, // 课时
        // 计划id进去, 那么从该计划id开始播放
        // 播放完成的, 从0开始, 没完成的继续
        course_teaching_id: item.id,
        course_teaching_plan_id: '',
      }
      this.$go('/video', params)
    },
    btns(item, e) {
      // 默认是事件冒泡模型,阻止事件冒泡, 将不会触发父元素的点击事件
      // 浏览器是捕获和冒泡均会执行, 但是addEventListener,
      // 将绑定哪个阶段触发
      // addEventListener  ,第三个参数, 默认是false, 即事件冒泡模型, 在事件冒泡的时候会触发
      e.stopPropagation()
    },
    back() {
      this.$go('/course/step', {
        id: this.$route.query.id,
      })
    },
    goPlan(item) {
      //console.log(item)
    },
    getPercentage(item) {
      const { user_time, time } = item
      if (user_time && time) {
        if (user_time * 1 > time * 1) {
          return 100
        }
        return Math.round((user_time * 100) / time)
      }
      return 0
    },
    isLearned(item) {
      return (
        item.teaching_plan &&
        item.teaching_plan.every(tp => {
          return parseInt(tp.user_time_protion) === 100
        })
      )
    },
  },
  filters: {
    formatTime(val) {
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
  .page-course-step 
    .wrap 
      table.table(v-if=" pageType !== 'detail'")
        thead 
          tr 
            th 课时
            th 课程名称
            th 知识点简介
            th 操作
            th 时间
        tbody 
          tr(v-for="item,index in stepList" :key="item.id"  @click="go(item)" ) 
            td 
              .div 课时{{index+1}}
            td 
              .div {{item.name}}    
            td()
              .div.ellipsis(:title="item.abs")  {{item.abs}}
            td
              .btns.f20.c_gn
                //- span.el-icon-circle-check-outline
                span(@click.stop="goVideo(item)" v-if="!isLearned(item)")
                  span.el-icon-caret-right
                  span.f14 学习
                span.learned.ib(v-else @click.stop="return false;")
            td
              .div {{teaching_plan_time[index]|formatTime}}
      .detail(v-else)
        .title 
          .name.f22.c_3  
            div {{planDetail.name}}            
            //- div.name_sub.f18.c_6 {{planDetail.name}}
          .btns 
            Tbutton(type="og" @click.native="goVideo()") 
              span.el-icon-caret-right.f20.vm.mr10
              .ib 学习
            Tbutton( icon="back" type="og_plain" @click.native="back") 返回
        .section.f20.c_3 
          .name 知识点简介    
          .des.f14.c_6 
            span {{planDetail.abs}}
          .name 学习计划
          .steps
            .ib(
              v-for="item,index in planDetail.teaching_plan"
              :key="item.id"
            )
              .ib.pg.cp(@click="goVideoFromPlan(item)")
                MyProgress( 
                  :percentage="getPercentage(item)" 
                  type="circle" 
                  color="#00b43c" 
                  :width="80" 
                )
                .plan.f14.c_4 计划{{index+1}}
                .plan.f16.c_4.ellipsis-2 {{item.name}}
              .ib.line(v-if="index !== planDetail.teaching_plan.length - 1")
                MyProgress( 
                  :percentage="getPercentage(item)" 
                  type="line" 
                  :showText="false" 
                  color="#00b43c" 
                  :width="80" 
                )
</template>
<style lang="stylus">
.page-course-step
  >.wrap
    padding 30px
    >.table
      .btns
        min-width 100px
        >.learned
          position relative
          width 20px
          height 20px
          border 1px solid gray
          border-radius 50%
          &::before
            content ''
            position absolute
            width 8px
            height 4px
            top 5px
            left 5px
            border-left 2px solid gray
            border-bottom 2px solid gray
            transform rotate(-45deg)
      tbody
        tr
          cursor pointer
        td
          color #000
          max-width 300px
    >.detail
      padding 30px
      >.title
        position relative
        margin-bottom 20px
        >.name
          text-align center
          line-height 30px
        >.btns
          position absolute
          right 0px
          top 0px
          >div
            margin-left 20px
      >.section
        >div:nth-of-type(2)
          margin-bottom 70px
        >.des
          line-height 18px
          text-indent 30px
          margin 20px 0
        >.steps
          position relative
          font-size 0
          margin-top 40px
          padding-bottom 50px
          >div
            margin-right 5px
            >.pg
              width 80px
              margin-right 0px
              position relative
              >.plan
                // position absolute
                text-align center
                left 0
                top 16px
                right 0
                margin-top 10px
                &:last-child
                  height 45px
            >.line
              width 100px
              transform translateY(-36px)
              .el-progress-bar__inner, .el-progress-bar__outer
                border-radius 0px !important
</style>
