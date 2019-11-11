<script>
export default {}
</script>
<template lang="pug">
.comp-learn-header.tc.f20.c_f 《中国强大的真正希望》第2集 浙江大学
  button.fl.f14(@click="$back()")
    span.ib.icon-arrow-left
    |返回课程
</template>
<style lang="stylus">
.comp-learn-header
  position fixed
  width 100%
  height 60px
  line-height 60px
  button
    margin-left 20px
    margin-top 15px
    width 100px
    height 30px
    line-height 1
    background-color transparent
    color #b7b7b7
    border-radius 4px
    border 1px solid #666666
    span
      margin-right 10px
</style>