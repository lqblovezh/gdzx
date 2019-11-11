<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  created() {
    //console.log('msg list', msg)
  },
  asyncData({ store, route }) {
    // return store.dispatch('exam/getExamData', route.query)
  },
  mounted() {
    this.getExamData(this.$route.query).catch(res => {
      if (res.code) {
        this.$go('/home')
      }
    })
  },
  data() {
    return {
      goMsg: {},
      isMistake: false,
    }
  },
  computed: {
    ...mapState({
      paperList: state => state.exam.paperList,
      isHistoryPaperList: state => state.exam.isHistoryPaperList,
    }),
    tag_pic() {
      const { course_title } = this.paperList
      const default_opts = {
        才华横溢: 'evaluate1',
        博古通今: 'evaluate2',
        出口成章: 'evaluate3',
        目不识丁: 'evaluate4',
        见多识广: 'evaluate5',
      }
      return `icon-${default_opts[course_title]}`
    },
  },
  methods: {
    btnClickHandler(item, e) {
      let id = this.$route.query.id
      let exam_id = item.id
      let name = item.paper_status || '测试'
      let str = '查看成绩 审评中 测试'
      if ('查看成绩' === name) {
        //console.log('查看成绩')
        this.$go(`/course/exam`, { id, exam_id, type: 'answer' })
      } else if ('审评中' === name) {
        //console.log('审评中')
        this.$go(`/course/exam`, { id, exam_id, type: 'answer' })
      } else if (this.isMistake) {
        //console.log('进入测试')
        this.$go(`/course/exam`, { id, exam_id, type: 'mistake' })
      } else {
        this.$go(`/course/exam`, { id, exam_id })
      }
    },
    goHistory() {
      this.isMistake = !this.isMistake
      if (this.isHistoryPaperList) {
        this.$store.dispatch('exam/getPaper', this.$route.query)
      } else {
        this.$store.dispatch('exam/getHistory', this.$route.query)
      }
    },
    getPercentage(item) {
      const { total_percentage } = item
      if (total_percentage) {
        return Number(total_percentage.replace('%', ''))
      }
      return 0
    },
    ...mapActions('exam', ['getExamData']),
  },
}
</script>
<template lang="pug">
  .page-course-examlist
    .wrap
      .head.fix
        .paperList(v-if="!isHistoryPaperList")
          .icon.icon-paper
          span 试卷：
          ul.list
            li.f14(
              v-for="item in paperList.list"
              :key="item.id+'_nav'"
              @click="btnClickHandler(item,$event)"
            ) {{item.name}}
              span （
              span.entry {{item.paper_status || '查看'}}
              span ）
        .btns.fr
          Tbutton(
            v-if="!isHistoryPaperList"
            @click.native="goHistory"
            type="og"
          )
            span.icon.icon-wrong-book
            span 历史错题
          Tbutton(
            v-if="isHistoryPaperList"
            @click.native="goHistory"
            type="og"
          )
            span 全部试卷
      .inform(v-if="!isHistoryPaperList")
        .title.c_4.f20 我的考评报告
        .pager_start.f14.c_6(v-html="paperList.pager_start_string")
        .pager_end.f14.c_6(v-html="paperList.pager_end_string")
        .score
          .score_name.c_4.f16 我的得分：
          ul.list
            li.f14.c_6(
              v-for="item in paperList.list"
              :key="item.id"
            )
              .name {{item.name}}： {{item.user_score}}分
              .accuracy 正确率：{{item.paper_percentage}}
        .review.c_3.f16
          .left
            span 我的分数超过了全网
            MyProgress.press(
              :percentage="getPercentage(paperList)"
              type="circle"
              color="#00b43c"
              :width="80"
            )
            span 的学生
          .right
            span.f16.c_3 我的评价为：
            .icon(:class='tag_pic')
      table.table(v-else)
        thead
          tr
            th 名称
            th 操作
        tbody
          tr(v-for="item in paperList"  :key="item.id" )
            td
              .div {{item.name}}
            td(@click="btnClickHandler(item,$event)" width="400")
              .btns.hover
                .ib.review(v-if="item.status == '1'")
                  span.icon.icon-review.review
                  span.review {{item.paper_status || '查看'}}
</template>
<style lang="stylus" scoped>
.page-course-examlist
  >.wrap
    padding 20px 30px
    >.head
      margin-bottom 18px
      position relative
      height 42px
      line-height @height
      .paperList
        color #757575
        font-weight bold
        .icon-paper
          margin-right 8px
        .list
          display inline-block
          margin 0
          padding 0
          margin-left 20px
          li
            display inline-block
            list-style none
            font-weight normal
            margin-right 45px
            cursor pointer
            .entry
              color #309fc3
              text-decoration underline
      .btns
        position absolute
        right 0px
        top 0px
    .inform
      padding 0 26px 70px
      background #f7f9fa
      .title
        font-weight bold
        text-align center
        padding 39px 0
      .pager_end, .pager_start
        >>> span
          color #ff5d16
      .pager_end
        margin-top 13px
      .score
        margin-top 40px
        margin-bottom 36px
        .list
          margin 20px 0
          padding 0
          li
            display inline-block
            list-style none
            min-width 230px
            text-align center
            line-height 1
            .accuracy
              color #878787
              margin-top 13px
      .review
        .left, .right
          width 50%
          display inline-block
        .left
          .press
            display inline-block
            vertical-align middle
            padding 0 20px
        .right
          .icon
            vertical-align middle
</style>
