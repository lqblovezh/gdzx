<script>
export default {
  data () {
    return {
      pay_status: true
    }
  },
  mounted () {
    this.pay_status = this.$route.query.pay_status
  },
  methods: {
    back () {
      this.$router.push({path: 'user'})
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="订单支付" class="order-status" :main-type="1")
  .text-center(v-if="pay_status")
    .img-state
      img(src="./img/img_pay_success.png")
    p.pay-tips 您已支付成功
    button.btn-comfirm.circle(@click="back") 确定
  .text-center(v-else)
    .img-state
      img(src="./img/img_pay_failed.png")
    p.pay-tips 支付失败
    //- button.btn-comfirm.circle 重新支付
</template>
<style lang="stylus" scoped>
.order-status
  font-size 14px
  .img-state
    margin-top 3rem
    img
      width 3.14rem
      height 2.76rem
  p.pay-tips
    margin-top 0.2rem
    margin-bottom 0.6rem
    color #999
  button
    border none
    outline none
    &.btn-comfirm
      width 4.4rem
      height 0.6rem
      color #FFF
      background-color #3496e1
      line-height 0.6rem
</style>