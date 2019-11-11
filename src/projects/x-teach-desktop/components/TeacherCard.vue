<script>
export default {
  props: {
    imgUrl: {
      default: '',
    },
    name: {
      default: '',
    },
    des: {
      default: '',
    },
    tag: {
      default: '', // 高亮文本
    },
    num: {
      default: '',
    },
    teacher: {
      default: '',
    },
    organization: {
      default: '', // 组织单位
    },
    star: {
      default: false,
    },
    studied: {
      default: false,
    },
    price: {
      default: false,
    },
    isBdLine: {
      default: false,
    },
    teachNum: {
      default: false,
    },
    time: {
      default: '',
    },
    noPrice: {
      default: false,
    },
  },
}
</script>

<template lang="pug">
.comp-course-card
  .wrap.cp
    .img.f0 
      img(:src="imgUrl")
    .message.f14.pr
      .name.f16.c_3
        HighlightTxt( :val="name" :tag="tag")
      .des.ellipsis.f14
        span 简介：
        HighlightTxt( :val="des" :tag="tag")
      .classmsg
        .line(v-if="num")
          span 班级人数：
          span {{num}}人
        .line(v-if="teacher")
          span 教师：
          span {{teacher}}
        .line.ellipsis-2(v-if="organization")
          span 单位名称：
          span(v-html="organization")
      .bd_line(v-if="isBdLine")
      .price.c_price.f15(v-if="!noPrice") {{$price(price)}} 
      .price.f15(v-if="teachNum") 
        span 班级人数：
        span.c_price {{teachNum}}人
</template>

<style lang="stylus" scoped>
.comp-course-card
  &:hover
    >.wrap
      box-shadow 0px 4px 8px 0px rgba(4, 0, 0, 0.25)
      transform translateY(-8px)
  >.wrap
    transition all 0.2s ease-in-out
    border solid 1px #e0e0e0
    >.img
      >img
        width 100%
        height 240px
        object-fit fill
    >.message
      height 110px
      padding 10px 8px
      line-height 30px
      color #757575
      overflow hidden
      >.classmsg
        line-height 25px
      >.bd_line
        margin 15px 0 5px 0
        transform scaleX(1.1)
      >.star
        >.num, .studied
          padding-top 4px
        .el-icon-star-on
          &::before
            font-size 14px
</style>
