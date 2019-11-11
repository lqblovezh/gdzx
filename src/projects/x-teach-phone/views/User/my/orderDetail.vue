<script>
import OrderItem from './comp/OrderItem'
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [ loadmoreMixin ],
  data () {
    return {
      selected: 'all',
      list: [],
      isClick: true
    }
  },
  components: {
    OrderItem
  },
  mounted () {
    this.fetch(true)
  },
  computed: {
    notPayList () {
      return this.list && this.list.filter(e => e.pay_status === 'not_pay')
    },
    alreadyPayList () {
      return this.list && this.list.filter(e => e.pay_status === 'already_paid')
    }
  },
  methods: {
    queryList (params) {
      return this.$service.cart.getOrderList({ ...params })
    },
    del (order_id) {
      this.$MessageBox.confirm('确认删除？').then(action => {
        this.delOrder(order_id)
      }).catch(console.warn)
    },
    delOrder (id) {
      this.$service.cart.delOrder({id}).then(res => {
        this.fetch(true)
      }).catch(console.warn)
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="我的订单" :main-type="1" class="page-of-order")
  cube-scroll(
    ref="scroll"
    :options="options"
    class="order-list"
    @pulling-up="onPullUp"
    @pulling-down="onPullingDown"
  )
    OrderItem(v-for="el in list" :item="el" @del="del" :key="el.id")
  .study-empty(v-show="list.length === 0")
    .bg-empty
</template>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
.page-of-order
  .order-list
    background-color $bg-color-default
	.study-empty
		position fixed
		width 100%
		let 0
		right 0
		top 1.87rem
		bottom 1rem
		.bg-empty
			position absolute
			width 100%
			top 50%
			left 0
			transform translateY(-50%)
</style>
