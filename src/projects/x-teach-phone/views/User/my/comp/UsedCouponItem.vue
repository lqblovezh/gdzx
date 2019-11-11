<template lang="pug">
.used-coupon-item
  img(v-lazy="info.img")
  .item-info
    .name {{ info.name }}
    .type {{ info.type|convertType}}
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    convertType(value) {
      return value === 'books' ? '书籍' : '资源'
    }
  }
}
</script>
<style lang="stylus" scoped>
.used-coupon-item
  display flex
  margin 0.3rem 0
  img
    margin-right 0.24rem
    width 2.8rem
    height 1.7rem
    box-shadow 0 0 0.04rem rgba(0,0,0,0.1)
  .item-info
    flex 1
    .name
      margin 0.2rem 0 0.3rem
      color #333
      font-size 0.3rem
    .type
      color #888
      font-size 0.28rem
</style>