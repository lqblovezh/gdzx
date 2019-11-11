<script>
import { mapState, mapMutations } from 'vuex'
import OrderInfo from './children/OrderInfo'
import urlJoin from 'url-join'
import { isEmptyObj } from '@/utils/algorithm'
import { isString, isArray, isBool } from '@/utils/helpers'
export default {
  data () {
    return {
      selected: '',
      option: {
        pay_from: 'wechat',
        goods: [],
      },
      coupon: [],
      myOrder: null,
      couponList: [],
      type: 'single',
      payMethods: [1],
      dialogStatus: false
    }
  },
  components: { OrderInfo },
  computed: {
    ...mapState('common', {
      orderInfo: state => state.order_list,
      config: state => {
        return state.config ? state.config : {}
      }
    }),
    total () {
      let item
      if (this.couponList && this.coupon.length !== 0) {
        item = this.couponList.filter(i => i.id === this.coupon[0])
      }
      return item ? (this.totolPrice() - parseFloat(item[0].coupon_money)).toFixed(2):this.totolPrice().toFixed(2)
    },
    coupon_list () {
      return this.dialogStatus ? this.couponList : this.couponList.slice(0, 2)
    }
  },
  mounted () {
    this.initOrderItem()
    this.getCoupon()
  },
  beforeDestroy() {
    // 离开路由时清除vuex中存储的订单信息
    this.setOrderInfo(null)
  },
  methods: {
    ...mapMutations('common', ['setOrderInfo']),
    totolPrice () {
      let sum = 0
      this.orderInfo.map(item => {
        sum += parseFloat(item.course_info.price)
      })
      return sum
    },
    initOrderItem () {
      if (isEmptyObj(this.orderInfo)) {
        this.orderInfo = JSON.parse(window.sessionStorage.getItem('cart'))
      }
      !isEmptyObj(this.orderInfo) && this.initGoodsNum()
    },
    initGoodsNum() {
      this.orderInfo.map(item => {
        this.option.goods.push(item.course_info.id)
      })
    },
    getCoupon () {
      this.$service.intearal.MyList().then(res => {
        if (isArray(res.data)) {
          this.couponList = res.data.filter(item => this.total - item.coupon_money > 0)
        }
      })
    },
    pay() {
      let coupon
      if (this.coupon.length > 0) {
        coupon = this.coupon[0]
      }
      this.$service.cart.pay({
        ...this.option,
        redirect: window.location.href.replace(/\/order\S+/g, '/orderStatus'),
        coupon
      }).then(res => {
        window.location.href=res.data
      }).catch(console.warn)
    },
    selectOne(id, idx) {
      let idIdx = this.coupon.indexOf(id)
      if (idIdx >= 0) {
        this.coupon.splice(idIdx, 1)
      } else {
        this.coupon = []
        this.coupon.push(id)
      }
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="订单支付" :main-type="1" class="page-of-order")
  .order-container
    order-info(:list="orderInfo")
    .afford
      h3 支付方式
      .afford-method
        .afford-item(v-if="config.pay && config.pay.wxpay")
          .afford-icon
            span.icon-wx
            |微信支付
          p.radio-box
            input(type="radio" value="wechat" name="selected" v-model="option.pay_from")
            label
        .afford-item(v-if="config.pay && config.pay.alipay")
          .afford-icon
            span.icon-zhifubao
            |支付宝
          p.radio-box
            input(type="radio" value="alipay" name="selected" v-model="option.pay_from")
            label
    .pay-info
      .coupon-item(v-for="item, index in coupon_list" :key="item.id")
        p 可用优惠券{{item.coupon_money}}元
        p.check-box
          input(type="checkbox" :checked="coupon.indexOf(item.id) >= 0" @click="selectOne(item.id)")
          label
      .txt-more(@click="dialogStatus=true" v-show="couponList.length > 2") 更多优惠卷
      p.real-price 实付金额：
        span.orange ￥{{total}}
      button.btn-large.btn-orange(@click="pay") 立即支付
  ev-overlay(v-model="dialogStatus" transition="slide-up" allow-click-hide)
    .coupon-list
      .coupon-content
        .coupon-item(v-for="item, index in couponList")
          p 可用优惠券{{item.coupon_money}}元
          p.check-box
            input(type="checkbox" :checked="coupon.indexOf(item.id) >= 0" @click="selectOne(item.id, index)")
            label
</template>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
.page-of-order
  .coupon-item
    padding 0.3rem 0
    margin-bottom 0
    border-bottom 1px solid #e9eef0
    display flex
    justify-content space-between
    color #666
    &:last-child
      margin-bottom 0.5rem
    .check-box
      position relative
      input
        position relative
        margin 0
        width 0.3rem
        height 0.3rem
        opacity 0
        z-index 9
      label
        position absolute
        left 0
        top 0
        z-index 8
  .coupon-list
    position absolute
    padding 0 0.2rem
    height 4rem
    width 100%
    bottom 0
    font-size 14px
    background-color #fff
    box-sizing border-box
    .coupon-content
      height 100%
      overflow scroll
      padding-top 0
      &::-webkit-scrollbar
        display none
  .order-container
    height 100%
    overflow scroll
    font-size 14px
    background-color $bg-color-default
    > div
      margin-top 0.2rem
      padding 0.3rem
      background-color #FFF
      >>> h3
        font-size 0.3rem
        color #222
    .afford
      h3
        padding-top 0.05rem
      .afford-item
        margin-top 0.5rem
        display flex
        justify-content space-between
        line-height 0.37rem
        .afford-icon
          span
            margin-right 0.24rem
        span
          display inline-block
        .radio-box
          position relative
          input
            position relative
            margin 0
            width 0.3rem
            height 0.3rem
            opacity 0
            z-index 9
          label
            position absolute
            left 0
            z-index 8
    .pay-info
      .txt-more
        margin-top 0.3rem
        color orange
        text-align right
        margin-bottom 0.5rem
    .real-price
      span
        font-weight bold
    button
      margin-top 0.5rem
</style>