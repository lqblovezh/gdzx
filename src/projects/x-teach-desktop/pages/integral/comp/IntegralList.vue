<script>
export default {
  props: ['list'],
  data() {
    return {}
  },
  methods: {
    exchange(item) {
      this.$emit('click', item)
    },
    getSourceName(item) {
      return (
        item.book_name || item.resources_name || item.coupon_name || item.name
      )
    },
  },
}
</script>

<template lang="pug">
  ul.comp-integral-list
    li.item.ib(v-for="item,index in list" :key="item.id" @click="exchange(item)")
      .img.f0.icon
        img(:src="item.img")
      .other
        .name.c_3.f16.f800.ellipsis {{getSourceName(item)}}
        .author.f13.ellipsis {{item.author_name}}
        .icon.icon-integration.c_6.f14 {{item.integral}}积分
</template>

<style lang="stylus" scoped>
.comp-integral-list
  padding 0
  margin 0
  .item
    width 250px
    margin 0 46px 30px 0
    font-size 0
    cursor pointer
    border-radius 4px
    overflow hidden
    &:nth-of-type(4n)
      margin-right 0
    .img
      padding 10px 0
      background-color #dae4e7
      img
        width 100%
        height 190px
        object-fit contain
    .other
      padding 15px 10px
      background-color #f5f5f5
      .name
        margin-bottom 10px
      .author
        color #757575
        margin-bottom 18px
      .icon-integration
        padding-left 20px
        width initial
        background-position left
</style>
