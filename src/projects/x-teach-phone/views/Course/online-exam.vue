<script>
import ExamAssessmentReport from '@/components/ExamAssessmentReport'
import { mapState, mapGetters, mapActions } from 'vuex'
import { CourseInfo } from '@/mixins'
export default {
  mixins: [CourseInfo],
  data () {
    return {
      isTest: false,
      showMore: false
    }
  },
  beforeRouteEnter(to, from, next) {
    const { path } = from
    const { course_id } = to.params
    if (path.includes('online-exam-test') || path.includes('online-exam-result')) {
      console.log('from', from)
      next(vm => {
        vm.$store.dispatch('course/queryPaperList', { course_id })
      })
    } else {
      next()
    }
  },
  components: { ExamAssessmentReport },
  computed: {
    ...mapGetters('course', ['report', 'paper_list']),
    list () {
      return !this.showMore && this.paper_list.length > 3 ? this.paper_list.slice(0, 3) : this.paper_list
    }
  },
  methods: {
    ...mapActions('course', ['queryPaperList']),
    goToTest (test) {
      let path = 'online-exam-test'
      if (test.paper_status === '审评中') {
        return
      } else if (test.paper_status === '查看成绩') {
        path = 'online-exam-result'
      }
      this.$router.push({path, query: {paper_id: test.id}})
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="在线测评" :main-type="1" class="test")
  .test-list.shadow
    .test-item.container(v-for="i, index in list")
      .test-item__title {{i.name}}
      .clearfix.test-item-info
        p.fl 课时{{index+1}}
        button.circle.fr(:class="{'inline-btn': !isTest}")
          span(@click="goToTest(i)") {{i.paper_status}}
    .more-test.flex-center.f14(@click="showMore = !showMore" v-if="paper_list && paper_list.length > 3") 更多测评
      span.i-an(:class="{'r180': showMore}")
  exam-assessment-report(
    :report="report"
    :list="paper_list"
  )
</template>
<style lang="stylus" scoepd>
  @import "~@/assets/css/var.styl";
.test
  background-color #FFF
  .r180
    transform rotate(180deg)
  &-list
    background-color #FFF
    .more-test
      padding 0.3rem 0
      color $theme-color
      > span
        margin-left 0.1rem
  &-item
    padding-top 0.34rem
    padding-bottom 0.4rem
    font-size 12px
    &:not(:last-child)
      border-bottom 1px solid #d1dce4
    .test-item__title
      margin-bottom 0.15rem
      font-size 14px
      color #333
    &-info
      p
        color #666666
      button
        width 1.25rem
        height 0.5rem
        line-height 0.5rem
        border 1px solid #3496e1
        color #3496e1
        background-color #FFF
        font-size 12px
        span
          display inline-block
          margin-top -0.02rem
        &.inline-btn
          color #FFF
          background-color #3496e1
  .errors
    padding 0.36rem 0.3rem
    background-color #FFF
    font-size 14px
</style>