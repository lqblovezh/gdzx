<template lang="pug">
  .school-detail-intro
    .title 简介
    .intro.f13.clearfix {{ _abs }}
      .more(@click="isShowMore = !isShowMore" :class="{'more-r90': isShowMore}" v-show="showBtn") {{ isShowMore?'收拢':'展开' }}
</template>
<script>
export default {
  props: {
    abs: {
      type:String,
      default: ''
    },
  },
  computed: {
    showBtn() {
      return this.abs.length > this.size
    },
    _abs () {
      return this.isShowMore ? this.abs : `${this.abs.substr(0, this.size)}...`
    }
  },
  data () {
    return {
      size: 140,
      isShowMore: false,
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .school-detail-intro
    padding $layout-padding 0
    margin-bottom $layout-padding
    border-bottom 1px solid #d1dce4
    .intro
      margin-top $layout-padding
      color #555
      text-indent 2em
      line-height 1.5
      .more
        position relative
        float right
        color $theme-color
        box-sizing border-box
        padding-right 20px
        &-r90
          &::after
            top 8px
            transform rotate(-45deg)!important
        &::after
          content ''
          position absolute
          right 5px
          display inline-block
          width 10px
          height 10px
          border-top 1px solid $theme-color
          border-right 1px solid $theme-color
          transform rotate(135deg)
</style>