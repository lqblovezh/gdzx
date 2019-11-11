<script>
import LearnHeader from './comp/LearnHeader'
import LearnList from './comp/LearnList'
import LearnBody from './comp/Learn'
export default {
  components: {
    LearnHeader,
    LearnList,
    LearnBody
  }
}
</script>
<template lang="pug">
.page-learn.c_3_bg
  LearnHeader
  .learn-body
    LearnList
    LearnBody
</template>
<style lang="stylus">
.learn-body
  // position fixed
  // top 60px
  // left 0
  // bottom 0
  // right 0
  padding-top 60px
  height 100vh
  box-sizing border-box
  overflow hidden
  p
    margin 0
</style>