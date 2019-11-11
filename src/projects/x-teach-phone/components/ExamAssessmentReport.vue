<template lang="pug">
.assessment-report.c-bg-f
  h3.tc 我的考核报告
  .assessment-report-p
    p(v-html="report.pager_start_string")
    p(v-html="report.pager_end_string")
  .assessment-report-evaluate
    h3.tc.f15 我的得分
    .assessment-report-exams
      .flex-bc(
        v-for="item in list"
        :key="item.id"
      )
        .exam-name {{item.name}}：
          span.color-span-2 {{item.user_score}}分
        .rate 正确率：{{item.paper_percentage}}
      .end-evaluate.tc.f14.c-6 我的分数超过了全网
        circle-progress(:percent="report.total_percentage")
        |的学生
      .evaluate-tag(:class="[tag_pic]")
  .btn-error.tc
    button.c-bg-theme.c-f.f13(@click="$router.push('online-exam-errors')") 历史错题集
</template>
<script>
import CircleProgress from './common/CircleProgress'
export default {
  props: {
    report: {
      type: Object,
      default () {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    tag_pic () {
      const { course_title } = this.report
      const default_opts = {
        '才华横溢': 'evaluate1',
        '博古通今': 'evaluate2',
        '出口成章': 'evaluate3',
        '目不识丁': 'evaluate4',
        '见多识广': 'evaluate5',
      }
      return `i-${default_opts[course_title]}`
    }
  },
  components: { CircleProgress }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .assessment-report
    padding $layout-padding
    h3
      color $text-color-2
    .color-span-1
      color #ff9933
    .color-span-2
      color #ff5d16
    &-p
      margin $layout-padding 0
      span
        color $text-color-b
      > p
        line-height 1.5
        text-indent 2em
    &-evaluate
      padding 0.34rem 0
      color $text-color-6
      background-color #f8f8f8
    &-exams
      position relative
      margin-top 0.29rem
      > .flex-bc
        margin 0.17rem 0
      .exam-name
        margin-right 0.95rem
      .end-evaluate
        line-height 50px
        margin-top 0.3rem
    .evaluate-tag
      position absolute
      right 0.2rem
      bottom -1.02rem
    .btn-error
      margin-top 0.9rem
      button
        width 4.4rem
        height 0.6rem
        border-radius 0.1rem
</style>
