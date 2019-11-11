<template lang="pug">
  .index-grid-layout.clearfix.container
    slot
</template>
<script>
export default {
  name: 'layout-grid'
}
</script>
<style lang="stylus">
  .index-grid-layout
    margin-left 0.15rem
    margin-right 0.15rem
    > div
      float left
      margin-left 0.15rem
      margin-right 0.15rem
      width calc(50% - 0.3rem)
      box-sizing border-box
</style>