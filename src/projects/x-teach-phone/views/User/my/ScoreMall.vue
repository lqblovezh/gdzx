<script>
import { mapGetters } from 'vuex'
import loadmoreMixin from '@/mixins/loadmore'
import Coupon from '@/components/common/Coupon'
import ExchangeStatusPanel from '@/components/common/ExchangeStatusPanel'
export default {
  mixins: [loadmoreMixin],
  components: { Coupon, ExchangeStatusPanel },
  computed: {
    ...mapGetters('user', ['info']),
    statistics () {
      return this.info.statistics || this.info.statistics.credits
    }
  },
  data () {
    return {
      dialogStatus: false,
      isSuccess: false,
      errorStr: '',
      options: {
        click: true
      }
    }
  },
  mounted() {
    this.fetch(true)
  },
  methods: {
    queryList (params) {
      return this.$service.intearal.getList({ ...params })
    },
    exchange (info) {
      this.$MessageBox.confirm('确认兑换该商品？').then(action => {
        this.$service.intearal.exchange({id: info.id}).then(res => {
          let num = this.statistics.credits - info.integral
          this.$set(this.statistics, 'credits', num)
          this.isSuccess = true
        }).catch(err => {
          this.errorStr = err.toString()
          this.isSuccess = false
        }).finally(() => {
          this.dialogStatus = true
        })
      })
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="积分商城" :main-type="1" class="page-of-mall")
  .current-score 当前积分：
    span.icon-coin-big
    span.black6 {{info.statistics && info.statistics.credits || '0'}}积分
  .coupon-wrapper
    cube-scroll(
      ref="scroll"
      :options="options"
      class="coupon-list"
      @pulling-up="onPullUp"
    )
      .container
        coupon(v-for="item in list" :key="item.id" :info="item" @toggle="exchange" show-time)
  ev-overlay(v-model.sync="dialogStatus")
    exchange-status-panel(
      @hide="dialogStatus=false"
      :panel-status="isSuccess"
      :err-msg="errorStr"
    )
</template>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
.page-of-mall
  >>> section
    background-color $bg-color-default
  .current-score
    margin-bottom 0.2rem
    padding 0 0.3rem
    height 0.86rem
    line-height 0.86rem
    color #333
    font-size 0.28rem
    background-color $color-white
    .icon-coin-big
      margin 0.29rem 0.13rem 0 0
  .coupon-wrapper
    position absolute
    top 1.06rem
    bottom 0
    left 0
    right 0
    background-color $color-white
    z-index 9
    >>> .coupon
      margin 0.3rem 0
</style>
