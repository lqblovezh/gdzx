<template lang="pug">
button(v-on="$listeners" :class="{'is-active': active}")
  cube-loading(v-show="status === 'pending'")
  .inner-text(v-show="status !== 'pending'")
    slot
</template>
<script>
export default {
  name: 'v-button',
  props: {
    status: {
      type: String,
      default: 'success'
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
@import "~@/assets/css/mixin.styl";
button
  display flex
  align-items center
  justify-content center
  width 1.1rem
  height 0.48rem
  line-height 0.48rem
  background-color #FFF
  transition all .3s
  color $theme-color
  border-1px(all, $theme-color)
  &.is-active
    color #555555
    background-color #d9d8db
    transform scale(1)
    border-1px(all, #d9d8db)
</style>