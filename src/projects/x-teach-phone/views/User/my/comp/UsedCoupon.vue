<template lang="pug">
.used-coupon.i-coupon--used
  .price ￥
    span {{info.integral}}
  .info
    h3 {{info.name}}
    p 有效期限：永久
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
.used-coupon
  margin 0.3rem 0
  display flex
  align-items center
  .price
    width 2.42rem
    text-align center
    font-size 0.56rem
    color $color-white
    span
      font-size 0.78rem
  .info
    flex 1
    margin-left 0.22rem
    h3
      font-size 0.3rem
      color $text-color-4
      margin-bottom 0.22rem
    p
      font-size 0.24rem
      color $text-color-8
</style>