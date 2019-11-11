<template lang="pug">
.home
  v-wrapper(title="商城" class="mall" :main-type="1" :hide-back="!isHomeTab")
  tabs(:tabs="tabs")
  ev-overlay(v-model.sync="show")
    ev-comfirm(
      @cancel-event="show=false"
      @confirm-event="confirm"
    )
      p 您是否要兑换该商品？(库存：{{selectItem.count}})
      p 花费
        span.score {{selectItem.integral}}
        | 积分
  ev-overlay(v-model.sync="exchange_status")
    exchange-status-panel(
      @hide="hideExchangeStatus"
      :panel-status="exchangeStatus"
      :err-msg="errorStr"
    )
  transition(name="slide-up")
    Address(
      v-show="editAddress"
      :selectItem="selectItem"
      @hide-panel="editAddress = false"
      @confirm-handler="confirm"
    )
</template>
<script>
import ExchangeStatusPanel from '@/components/common/ExchangeStatusPanel'
import Address from './edit-address'
import Books from './children/Books'
import Coupons from './children/Coupons'
export default {
  components: { Address, Books, Coupons, ExchangeStatusPanel },
  data() {
    return {
      isHome: false,
      // 是否兑换弹框状态
      show: false,
      // 信息编辑弹框状态
      editAddress: false,
      // 需要兑换的项
      selectItem: {},
      // 兑换状态（成功or失败）
      exchangeStatus: false,
      // 兑换结果提示框的显示状态
      exchange_status: false,
      // 兑换成功or失败
      errorStr: '兑换失败',
    }
  },
  computed: {
    isHomeTab() {
      let { path } = this.$route
      console.log(path)
      if (path == '/market') {
        return true
      } else {
        return false
      }
    },
    tabs() {
      return [
        { label: '纸质书', component: Books, data: { type: 'books' } },
        { label: '资源', component: Books, data: { type: 'resources' } },
        { label: '优惠券', component: Coupons, data: { type: 'coupon' } },
      ]
    },
  },
  methods: {
    confirm({ msg, status } = {}) {
      console.log(22222)
      this.show = false
      if (this.selectItem.label === '纸质书' && typeof status === 'undefined') {
        this.editAddress = true
      } else if (
        this.selectItem.label === '纸质书' &&
        typeof status !== 'undefined'
      ) {
        this.editAddress = false
        this.errorStr = msg
        this.exchangeStatus = status
        this.exchange_status = true
      } else {
        this.editAddress = false
        this.handleItemNotBook()
      }
    },
    async handleItemNotBook() {
      const { label, id } = this.selectItem
      const type = label === '资源' ? 'resources' : 'coupon'
      let msg = '兑换成功'
      try {
        await this.$service.intearal.exchange({ id, type })
        this.exchangeStatus = true
      } catch (e) {
        msg = this.$catchError(e, false)
        this.exchangeStatus = false
      } finally {
        this.errorStr = msg
        this.exchange_status = true
      }
    },
    hideExchangeStatus() {
      this.exchange_status = false
    },
    select(item) {
      if (this.$checkLogin()) {
        this.selectItem = item
        this.show = true
      }
    },
  },
  provide() {
    return {
      select: this.select,
    }
  },
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/var.styl'
@import '~@/assets/css/mixin.styl'

.mall
  background-color #f4f5f7
  >>> .cube-tab-bar
    margin-bottom 0.2rem
    background-color #FFF
  >>> .cube-tab
    padding 0.3rem 0
  >>> .slide-wrapper
    background-color #FFF
  .ev-overlay
    .score
      margin 0 0.04rem
      color #f8a607
</style>
