<script>
import MessageItem from './comp/messageItem'
import userMixins from '../user/mixins'

export default {
  mixins: [userMixins],
  components: {
    MessageItem,
  },
  methods: {
    detail(item) {
     //console.log('detail', item)
    },
    reply(item, idx) {
      // console.log(this.$refs.child[idx].updateReply())
      let that = this
      this.$openReplyDialog({
        headname: '发送私信',
        tname: '接收人',
        valname: '发送内容',
        title: item.from_user_name,
      })
        .then(res => {
          this.$service.message
            .sendMsg({
              type: 'private_message',
              content: res.val,
              from_user_id: this.$user.id,
              to_user_id: item.user_id
            })
            .then(res => {
              this.getList()
              that.$refs.child[idx].detail()
            })
        })
        .catch(err => {})
    },
  },
}
</script>


<template lang="pug">
  .page-message-discuss
    .item.f14(v-for="item, index in list")
      MessageItem(type="private" :item="item" ref="child" :index="index")
    .no-data(v-if="!list.length")
      span 暂无数据
</template>
<style lang="stylus">
</style>
