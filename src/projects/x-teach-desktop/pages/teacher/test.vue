<script>
export default {
  watch: {
    $route: function(to, from) {
      console.log('dsa')
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
  },
}
</script>


<template lang="pug">
  .teacher-test teacher-test 
</template>


<style lang="stylus">
.teacher-test
  min-height 1500px
  background #333
</style>
