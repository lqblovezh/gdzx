<template lang="pug">
.index-shop
  index-panel-title(:label="info.name" icon-class="index-shop" to="/market")
  .index-shop-nav.container.f15
    a(
      :class="{'is-selected': selected === index }"
      @click="selected = index;currentItem = tab"
      v-for="tab, index in info.children"
      :key="`${Date.now().toString(16)}_${index}`"
    ) {{ tab.name }}
  layout-grid(v-if="currentItem.type !== 'course'")
    home-shop-panel-book(
      v-for="item, index in sub_list"
      :key="`${Date.now().toString(16)}_${index}`"
      :item="item"
      @confirm="confirmOne"
    )    
  .container.courseBox(v-else)
    course-item-cell(
      v-for="item, index in sub_list"
      :key="`${Date.now().toString(16)}_${index}`"
      :item="item"
    )
  .tc.no-more.f13 没有更多了~


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
import HomeShopPanelBook from './HomeShopPanelBook'
import {mapState} from 'vuex'
import Mall from '@/views/Mall'
export default {
  components: { HomeShopPanelBook },
  mixins: [Mall],
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    sub_list () {
      console.log('info')
      console.log(this.info)
      return this.info.children && this.info.children[this.selected].info
    }
  },
  data () {
    return {
      selected: 0,
      currentItem: {}
      // show: false,
    }
  },
  methods: {
    confirmOne(item) {
      this.select({ label: this.info.children[this.selected].name, ...item})
    }
  },
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .courseBox
    margin-bottom 0.4rem
  .index-shop
    overflow hidden
    >ul
      margin-bottom 0.4rem
    &-nav
      a
        display inline-block
        padding 0.16rem 0.2rem
        color #545454
      .is-selected
        color #3496e1
        background-color #edf3f8
        border-radius 999px
    .index-grid-layout
      margin-top 0.3rem
    .no-more
      margin-bottom 0.4rem
      color #b7b7b7
</style>