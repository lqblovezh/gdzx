<script>
export default {
  props: ['item'],
  data () {
    return {
      msg: '是否确认？',
      isShow: false, // 是否显示遮罩层
      isMsg: true, // 展示确认消息或者成功提示框
      promiseStatus: null,
      failed: false, // 兑换成功与否
      failMsg: ''
    }
  },
  methods: {
    confirm (msg) {
      this.msg = msg
      this.isMsg = true
      return new Promise((resolve, reject) => {
        this.isShow= true
        this.promiseStatus = {resolve, reject}
      })
    },
    handleAction (status) {
      if (status == 'yes') {
        this.isMsg = false
        this.exchange()
      } else {
        this.isShow = false
        this.promiseStatus && this.promiseStatus.reject()
      }
    },
    closeMask () {
      this.isShow = false
      this.promiseStatus && this.promiseStatus.resolve()
    },
    exchange () {
      this.$service.intearal.exchange({id: this.item.id}).then(res => {
        // log(res)
      }).catch(e => {
        this.failed = true
        this.failMsg = e.message
      })
    }
  }
}
</script>
<template lang="pug">
.mask-layer(v-show="isShow")
  .msgbox(v-if="isMsg")
    .msgbox-content
      .msgbox-message {{msg}}
    .msgbox-btns
      button.msgbox-cancel(@click="handleAction('cancle')") 取消
      button.msgbox-confirm(@click="handleAction('yes')") 确认
  .contentbox(v-else :class="{failed: failed}")
    .contentbox-head.flex.flex-center-sb
      .contentbox-icon
    .contentbox-msg.text-center
      p.contentbox-msg__title {{failed?'兑换失败':'兑换成功'}}
      p.contentbox-msg__info.container {{failMsg}}
      button.circle(@click="closeMask") 确定
</template>
<style lang="stylus" scoped>
.mask-layer
  display flex
  align-items center
  justify-content center
  position fixed
  width 100%
  height 100%
  background-color rgba(0,0,0,.5)
  z-index 100
  .msgbox
    width 4.5rem
    border-radius 5px
    color #555
    background-color #FFF
    overflow hidden
    .msgbox-content
      padding-top 1rem
      padding-bottom 0.7rem
      text-align center
    .msgbox-btns
      display flex
      justify-content space-between
      button
        flex 1
        height 0.7rem
        border none
        outline none
        &.msgbox-cancel
          color #666
          background-color #eee
        &.msgbox-confirm
          color #FFF
          background-color #3496e1
  .contentbox
    width 4.5rem
    border-radius 5px
    overflow hidden
    background-color #FFF
    &.failed
      >.contentbox-head
        background-color #ff6060
      .contentbox-msg
        button
          background-color #ff6060
    >.contentbox-head
      background-color #3496e1
      height 2.7rem
      >.contentbox-icon
        margin 0 auto
    .contentbox-msg
      padding-top 0.32rem
      padding-bottom 0.2rem
      font-size 14px
      .contentbox-msg__title
        color #333
      .contentbox-msg__info
        margin-top 0.22rem
        margin-bottom 0.47rem
        color #555
        line-height 0.35rem
      button
        width 2.5rem
        height 0.5rem
        line-height 0.5rem
        color #FFF
        border none
        outline none
        background-color #3496e1
        font-size 12px
</style>
