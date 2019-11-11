<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      discussList: state => state.course.discussList,
      disPage: state => state.course.disPage,
    }),
  },
  mounted() {
    this.getComment()
  },
  methods: {
    getComment() {
      return this.$store.dispatch('course/getComment', {
        course_id: this.$route.query.id,
      })
    },
    replay(item = {}) {
      if (!this.$isUser()) return
      this.$openReplyDialog({
        headname: '评价',
        tname: false,
        valname: '内容',
      })
        .then(res => {
          let data = {}
          this.$service.message
            .sendComment({
              pid: item && item.id,
              content: res.val,
              course_id: this.$route.query.id,
            })
            .then(res => {
             //console.log(res)
              this.$message.success('评论成功!')
              this.getComment()
            })
          //console.log('object')
        })
        .catch(err => {
          //console.log('close')
        })
    },
    like(item) {
     //console.log(item)
      this.$service.message.giveLike({ comment_id: item.id }).then(res => {
        item.praise_state = res.data.state
        if (res.data.state) {
          item.praise_count++
        } else {
          item.praise_count--
        }
      })
    },
    pageChangeHandler() {},
  },
}
</script>

<template lang="pug">
  .page-course-discuss
    .btns.fix
      .btn.fr  
        Tbutton( @click.native="replay" type="og") 
          span.el-icon-edit
          span 发表评价
    .wrap
      .item(v-for="item in discussList" :key="item.id")
        .main 
          ReplayComment(
            @replay="replay(item)"
            @like="like(item)"
            :comment="item.content"
            :commentNum="item.children.length"
            :imgUrl="item.picture"
            :name="item.user_name"
            :toName="item.to_user_name"
            :likeNum="item.praise_count"
            :isLike="item.praise_state"
            :islikeShow="true"
            :time="item.create_time"
            )
        .child.c_f5_bg(v-if="item.children.length")
          .item(v-for="citem in item.children" :id="citem.id")
            ReplayComment(
              @replay="replay(citem)"
              :comment="citem.content"
              :imgUrl="citem.picture"
              :name="citem.user_name"
              :toName="citem.to_user_name"
              :commentNum="citem.children.length"
              :likeNum="citem.praise_count"
              :isLike="citem.praise_state"
              :isLikeShow="false"
              :time="citem.create_time"
            )
    .page 
      PageMy(
        @currentChange="pageChangeHandler"
        :total="disPage.total"
        :pageOffset="disPage.pageOffset"
        :pageNum="disPage.pageNum"
      )           
</template>

<style lang="stylus">
.page-course-discuss
  >.btns
    margin 30px
  >.wrap
    margin 0 30px
    >.item
      border-bottom 1px solid #eef3f5
      padding 30px 0
      >.main
        padding 0px 0 15px 0
      >.child
        margin-left 65px
        padding 20px 15px
        >.item
          padding-bottom 20px
          margin-bottom 15px
          border-bottom 1px solid #ccc
          &:last-child
            margin-bottom 0px
</style>
