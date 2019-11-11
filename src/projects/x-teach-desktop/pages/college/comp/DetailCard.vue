<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    english: {
      type: String,
      default: '',
    },
    motto: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    abs: {
      type: String,
      default: '',
    },
  },
  methods: {},
}
</script>

<template lang="pug">
.comp-college-detail-card
  .top.flex
    .img 
      img(:src="imgUrl") 
    .other.f14.c_6
      .name.f22.c_3 {{name}}
      .english.f16 {{english}}
      .motto.f18.c_6 {{motto}}
      .address.f14.c_3
        .icon.icon-address
        pre.addres {{address}}
  .abs
    .title.f16 简介
    span.text.c_6.f14 {{abs}} 
  .course
    .title.f16 课程
    slot
</template>

<style lang="stylus" scoped>
.comp-college-detail-card
  .top
    padding 30px
    background #fff
    >.img
      display inline-block
      width 255px
      height @width
      overflow hidden
      border 1px solid #e0e0e0
      padding 30px
      box-sizing border-box
      >img
        height 100%
        width 100%
        object-fit contain
    >.other
      padding 15px 30px
      width 520px
      height 255px
      box-sizing border-box
      display flex
      flex-direction column
      justify-content space-between
      .name
        // margin-bottom 20px
        font-weight bold
      .english
        // margin-bottom 58px
        color #5c5c5c
      .motto
        // margin-bottom 58px
      .address
        .icon
          margin-right 12px
          vertical-align top
        .addres
          display inline-block
          line-height 1.5em
          margin 0
  .abs, .course
    background #fff
    margin-top 20px
    padding 23px 30px
    >.text
      line-height 30px
    .title
      color #4d4d4d
      font-weight bold
      line-height 40px
</style>
