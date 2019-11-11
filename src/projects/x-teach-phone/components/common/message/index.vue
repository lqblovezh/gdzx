<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('common', ['showHeadMsg'])
  }
}
</script>
<template lang="pug">
.header-msg.text-center
  p {{showHeadMsg.content}}
</template>
<style lang="stylus" scoped>
.header-msg
  position fixed
  top 10px
  width 95%
  left 2.5%
  color #FFF
  background-color rgba(50, 152, 225, .98)
  box-shadow 0 1px 1px #ccc
  border-radius 5px
  z-index 10
  p
    margin 20px 0
</style>
