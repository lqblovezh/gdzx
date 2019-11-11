<script>
export default {}
</script>
<template lang="pug">
.comp-learn-list.f14
  .list-title.pr 目录
  .list-body
    .scroll
      .plan(v-for="i in 10")
        .plan-title.c_f.flex.c_og_2
          .plan-index 计划1
          .plan-name.ellipsis(title="《中国强大的真正希望》第1集 浙江大学") 《中国强大的真正希望》第1集 浙江大学
          .plan-time 30秒
        .plan-item
          .item-title.f12.ellipsis(title="《中国强大的真正希望》第1集 浙江大学") 《中国强大的真正希望》第1集 浙江大学
</template>
<style lang="stylus">
.comp-learn-list
  float left
  width 258px
  height 100%
  background-color #4e5156
  >.list-title
    height 50px
    line-height 50px
    padding-left 28px
    color #69d7fc
    border 1px solid #5d6066
    &:after
      content ''
      position absolute
      display inline-block
      width 45px
      height 2px
      left 20px
      bottom -1px
      background-color #69d7fc
  >.list-body
    padding 0 20px
    height calc(100% - 52px)
    overflow-y auto
    .plan
      margin-top 30px
      &:last-child
        margin-bottom 30px
      .plan-title
        margin-bottom 20px
        .plan-name
          flex 1
      .plan-item
        padding-left 20px
      .item-title
        color #e7e7e7
        cursor pointer
::-webkit-scrollbar
  width 8px
  height 16px
  background-color #F5F5F5
::-webkit-scrollbar-track
  -webkit-box-shadow inset 0 0 6px rgba(0,0,0,0.3)
  border-radius 10px
  background-color #F5F5F5
::-webkit-scrollbar-thumb
  border-radius 10px
  -webkit-box-shadow inset 0 0 6px rgba(0,0,0,.3)
  background-color #555
</style>