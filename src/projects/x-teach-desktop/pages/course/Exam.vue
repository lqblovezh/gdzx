<script>
import Topic from './comp/Topic'
import { mapState, mapActions } from 'vuex'
export default {
  components: { Topic },
  beforeRouteUpdate(to, fronm, next) {
    next()
    this.init()
  },
  mounted() {
    this.init()
  },
  data() {
    return {
      isAnswer: false,
      list: null,
      page: {
        pageSize: 2,
        total: 0,
        pageNum: 1,
      },
    }
  },
  computed: {
    ...mapState({
      topics: state => state.exam.topics,
      paperList: state => state.exam.paperList,
      paperDetail: state => state.exam.paperDetail,
      paperScore: state => state.exam.paperScore,
      totalScore: state => {
        if (state.exam.paperDetail) {
          let sum = 0
          state.exam.paperDetail.map(item => {
            sum += item.account
          })
          return sum
        }
        return 0
      },
      detail: state => state.course.courseDetail,
    }),
    setCountDown() {
      let time = 0
      if (this.paperDetail) {
        this.paperDetail.forEach(item => (time += Number(item.time)))
        console.log(time)
        return time
      }
      return time
    },
  },
  methods: {
    init() {
      // 置空非常重要
      this.$store.state.exam.paperDetail = []
      const { id, exam_id, type } = this.$route.query
      this.getExamData(this.$route.query).catch(res => {
        if (res.code == 20401) {
          this.$store.state.user = null
          this.$go('/home')
        }
      })
      // 获取带答案的接口
      this.isAnswer = type && (type === 'answer' || type === 'mistake')
      this.getPaperDetail({ id: exam_id, type }).then(res => {
        this.page.total = this.paperDetail.length
      })
      // this.$store.dispatch('exam/getPaperDetail', { id: exam_id, type })
    },
    go(path) {
      if (path === 'back') {
        this.$router.go(-1)
      }
    },
    commitAnswer(type) {
      let data = this.getCommitData()
      if (type) {
        this.$alert('您的答题时间已到，系统已帮您自动交卷', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        })
          .then(() => {
            this.commit(data)
          })
          .catch(() => {
            this.commit(data)
          })
        return
      }
      if (data.noAnswers.length) {
        this.$confirm(
          '您有题目还未完成，是否确认提交?未答部分将被记为0分',
          '提示',
          {
            confirmButtonText: '确定交卷',
            cancelButtonText: '继续答题',
            type: 'warning',
          }
        )
          .then(() => {
            this.commit(data)
          })
          .catch(() => {})
      } else {
        this.commit(data)
      }
    },
    commit(data) {
      this.$service.course.answer(data).then(res => {
        this.$message.success('提交成功!')
        // if (type) {
        // } else {
        //   this.$message.success('答题时间到，已自动交卷!')
        // }
        this.$replace('/course/exam', {
          id: this.$route.query.id,
          exam_id: this.$route.query.exam_id,
          type: 'answer',
        })
      })
    },
    reDo() {
      this.$service.course
        .rePaper({ id: this.$route.query.exam_id })
        .then(res => {
          this.$replace('/course/exam', {
            id: this.$route.query.id,
            exam_id: res.data.id,
          })
          this.$message.success('开始答题')
        })
    },
    getCommitData() {
      let paperDetail = this.paperDetail
      let data = {
        id: this.$route.query.exam_id,
        data: [],
        noAnswers: [],
      }
      paperDetail.forEach(item => {
        let answer
        if (Array.isArray(item.user_answer)) {
          answer = item.user_answer.join(',')
        } else {
          answer = item.user_answer
        }
        data.data.push({
          id: item.id,
          answer,
          img: item.path,
        })
        // [].join(',')  ==> ''
        if (!answer && answer !== false) {
          // 错题, answer为false
          data.noAnswers.push(item)
        }
      })
      return data
    },
    // 上传图片后，将path赋值到当前问题中
    setAttr(i, path) {
      i.path = path
    },
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
    onTimeout() {
      this.commitAnswer(true)
    },
    pageChangeHandler(p) {
      this.page.pageNum = p
      this.computeShow()
    },
    goPage(index) {
      this.page.pageNum =
        parseInt(index / this.page.pageSize) + (index % this.page.pageSize)
      this.computeShow()
    },
    computeShow() {
      this.paperDetail.forEach(item => (item.isShow = false))
      this.paperDetail.forEach((item, index) => {
        if (
          index >= this.page.pageSize * (this.page.pageNum - 1) &&
          index <= this.page.pageSize * this.page.pageNum - 1
        ) {
          this.$set(item, 'isShow', true)
        }
      })
    },
    ...mapActions('exam', ['getExamData', 'getPaperDetail']),
  },
  watch: {
    paperDetail() {
      if (this.paperDetail) {
        this.computeShow()
      }
    },
  },
}
</script>


<template lang="pug">
  .page-course-exam
    .wrap
      .head.fix(v-if="paperScore")
        .paperList
          .icon.icon-paper
          span 试卷：
          ul.list
            li.f14(
              v-for="item in paperList.list"
              :key="item.id+'_nav'"
              @click="btnClickHandler(item,$event)"
              :class="{active:item.id==$route.query.exam_id}"
            ) {{item.name}}{{'（'+(item.paper_status || '查看')+'）'}}
      .content(v-if="paperScore")
        .subject
          .left
            .catalog-name.c_3.f16 目  录
            .catalog-list
              .item.f14.ellipsis(
                v-for="item,index in paperDetail"
                :key="item.id+'_catalog'"
                :class="{disabled:item.disabled}"
                @click="goPage(index+1)"
                :title="item.question.replace(/<[^>]+>/g, '')"
              ) {{(index+1)+'.'}}{{item.question.replace(/<[^>]+>/g, '')}}
          .right
            .res.c_8.f14
              .name.tc.f20.c_3 {{paperScore.name}}
              .countdown(v-if="setCountDown&&!isAnswer")
                span.f16.c_3 答题倒计时：
                VueCountDown(:duration="setCountDown" @onTimeout="onTimeout")
              .btns
                Tbutton.back( @click.native="$go('/course/examList',{id:$route.query.id})" icon="back" type="og_plain") 返回评测
                Tbutton.submit( @click.native="commitAnswer()" icon="commit" type="primary" v-if="!isAnswer" ) 提交试卷
                Tbutton.submit( @click.native="reDo" icon="commit" type="og" v-if="isAnswer") 再做一次
              .assess(v-if="isAnswer")
                .abstract
                  span  总分：{{paperScore.score}}
                  span.c_price  得分：{{totalScore}}
                  span
                    span 重做要求：
                    span(v-if="paperScore.teach_status == 1") 否
                    span.c_price(v-if="paperScore.teach_status == 2") 是
                  span 阅卷人： {{paperScore.teacher_name}}
                  span.fr 日期： {{paperScore.update_time}}
                .txt
                  span 阅卷人留言：
                  span  {{paperScore.message}}
            .item(v-for="item,index in paperDetail" :key="item.id" v-show="item.isShow")
              Topic(
                :name="item.question"
                :options="item.option"
                :type="item.type"
                :score="item.score"
                :detail="item"
                :index="index + 1 + '.'"
                :isResolved="isAnswer"
                :course="detail"
                @setAttr="setAttr"
              )
            .page-wrap
              PageMy(
                @currentChange="pageChangeHandler"
                :total="page.total"
                :pageOffset="page.pageSize"
                :pageNum="page.pageNum"
              )
        //- .btns.tc
        //-   Tbutton(
        //-     @click.native="commitAnswer"
        //-     icon="commit"
        //-     type="og"
        //-     v-if="!isAnswer"
        //-   ) 提交试卷
</template>
<style lang="stylus" scoped>
.page-course-exam
  >.wrap
    padding 30px
    >.head
      padding-bottom 30px
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
            &.active
              color #309fc3
    >.content
      .subject
        border solid 1px #e5e5e5
        background-color #ffffff
        .left
          width 219px
          display inline-block
          vertical-align top
          box-sizing border-box
          .catalog-name
            height 40px
            line-height @height
            background-color #f5f5f5
            text-align center
            cursor pointer
          .catalog-list
            color #878787
            padding 7px 20px
            .item
              height 40px
              line-height @height
              cursor pointer
              &.disabled
                color #4d4d4d
        .right
          width calc(100% - 220px)
          display inline-block
          padding-left 30px
          padding-right 30px
          box-sizing border-box
          border-left 1px solid #e5e5e5
      .name
        padding 20px 0px
        font-weight bold
      .res
        position relative
        .countdown
          padding-bottom 40px
          text-align center
        .btns
          position absolute
          width 100%
          top 10%
          .back
            position absolute
            left 0
          .submit
            position absolute
            right 0
        &:after
          content ' '
          position absolute
          border-bottom 1px dashed #ebebeb
          height 1px
          left 0px
          right 0px
          bottom 0
        .abstract
          >span
            margin-right 80px
            &:last-child
              margin-right 0
        .txt
          padding 20px 0
          position relative
</style>
