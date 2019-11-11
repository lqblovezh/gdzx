<script>
import { mapState } from 'vuex'
import loadmoreMixin from '@/mixins/loadmore'
import UsedCoupon from './comp/UsedCoupon'
import UsedCouponItem from './comp/UsedCouponItem'
export default {
  mixins: [loadmoreMixin],
  components: { UsedCoupon, UsedCouponItem },
  data () {
    return {}
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  mounted() {
    this.fetch(true)
  },
  methods: {
    queryList (params) {
      return this.$service.intearal.integral(params)
    },
    go(name) {
      this.$router.push({path: name})
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="积分会员" :main-type="1" class="page-of-mall")
  cube-scroll(
    ref="scroll"
    class="mall-content"
    :options="options"
    @pulling-up="onPullUp"
  )
    .i-mall-bg.mall-info
      h2 {{userInfo.statistics && userInfo.statistics.credits || '0'}}
      p 当前积分
      button(@click="go('mall')") 积分商城
    .container
      p.shop-tips
        span.icon-gift
        |已兑换物品
      .discount-paper
        component(
          v-for="item in list"
          :key="item.id"
          :info="item"
          :is="item.type!=='coupons'?'UsedCouponItem':'UsedCoupon'"
        )
</template>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
.page-of-mall
  .mall-content
    .mall-info
      padding-top 0.9rem
      text-align center
      box-sizing border-box
      h2
        font-size 0.72rem
        font-weight bold
        color $color-white
      p
        margin 0.3rem 0 0.4rem
        font-size 0.24rem
        color #c0e8ff
      button
        height 0.6rem
        width 1.7rem
        line-height 0.6rem
        border-radius 0.3rem
        color $theme-color
        background-color $color-white
  .shop-tips
    padding 0.3rem 0
    border-bottom 1px solid #dfe6eb
    .icon-gift
      margin-right 0.13rem
</style>
