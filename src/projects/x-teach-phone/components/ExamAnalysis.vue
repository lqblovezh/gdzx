<template lang="pug">
  .exam-analysis.f14
    .exam-analysis-container(v-if="singleType")
      .exam-analysis-title.clearfix
        span.fl(:class="[isRight? 'i-right': 'i-error']")
        .fl.exam-analysis-result {{ isRight?'选择正确':'选择错误' }}
        .exam-analysis-answer.fr 本题答案是：{{ setAnser }}
      .exam-analysis-content.c-5.clearfix
        span.c-8 解析：
        .analysis(v-html="data.analysis")
    .exam-analysis-container.c-8(v-else)
      .exam-analysis-cell.clearfix(v-for="(value, key) in cellData")
        span.c-8 {{ key }}：
        .text.c-3(v-html="value" :class="{'text-orange': key === '得分', 'c-5': key === ('教师回答'||'解析')}")
    .exam-analysis-link.c-8
      span 课时计划链接：
      a.c-theme(v-for="plan in data.tp_constitute_info" @click="study(plan)" :key="plan.id") {{plan.period_info}}-{{plan.resource_name}}
</template>
<script>
import { effectiveValues } from '@/utils/helpers'
import studyMixin from '@/mixins/study'
export default {
  name: 'topic-analysis',
  mixins: [studyMixin],
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    isRight() {
      const { answer, user_answer } = this.data
      return answer === user_answer
    },
    singleType() {
      const { type } = this.data,
        types = ['single', 'multi', 'judgment']
      return types.includes(type)
    },
    cellData() {
      const { score, analysis, answer, user_answer, teach_answer } = this.data
      return effectiveValues({
        得分: `${score}分`,
        你的答案: user_answer,
        正确答案: answer,
        解析: analysis,
        教师回答: teach_answer,
      })
    },
    setAnser() {
      return this.data.type == 'judgment'
        ? this.data.answer == 'true'
          ? '正确'
          : '错误'
        : this.data.answer
    },
  },
}
</script>
<style lang="stylus">
@import '~@/assets/css/var.styl'

.exam-analysis
  padding 0.24rem 0.2rem 0.34rem
  background-color #f8f8f8
  &-title
    line-height 0.38rem
  &-result
    margin-left 0.13rem
    margin-right 0.51rem
  &-content
    margin 0.3rem 0 0.35rem
    line-height 1.5
    > span
      float left
  &-cell
    margin 0.2rem 0
    .text-orange
      color $text-color-b
    span
      float left
  &-link
    line-height 0.4rem
    a
      margin-right 0.2rem
</style>
