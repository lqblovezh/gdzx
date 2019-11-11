<script>
export default {
  props: {
    teacher: {},
  },
  data() {
    return {
      showFullAbs: false,
      maxLen: 107,
    }
  },
  methods: {
    reply() {
      this.$openReplyDialog({
        headname: '发送私信',
        tname: '接收人',
        valname: '发送内容',
        title: this.teacher.name,
      })
        .then(res => {
          this.$service.message
            .sendMsg({
              type: 'private_message',
              content: res.val,
              to_user_id: this.teacher.id,
            })
            .then(res => {
              this.$message.success('发送成功')
            })
            .catch(({ payload }) => {
              this.$message.success(payload.message)
            })
        })
        .catch(err => {
          //console.log(err)
        })
    },
    go() {
      this.$go('/teacher/message', { ...this.$route.query })
    },
    follow(type) {
      //关注
      let msg = type ? '已关注' : '已取消'
      this.$service.teacher.follow({ type, id: this.teacher.id }).then(res => {
        this.$message.success(msg)
        this.$store.dispatch('teacher/getTeacherDate', this.$route.query)
      })
    },
    maxSlice(str) {
      return str && str.length > this.maxLen
        ? `${str.slice(0, this.maxLen)}...`
        : str
    },
  },
}
</script>

<template lang="pug">
.comp-teacher-detail-card 
  .cbox.c_f.pr
    .ib.img.pa 
      img(:src="teacher.picture_absolute")
    .content.vt-all
      p.f18 {{teacher.nick_name}}
      table
        tr
          td 
            span 性别：
            |{{teacher.sex}}
          td
            span 学历：
            |{{teacher.education}}
          td
            span 邮箱：
            |{{teacher.email}}
        tr
          td
            span 单位：
            |{{teacher.company}}
          td
            span 职务：
            |{{teacher.duties}}
          td
            span 关注数量：
            |{{teacher.followed_me&&teacher.followed_me.length}}
      p.abs(@click="showFullAbs = !showFullAbs")
        span 简介：
        |{{showFullAbs ? teacher.summary : maxSlice(teacher.summary)}}
    .btns.pa
      .mybtn.og(v-if="!teacher.current_user_is_followed" @click="follow(true)") 关注
      .mybtn.og(v-else @click="follow(false)") 取消关注 
      br
      .mybtn.trans(@click="go()") 留言
      br
      .mybtn.trans(@click="reply") 私信
</template>

<style lang="stylus">
.comp-teacher-detail-card
  min-height 230px
  background-image linear-gradient(
    10deg,
    #46b6b6 0%,
    #2d87b6 100%
  )
  >.cbox
    padding-top 40px
    >.img
      >img
        width 130px
        height 130px
        border-radius 50%
        border 4px solid #9FCCE0
        box-sizing border-box
    >.content
      height 100%
      // margin-left 40px
      padding-left 170px
      padding-right 150px
      line-height 30px
      >p
        margin-top 0
        margin-bottom 5px
        &:first-child
          font-weight bold
        &.abs
          cursor pointer
        span
          color #ccf5ff
      >table
        width 100%
        td
          width 33.33%
          span
            color #ccf5ff
    >.btns
      top 40px
      right 0
      margin 0
      >.mybtn
        width 110px
        margin-bottom 15px
</style>
