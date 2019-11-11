<script>
export default {
  props: {
    type: String,
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
    isBuy: {
      default: false,
    },
    motto: String,
  },
  created() {
    this.starNum = this.star / 2
  },
  watch: {
    star() {
      this.cstar = this.star / 2
    },
  },
  data() {
    return { cstar: 0 }
  },
}
</script>

<template lang="pug">
.comp-course-card(:class='type')
  .exp(v-if="type=='college'")
    .box.c_f
      .name.f20 {{name}}
      .des.f14.ellipsis-2 {{des}}
      .motto.f14.ellipsis-2 {{motto}}
      Tbutton.course(type="og") {{num}}门课程
  .wrap.cp
    .img.f0 
      img(:src="imgUrl")
    .message.f14.pr
      .name.f16.c_3
        HighlightTxt( :val="name" :tag="tag")
      .des.ellipsis.f14
        HighlightTxt( :val="des" :tag="tag")
    .hr
    .message.f14.pr(v-if="type!='college'")
      .classmsg
        .line(v-if="typeof num === 'number'")
          span 班级人数：
          span {{num || 0}}人
        .line(v-if="teacher")
          span 教师：
          span {{teacher}}
        .line(v-if="organization")
          span 单位名称：
          span(v-html="organization")
        .line(v-if="time")
          span 开始时间：
          span {{time}}
      // .bd_line(v-if="isBdLine")          
      .star.fix(
        v-if="star !== false") 
        .fl 
          el-rate(
            :value="star/2"
            disabled
          )
        span.num.fl {{star/2}}
        span.studied.fr(v-if="typeof studied === 'number'") {{studied}} 人学过    
      .price.c_price.f15(v-if="!noPrice") {{$price(price, isBuy)}} 
      .price.f15(v-if="teachNum") 
        span 班级人数：
        span.c_price {{teachNum}}人
    
</template>

<style lang="stylus">
.comp-course-card
  position relative
  &.college
    &:hover
      >.wrap
        box-shadow none
        transform translateY(0)
      .exp
        z-index 10
        background rgba(48, 159, 195, 0.9)
        transition all 0.5s ease-in-out
    .wrap
      .img
        text-align center
        padding 20px
        img
          width 160px
          height @width
          object-fit contain
      .message
        padding 0 8px 20px
        text-align center
    .exp
      width 100%
      height 283px
      position absolute
      transition all 0.5s ease-in-out
      display table
      z-index -10
      .box
        display table-cell
        vertical-align middle
        text-align center
        padding 0 20px
        .name
          margin-bottom 14px
        .des
          margin-bottom 41px
        .motto
          margin-bottom 40px
        .course
          margin-bottom 14px
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
        height 150px
        object-fit cover
    >.hr
      height 1px
      background-color #eaeaea
    >.message
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
