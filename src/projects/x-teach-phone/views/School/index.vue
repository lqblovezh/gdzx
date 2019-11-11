<template lang="pug">
  .school
    //- school-search(show-back)
    .school-container.full-top
      router-view
</template>
<script>
import SchoolSearch from './children/school-search'
export default {
  components: { SchoolSearch }
}
</script>
<style lang="stylus">
.school
  background-color #f4f5f7
  .school-list
    padding 0 0.3rem
    overflow hidden
</style>