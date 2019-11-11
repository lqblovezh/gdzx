<script>
import { mapActions } from 'vuex'
import teacherMixins from './mixins'

export default {
  data() {
    return {
      message: null,
    }
  },
  mixins: [teacherMixins],
  asyncData({store,route}) {
    return store.dispatch('teacher/getTeacherMessage',route.query)
  },
  methods: {
    send() {
      this.$service.message
        .sendMsg({
          type: 'leave_word',
          content: this.message,
          to_user_id: this.$route.query.id,
        })
        .then(res => {
          this.$message.success('发送成功')
        }).catch(({payload}) => {
          this.$message.success(payload.message)
        })
    },
    replay(item) {
     //console.log(item);
      this.$openReplyDialog({
        headname: '发送私信',
        tname: '接收人',
        valname: '发送内容',
        title: item.from_user_name,
      })
        .then(res => {
         //console.log(res)
          this.$service.message
            .sendMsg({
              type: 'leave_word',
              content: res.val,
              to_user_id: item.from_user_id,
              pid: item.id,
            })
            .then(res => {
              this.getList()
            })
        })
        .catch(err => {
         //console.log(err)
        })
    },
    ...mapActions('teacher',{
      'getList': 'getTeacherMessage'
    })
  }
}
</script>

<template lang="pug">
  .page-teacher-msg
    .cbox.c_f_bg
      .replay 
        textarea.f16.c_f5_bg(v-model="message")
        .btns.fix 
          .mybtn.c_theme_bg.c_f.fr(@click="send") 发表
      .replay-discuss
        .wrap
          .item(v-for="item in list")
            .main 
              ReplayComment(
                @replay="replay(item)"
                @like="like(item)"
                :comment="item.content"
                commentNum="15"
                :imgUrl="item.from_user_picture"
                :name="item.from_user_name"
                toName="toName"
                :islikeShow="true"
                :time="item.create_time"
              )
            .child.c_f5_bg(v-if="item.reply&&item.reply.length")
              .item(v-for="items in item.reply")
                ReplayComment(
                  :comment="items.content"
                  commentNum="15"
                  :imgUrl="items.from_user_picture"
                  :name="items.from_user_name"
                  toName="toName"
                  :time="item.create_time"
                )
        .page-wrap 
          PageMy(
            @currentChange="pageChangeHandler"
            :total="page.total"
            :pageOffset="page.pageOffset"
            :pageNum="page.pageNum"
          )
</template>
<style lang="stylus">
.page-teacher-msg
  margin-top 40px
  >.cbox
    >.replay
      padding 30px
      >textarea
        width 100%
        height 100px
        border solid 1px #e3e3e3
</style>
