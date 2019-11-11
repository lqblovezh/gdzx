<script>
export default {
  props: ['item'],
  methods: {
    del(id) {
      this.$emit('del', id)
    },
  },
}
</script>
<template lang="pug">
.order-item
  .order-item-head.flex-bs
    .order-item-num 订单编号：{{item.order_number}}
    .order-item-status(:class="{'not-pay': item.pay_status === 'not_pay'}") {{item.pay_status === 'not_pay'?'待付款':'交易成功'}}
  .order-item-content
    .order-item-course
      img(v-lazy="item.order_goods[0].goods_img")
      .order-item-course-info
        h3 {{ item.order_goods[0].course_name}}
        .price ￥{{item.order_goods[0].price}}
        .num x1
  .order-item-coupon
    .order-item-coupon-item.flex-bs
      .key 优惠券
      .value -￥{{Number(item.coupon_money).toFixed(2)}}
    .order-item-coupon-item.flex-bs
      .key 获得积分
      .value {{item.integral}}
  .order-item-price 共{{item.order_goods&&item.order_goods.length}} 件商品 合计：
    span ￥{{item.pay_amount}}
  .order-item-footer.flex-bs
    .time {{item.create_time}}
    button(@click="del(item.id)") 删除记录
</template>
<style lang="stylus" scoped>
@import '~@/assets/css/var.styl'
@import '~@/assets/css/mixin.styl'

.order-item
  margin-bottom 0.2rem
  background-color $color-white
  &:first-child
    margin-top 0.2rem
  &-head
    padding 0.29rem 0.3rem 0.22rem
    color $text-color-6
    font-size 0.3rem
  &-status
    color #fe824e
    &.not-pay
      color $theme-color
  &-content
    padding 0 0.3rem
    background-color #f8f8f8
  &-course
    display flex
    padding 0.3rem 0
    &:not(:last-child)
      border-1px(bottom, #d1dce4)
    img
      margin-right 0.2rem
      width 2rem
      height 1.25rem
      border-radius 0.06rem
    &-info
      position relative
      flex 1
      h3
        margin 0.1rem 0 0.3rem
        font-size 0.28rem
        color $text-color-4
      .price
        font-size 0.26rem
        color $text-color-8
      .num
        position absolute
        bottom 0
        right 0
        font-size 0.3rem
        color #bcbcbc
  &-coupon
    padding 0.3rem 0.3rem 0.2rem
    font-size 0.13rem
    border-1px(bottom, #d1dce4)
    &-item
      line-height 1
      &:first-child
        margin-bottom 0.16rem
      .key
        color $text-color-6
      .value
        color $text-color-8
  &-price
    padding 0.3rem
    text-align right
    font-size 0.28rem
    color $text-color-6
    border-1px(bottom, #d1dce4)
    span
      font-size 0.32rem
      color #ff5d16
  &-footer
    padding 0.22rem 0.3rem
    line-height 0.56rem
    .time
      color $text-color-6
      font-size 0.26rem
    button
      width 1.66rem
      height 0.56rem
      color #f63538
      background-color #fff
      border-1px(all, #f63538, 4px)
</style>
