<template lang="pug">
  .ev-comfirm.f13
    .ev-comfirm-body
      slot
        p 确认消息？
    .ev-comfirm-footer
      a(@click="$emit('cancel-event')") 取消
      a(@click="$emit('confirm-event')") 兑换
</template>
<script>
export default {
  name: 'ev-comfirm'
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .ev-comfirm {
    position absolute
    display table
    margin auto
    left 50%
    top 50%
    transform  translate(-50%, -50%)
    width 4.5rem
    background-color #fff
    border-radius 0.1rem
    overflow hidden
    &-body {
      margin 0.6rem 0
      text-align center
      color #555
      p {
        margin 0.2rem 0
      }
    }
    &-footer {
      border none
      height 0.7rem
      line-height 0.7rem
      > a {
        display inline-block
        width 50%
        text-align center
        &:first-child {
          color #666
          background-color #eee
        }
        &:last-child {
          color #FFF
          background-color $theme-color
        }
      }
    }
  }
</style>