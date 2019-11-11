<script>
export default {
  props: {},
  data () {
    return {}
  },
  methods: {}
}
</script>
<template lang="pug">
.mask
  .ui-messagebox.c_f_bg
    .ui-messagebox__title title
      .fr.ib.icon-close
    .ui-messagebox__body Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam dolorem voluptates alias vel deserunt est perferendis quo, error culpa porro, fuga nesciunt ipsam impedit! Distinctio labore temporibus modi molestias voluptate.
    .ui-messagebox__foot.tr
      button 取消
      button.btn-primary 确定
</template>
<style lang="stylus">
.mask
  z-index 999!important
  p
    margin 0
  .ui-messagebox
    position absolute
    width 300px
    top 50%
    left 50%
    color #000
    transform translate(-50%, -50%)
    border-radius 5px
    &__title
      height 40px
      line-height 40px
      border-bottom 1px solid #EEE
      text-indent 1em
    &__body
      padding 1em
      font-size 14px
      line-height 20px
    &__foot
      border-top 1px solid #EEE
      button
        width 50px
        height 30px
        margin 10px
        border none
        outline none
        color #3496e1
        border-radius 3px
        &.btn-primary
          background-color #3496e1
          color #FFF
</style>