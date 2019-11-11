<template lang="pug">
cube-scroll(
  ref="scroll"
  class="mall-coupons container"
)
  .mall-coupons-wrapper
    coupon(
      v-for="item in list"
      :info="item"
      @toggle="toggle"
    )
</template>
<script>
import Coupon from '@/components/common/Coupon'
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  inject: ['select'],
  components: { Coupon },
  props: {
    label: String
  },
  methods: {
    queryList (queries) {
      return this.$service.intearal.getList({ ...queries })
    },
    toggle(item) {
      this.select({ label: this.label, ...item})
    }
  }
}
</script>
<style lang="stylus" scoped>
.mall-coupons
  &-wrapper
    padding-top 0.3rem
</style>