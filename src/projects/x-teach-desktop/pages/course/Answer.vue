<script>
import AnswerItem from './comp/AnswerItem'
import { mapState, mapGetters } from 'vuex'
export default {
  components: { AnswerItem },
  mounted() {
    this.getAnswer()
  },
  computed: {
    ...mapState({
      detail: state => state.course.courseDetail,
      teacherAnswerList: state => state.course.teacherAnswerList,
      taPage: state => state.course.taPage,
    }),
  },
  methods: {
    getAnswer() {
     //console.log('answer')
      let data = {
        course_id: this.$route.query.id,
        to_user_id: this.detail.teach_user.id,
      }
      return this.$store.dispatch('course/getTeacherAnswer', data)
    },
    openReplay() {
      if (!this.$isUser()) return
      this.$openReplyDialog({
        headname: '添加问题',
        tname: '问题标题',
        valname: '问题描述',
      })
        .then(res => {
          const { val: content, title } = res
          let data = {
            course_id: this.$route.query.id,
            type: 'answering_question',
            content,
            title,
            to_user_id: this.detail.teach_user.id,
          }
          this.$service.message.sendMsg(data).then(res => {
           //console.log(res)
            this.$message.success('提问成功!')
            this.getAnswer()
          })
        })
        .catch(err => {
         //console.log(err)
        })
    },
    pageChangeHandler(pageNum) {
      this.taPage.pageNum = pageNum
      this.getAnswer()
    },
  },
}
</script>


<template lang="pug">
  .page-course-answer
    .fix
      .btn.fr  
        Tbutton( @click.native="openReplay" type="og") 
          span.el-icon-edit
          span 我要提问
    .ls
      .item(v-for="item in teacherAnswerList" :key="item.id")
        .question
          AnswerItem(
            type="question"
            :name="item.title"
            :to_fromUserName="item.from_user_name"
            :val="item.content"
            :time="item.update_time"
          )
        .answer( v-if="item.reply.length" )
          .citem(v-for="citem in item.reply" :key="citem.id")
            AnswerItem( 
              type="answer"
              :to_fromUserName="item.to_user_name"
              :name="citem.title"
              :val="citem.content"
              :time="citem.update_time"
            )
    .page 
      PageMy(
        @currentChange="pageChangeHandler"
        :total="taPage.total"
        :pageOffset="taPage.pageOffset"
        :pageNum="taPage.pageNum"
      )         
</template>
<style lang="stylus">
.page-course-answer
  >.fix
    padding 30px
  >.ls
    padding 0 30px 30px 30px
    >.item
      border 1px solid #e0e0e0
      margin-bottom 30px
      >div
        padding 10px
      >.answer
        border-top 1px solid #e0e0e0
        >.citem
          margin-bottom 50px
          &:last-child
            margin-bottom 0px
</style>
