<template lang="pug">
  .school-detail-info.shadow
    .infos.clearfix
      img.fl(:src="info.img")
      .right
        .name {{ info.name }}
        .name-en.f14 {{ info.english_name }}
        .quote.f13
          span.i-quote
          span {{ info.school_motto }}
          span.i-quote.symmetry
    .location.f12
      .i-location
      | {{ info.address }}
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      defalut() {
        return {}
      }
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/mixin.styl";
  @import "~@/assets/css/var.styl";
  .school-detail-info
    margin 0.2rem 0
    padding 0 0.3rem 0.3rem
    .infos
      img
        margin-right 0.2rem
        width 2rem
        height 2rem
        border-radius 0.1rem
        border-1px()
      .right
        overflow hidden
        padding-top 0.1rem
      .name
        color $text-color-3
      .name-en
        margin 0.2rem 0
        color $text-color-6
      .quote
        color #888
      .symmetry
        transform translateY(0.05rem) rotate(180deg)
    .location
      padding-top 0.3rem
      line-height 0.3rem
      color $text-color-6
      div
        margin-right 0.1rem
</style>