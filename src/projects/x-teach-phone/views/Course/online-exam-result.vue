<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import ExamTitle from '@/components/ExamTitle'
import ExamTypeSingle from '@/components/ExamTypeSingle'
import ExamAnalysis from '@/components/ExamAnalysis'
export default {
  components: { ExamTitle, ExamTypeSingle, ExamAnalysis },
  data () {
    return {
      list: []
    }
  },
  async mounted () {
    try {
      const res = await this.$service.course.getExercise({
        id: this.$route.query.paper_id
      })
      this.list = res.data
    } catch(e) {
      this.$Toast({
        message: '获取试题失败'
      })
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters('course', ['paper_list']),
    info () {
      const { paper_id } = this.$route.query
      return this.paper_list.find(item => item.id === paper_id) || {}
    }
  },
  methods: {
    /**
     * 发送重做请求
     */
    async redo () {
      try {
        await this.$service.course.rePaper({
          id: this.$route.query.paper_id
        })
      } catch(e) {
        this.$catchError
      } finally {
        this.$back()
      }
    },
  }
}
</script>
<template lang="pug">
v-wrapper(title="在线测评" :main-type="1" class="exam-result")
  .result-scroll.hide-scrollbar
    h3.tc {{ info.name }}
    .paper-info.f12.clearfix
      .paper-info-total 总分：
        span {{ info.score }}
      .paper-info-score 得分：
        span {{ info.user_score }}
      div 阅卷人：
        span {{ info.teacher }}
    .paper-comment.f14 阅卷人留言：
      p {{ info.message }}
    .paper-list
      .paper-item(
        v-for="item, index in list"
        :key="item.id"
      )
        exam-title(
          :type="item.type_name"
          :content="item.question"
          :score="item.score"
          :idx="index+1"
        )
        exam-type-single(
          v-if="['single', 'multi', 'judgment'].includes(item.type)"
          :item="item"
          :list="item.option"
          :question-type="item.type"
          is-result-type
        )
        exam-analysis(
          :data="item"
        )
    .btn-reset
      button.c-bg-theme.c-f(@click="redo") 重做测评
</template>
<style lang="stylus">
@import "~@/assets/css/var.styl";
.exam-result
  img
    margin 0.2rem 0
  .result-scroll
    padding 0 0.3rem
    color $text-color-8
    box-sizing border-box
    height 100%
    overflow scroll
    background-color #fff
    h3
      margin-top 0.3rem
      color $text-color-3
    .paper-info
      margin 0.3rem 0
      text-align center
      > div
        display inline-block
        margin 0 0.3rem
        span
          color $text-color-4
      &-score
        > span
          color #ff5d16!important
    .paper-comment
      p
        color $text-color-5
    .paper-list
      margin-bottom 1rem
    .paper-item
      margin 0.6rem 0
  .btn-reset
    position fixed
    bottom 0.3rem
    left 0
    padding 0 0.3rem
    width 100%
    box-sizing border-box
    z-index 99
    button
      width 100%
      padding 0.2rem 0
      border-radius 0.1rem
</style>
