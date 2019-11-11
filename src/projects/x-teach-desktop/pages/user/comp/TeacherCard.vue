<script>
export default {
  props: {
    item:{
      default: {}
    },
    imgUrl: {
      default: '',
    },
    name: {
      default: '',
    },
    des: {
      default: '',
    },
    organization: {
      default: '', // 组织单位
    },
  },
}
</script>


<template lang="pug">
.comp-teacher-card
  .wrap.cp
    .img.f0 
      img(:src="imgUrl")
    .message.f14
      .des.ellipsis.f14
        span 简   介：
        HighlightTxt(:val="des")
      .classmsg
        .line
          span 单位名称：
          span {{organization}}
      .button.c_4(@click="$parent.detail('11')") 个人主页
      .cancel
        Tbutton( @click.native="$parent.del(item.id)" type="default" size="small") 取消关注
</template>

<style lang="stylus">
.comp-teacher-card
  &:hover
    >.wrap
      box-shadow 0px 4px 8px 0px rgba(4, 0, 0, 0.25)
      transform translateY(-8px)
  >.wrap
    position relative
    transition all 0.2s ease-in-out
    border solid 1px #e0e0e0
    >.img
      >img
        width 100%
        height 240px
        object-fit fill
    >.message
      padding 10px 8px
      line-height 30px
      color #757575
      >.classmsg
        line-height 25px
      >.button
        height 34px
        line-height 34px
        text-align center
        background #ededed
        margin-top 20px
        margin-bottom 10px
      >.cancel
        position absolute
        right 10px
        top 10px
      >.star
        >.num, .studied
          padding-top 4px
        .el-icon-star-on
          &::before
            font-size 14px
</style>
