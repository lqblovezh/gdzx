<template lang="pug">
.v-wrapper(:class="{'is-fixed': isFixed}")
  header(:style="headerStyle")
    .header-left.fl
      .header-icon(:class="{'c-rgb': isTrans}" @click="$back()" v-show="!hideBack")
        .i-back
    .header-center.ib.ell
      slot(name="center")
        span {{ title }}
    .header-right
      slot(name="right")
  section(:class="[mainCls,{isAuto}]")
    slot
</template>
<script>
export default {
  name: 'v-wrapper',
  props: {
    // 标题栏是否浮动
    isFixed: Boolean,
    hideBack: Boolean,
    title: {
      type: String,
      default: '',
    },
    mainType: {
      type: Number,
      default: 0,
    },
    isTrans: Boolean,
    headerStyle: {
      type: Object,
      default() {
        return {}
      },
    },
    isAuto: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mainCls() {
      const temp = ['', 'top', 'bottom', 'center']
      return temp[this.mainType]
    },
  },
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/var.styl'

.v-wrapper
  .isAuto
    overflow-y auto
    -webkit-overflow-scrolling touch
  header
    display flex
    align-items center
    // padding env(safe-area-inset-top) $layout-padding 0
    line-height $header-height
    background-color $theme-color
    box-sizing border-box
    .header-left, .header-right
      width 1rem
    .header-right
      text-align center
    .header-center
      flex 1
      text-align center
      color $color-white
      font-size 0.38rem
    .i-back
      margin-top 0.09rem
  section
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    &.top
      top $header-height
    &.bottom
      padding-bottom $footer-height
    &.center
      top $header-height
      bottom $footer-height
    >>> .mi-container
      height 100%
      overflow scroll
      background-color #FFF
      &::-webkit-scrollbar
        display none
</style>
