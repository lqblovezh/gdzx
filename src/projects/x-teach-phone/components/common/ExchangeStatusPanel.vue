<template lang="pug">
.exchange-status-panel.tc
  .exchange-status-panel-icon(:class="{'error': !panelStatus}")
    div(:class="'i-'+info.icon")
  .exchange-status-panel-text
    h4.c-3.f15 {{ info.s }}
    p.c-5.f12 {{ info.t }}
    button.c-bg-theme.c-f(@click="$emit('hide')" :class="{'error': !panelStatus}") 确定
</template>
<script>
export default {
  props: {
    panelStatus: {
      type: Boolean,
      default: true
    },
    errMsg: String
  },
  computed: {
    info () {
      let error = this.errMsg ? this.errMsg : '对不起，您的积分不足！'
      return this.panelStatus ? { icon: 'success', s: '兑换成功', t: '去你的个人中心查看吧~' } : { icon: 'failed', s: '兑换失败', t: error }
    }
  }
}
</script>
<style lang="stylus">
@import "~@/assets/css/var.styl";
.exchange-status-panel
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  background-color $color-white
  width 4.5rem
  border-radius 0.2rem
  overflow hidden
  .error
    background-color #ff6060
  &-icon
    padding 0.7rem 0
    background-color $theme-color
  &-text
    padding 0.32rem 0 0.3rem
    h4
      font-weight bold
    p
      margin 0.2rem 0 0.48rem
    button
      border-radius 0.1rem
      padding 0.14rem 0
      width 2.5rem
</style>