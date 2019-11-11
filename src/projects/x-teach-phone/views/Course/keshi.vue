<template lang="pug">
v-wrapper(:title="course_hour_info.name" class="course-hour" :main-type="1" isAuto=true)
  .course-hour-content
    .intro
      h3 知识点介绍
      .abs {{course_hour_info.abs}}
    .plan
      h3 计划
      .plan-list
        .plan-item(
          v-for="(i,index) in course_hour_info.teaching_plan"
          :key="i.id"
        )
          .plan-item-head.clearfix
            p.fl 计划{{index+1}} {{i.name}}
            button.circle.fr(@click="setMenuData(i)") 进入学习
              span.icon-play__blue
          mt-progress(:value="getPercentage(i)" :bar-height="progress.barHeight")
            p.progress-txt(slot="end") {{getPercentage(i)}}%
      p.text-center
        button.btn-primary.btn-continue.circle(@click="study") {{study_status_text}}
  ev-overlay(v-model="dialog_status" allow-click-hide)
    resource-list(:menu-data="menuData")
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import ResourceList from './comp/ResourceList'
import { isArray } from '@/utils/helpers'
export default {
  data () {
    return {
      progress: {
        value: 20,
        barHeight: 2
      },
      dialog_status: false,
      menuData: null,
    }
  },
  computed: {
    ...mapState('course', ['info']),
    ...mapGetters('course', {
      get_info: "course_hour_item"
    }),
    course_hour_info () {
      const { course_hour_id } = this.$route.query
      return this.get_info(course_hour_id)
    },
    study_status_text () {
      const { teaching_plan } = this.course_hour_info
      let text = '开始学习'
      if (isArray(teaching_plan)) {
        let status = teaching_plan.some(item => {
          const { time, user_time } = item
          return parseFloat(user_time)/time >= 0
        })
        status && (text = '继续学习')
      }
      return text
    }
  },
  components: {
    ResourceList
  },
  methods: {
    setMenuData(item) {
      this.menuData = item
      this.dialog_status = true
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
    study() {
      const { type, r_id, p_id } = this.getIdsOfLastStudyItem()
      if(!type){
        return this.$Toast({
          message: '该课程没有挂载资源，无法查阅',
        })
      }
      const { course_id: c_id } = this.$route.params
      const { course_hour_id: h_id } = this.$route.query
      this.$goPlayer({ type, book_id: r_id, product_id: this.info.publish_id, c_id, h_id, p_id, r_id })
    },
    getIdsOfLastStudyItem () {
      const { teaching_plan } = this.course_hour_info
      let item = {}, p_id
      if (isArray(teaching_plan)) {
        for (let i = 0; i < teaching_plan.length; i++) {
          const { time, user_time, teaching_plan_info, id } = teaching_plan[i]
          if (parseFloat(user_time)/time < 1 && isArray(teaching_plan_info)) {
            p_id = id
            item = teaching_plan_info[0]
            break
          }
        }
      }
      return { r_id: item.id, type: item.type, p_id }
    }
  }
}
</script>
<style lang="stylus" scoped>
.course-hour
  color #444
  font-size 14px
  &-content
    > div
      padding 0.4rem 0.3rem
      background-color #fff
      h3
        font-size 15px
        color #222
  .intro
    margin-bottom 0.2rem
    .abs
      line-height 0.5rem
  .icon-play__blue
    margin-top 0.1rem
    margin-left 2px
  .plan-list
    .progress-txt
      color #3496e1
      font-size 12px
      margin-left 0.2rem
    .plan-item
      margin-top 0.4rem
      &-head
        line-height 0.44rem
  p.text-center
    padding-top 0.4rem
  button
    height 0.44rem
    line-height 0.44rem
    padding 0 0.1rem
    border 1px solid #3496e1
    outline none
    color #3496e1
    background-color #FFF
    &.btn-continue
      width 4.4rem
      height 0.6rem
      line-height 0.6rem
      border none
      color #FFF
      background-color #3496e1
</style>
