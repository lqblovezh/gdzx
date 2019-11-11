<template lang="pug">
  .footer.tc.c-bg-f(v-show="showFooter")
    router-link(to="home")
      .icon.i-home
      .name 首页
    router-link(to="study")
      .icon.i-study
      .name 学习
    button(@click="$emit('click-btn')")
      .i-scan
    router-link(to="mall")
      .icon.i-shop
      .name 商城
    router-link(to="user")
      .icon.i-my
      .name 我的
</template>
<script>
import urlJoin from 'url-join'
export default {
  computed: {
    showFooter () {
      let paths = ['home', 'study', 'mall', 'user']
      const { path } = this.$route
      for (let p of paths) {
        if (urlJoin(baseUrl, p) === path) {
          return true
        }
      }
      return false
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .footer
    display flex
    width 100%
    position fixed
    bottom 0
    height $footer-height
    box-shadow 0 0 0.1rem rgba(0, 0, 0, .1)
    >a, button
      flex 1
    button
      background-color transparent
</style>