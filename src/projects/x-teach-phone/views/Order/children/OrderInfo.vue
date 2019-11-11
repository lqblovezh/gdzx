<template lang="pug">
.order-list
  h3 商品信息
  .order-list__wrapper
    .order-item(
      v-for="item in list"
      :key="item.id"
    )
      img(:src="item.course_info.img")
      .order-item__info
        .course-name.ell2 {{ item.course_info.course_name}}
        .price 价格：
          span ￥{{ item.course_info.price}}
</template>
<script>
export default {
  props: {
    list: {
      type: Array
    }
  }
}
</script>
<style lang="stylus" scoped>
.order-list
  margin-top 0.2rem
  h3
    padding 0.2rem 0 0.5rem
  &__wrapper
    .order-item
      display flex
      img
        margin-right 0.2rem
        width 2.7rem
        height 1.8rem
        box-shadow 0 0 0.04rem rgba(0, 0, 0, .1)
      &__info
        display inline-flex
        flex 1
        flex-direction column
        justify-content space-between
        .course-name
          line-height 1.5
          color #333
          font-size 0.32rem
        .price
          font-size 0.26rem
          color #333
          span
            font-size 0.3rem
            color #ff5d16
</style>