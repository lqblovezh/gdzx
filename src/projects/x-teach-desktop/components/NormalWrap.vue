<script>
export default {
  props:['cname']
}
</script>


<template lang="pug">
  .normal-wrap
    Top(:cname="cname")
    .normal-container-wrap.c_f5_bg
      slot
    MainFooter
</template>


<style lang="stylus">
.router-normal-wrap
  >.normal-container-wrap
    min-height 500px
</style>
