<template lang="pug">
.course-intro {{ abs }}
</template>
<script>
export default {
  props: {
    abs: String
  }
}
</script>
<style lang="stylus" scoped>
.course-intro
  padding 0.3rem
  font-size 14px
  line-height 1.5
  color #333
</style>