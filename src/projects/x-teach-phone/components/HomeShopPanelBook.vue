<template lang="pug">
  .index-shop-book(@click="$emit('confirm', info)")
    .index-book-bg.tc
      img(v-lazy="info.img")
    .book-name.f14.ell {{ item.type === 'pod_book' ? info.book_name : info.resources_name }}
    .author.f12 {{ info.author_name }}
    .inline-flex.f12.coin
      .icon.i-coin
      | {{ info.integral }}积分
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    info () {
      return this.item.info || this.item || {}
    }
  }
}
</script>
<style lang="stylus">
  .index-shop-book
    margin-bottom 0.4rem
    .index-book-bg
      background-color #dcdfe2
      border-radius 0.1rem
      img
        margin 0.14rem 0
        width 1.6rem
        height 2.27rem
    .book-name
      margin 0.24rem 0 0.14rem
    .author
      margin-bottom 0.24rem
      color #666666
    .coin
      color #7c8089
      > div
        margin-right 0.1rem
</style>