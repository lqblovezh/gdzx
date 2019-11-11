<script>
import { mapState } from 'vuex'
export default {}
</script>
<template lang="pug">
.pt88-layer__fixed
  //- .loading-container
  //-   span
  //-   span
  //-   span
  //-   span
  //-   span
  .loading
</template>
<style lang="stylus" scoped>
.pt88-layer__fixed
  display flex
  align-items center
  justify-content center
  background-color rgba(255,255,255,.1)
  .loading-container
    span
      display inline-block
      margin 0 0.1rem
      height 1rem
      width 0.15rem
      background-color #FFF
      border-radius 999px
      animation stretchdelay 1.2s infinite ease-in-out
      &:nth-of-type(2)
        animation-delay -1.1s
      &:nth-of-type(3)
        animation-delay -1.0s
      &:nth-of-type(4)
        animation-delay -0.9s
      &:nth-of-type(5)
        animation-delay -0.8s
@keyframes stretchdelay
  0%, 40%, 100%
    transform scaleY(0.4)
  20%
    transform scaleY(1.0)
</style>