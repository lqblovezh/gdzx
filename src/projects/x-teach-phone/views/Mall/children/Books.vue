<template lang="pug">
cube-scroll(
  ref="scroll"
  class="mall-books"
  :options="options"
  @pulling-up="onPullUp"
  :style="setHeight"
)
  layout-grid
    home-shop-panel-book(
      v-for="(item,index) in list"
      :item="item"
      :key="item.id"
      @confirm="confirm"
    )
</template>
<script>
import HomeShopPanelBook from '@/components/HomeShopPanelBook'
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  inject: ['select'],
  computed: {
    setHeight() {
      let height = ['1.4rem', '2.4rem']
      if (typeof device != 'undefined' && device.platform == 'iOS') {
        height = ['2rem', '3rem']
      }
      if (this.$route.path == '/market') {
        return `height: calc(100vh - ${height[0]})`
      }
      return `height: calc(100vh - ${height[1]})`
    },
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    label: String,
  },
  components: { HomeShopPanelBook },
  methods: {
    queryList(queries = {}) {
      return this.$service.intearal.getList({
        ...queries,
        type: this.data.type,
      })
    },
    confirm(item) {
      console.log(111)
      this.select({ label: this.label, ...item })
    },
  },
}
</script>
<style lang="stylus" scoped>
.mall-books
  >>> .index-grid-layout
    padding-top 0.3rem
</style>
