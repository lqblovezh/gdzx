<template lang="pug">
.coupon.i-coupon
  .left ￥
    span {{ info.coupon_money }}
  .center
    .name.f15 {{ info.coupon_name }}
    .time(v-show="showTime") 有效期限：永久
    .value.f13
      .i-coin
      | {{ info.integral }}积分
  .right(@click="$emit('toggle', info)") 立即兑换
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    showTime: Boolean
  }
}
</script>
<style lang="stylus">
@import "~@/assets/css/var.styl";
.coupon
  display flex
  margin-bottom 0.3rem
  height 1.58rem
  align-items center
  .left
    width 2.42rem
    font-size 0.56rem
    color #FFF
    font-weight 400
    text-align center
    span
      font-size 0.78rem
  .center
    margin-left 0.42rem
    flex 1
    .name
      margin-bottom 0.2rem
      color #555
      font-weight bold
    .time
      margin-bottom 0.2rem
      font-size 0.24rem
      color $text-color-8
    .value
      color #f8a607
      div
        margin-right 0.1rem
  .right
    margin 0 0.3rem
    width 0.24rem
    font-size 0.24rem
    color $theme-color
    box-sizing border-box
    white-space normal
</style>