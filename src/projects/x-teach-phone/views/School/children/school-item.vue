<template lang="pug">
  .school-item.between-layout(@click="$goWithName('school-detail', { id: item.id })")
    img(v-lazy="item.img")
    .school-item-info
      .info
        .name.f15 {{ item.name }}
        .name-en.f13.ell {{ item.english_name }}
      .tips
        span.f12 {{item.course_count}}个课程
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
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  @import "~@/assets/css/mixin.styl";
  .school-item
    margin $layout-padding 0
    img
      margin-right 0.24rem
      width 1.78rem
      height 1.78rem
      border-1px()
      border-radius 0.1rem
    &-info
      margin 0.1rem 0
      .name
        color $text-color-3
      .name-en
        margin-top 0.2rem
        color $text-color-6
      span
        padding 0.1rem 0.13rem
        color $theme-color
        background-color #EAF4FC
</style>
