<template lang="pug">
  header(:class="{'fixed-top': isFixed}")
    .left
      slot(name="left")
        .header-icon.i-back(@click="back")
    .right.text-right(v-if="!hideRight")
      slot(name="right")
        .header-icon.i-search
    .center.ell
      slot
</template>
<script>
export default {
  name: 'ev-header',
  props: {
    isFixed: {
      type: Boolean,
      default: false
    },
    hideRight: Boolean,
    userDefine: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      if (this.userDefine) {
        this.$emit('back')
      } else {
        this.$back()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/assets/css/var.styl";
  header
    padding 0 $layout-padding
    height $header-height
    line-height $header-height
    background-color $theme-color
    &.fixed-top
      position fixed
      top 0
      left 0
      width 100%
      box-sizing border-box
    .left, .right
      width 1rem
      .header-icon
        // transform translateY(50%)
    .center
      margin 0 1rem
      text-align center
      font-size 19px
      color #fff
    .right
      float right
    .left
      float left
</style>
