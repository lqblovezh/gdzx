<template lang="pug">
  .index-panel-title.flex-bs
    .left.inline-flex
      .icon(:class="'i-' + iconClass")
      | {{ label }}
    .right.f14(@click="handleClick") {{ btnType === 'more' ? '查看更多' : '关闭' }}
      .icon(:class="'icon-' + [btnType==='more' ? 'more' : 'close']")
</template>
<script>
export default {
  name: 'index-panel-title',
  props: {
    label: String,
    iconClass: String,
    btnType: {
      type: String,
      default: 'more'
    },
    to: String
  },
  methods: {
    handleClick () {
      if (this.btnType === 'more') {
        this.$push(this.to)
      } else {
        this.$emit('click-event')
      }
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .index-panel-title
    margin 0.3rem
    .left
      color $text-color-3
      div
        margin-right 0.13rem
    .right
      color #A6A6A6
      div
        margin-left 0.1rem
</style>