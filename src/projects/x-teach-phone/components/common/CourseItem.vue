<template lang="pug">
  .grid-course-item(
    @click="$goWithName('course', { course_id: info.id })"
  )
    img(:src="info.img")
    .grid-course-info
      .title.ell.f14 {{ info.course_name }}
      .abs.ell.f12 {{ info.abs }}
      .info.flex-bs.f12
        star(:num="info.score" show-score)
        .right.inline-flex
          .icon.i-persons
          | {{ info.study_count }}
      .price.f13.c-6(v-show="showPrice") 价格：
        span.f15 ￥{{info.price}}
</template>
<script>
export default {
  name: 'course-item',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    showPrice: Boolean
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .grid-course-item
    margin-bottom .2rem
    img
      width 100%
      height 2.06rem
      border-radius 0.1rem
      box-shadow 0 0.06rem 0.1rem rgba(0, 0, 0, .2)
    .title
      margin 0.24rem 0 0.14rem
      color $text-color-4
    .abs
      color $text-color-6
    .info
      margin 0.23rem 0 0.4rem
      color #7c8089
      .right
        div
          margin-right 0.08rem
    .price
      span
        color #ff5d16
</style>
