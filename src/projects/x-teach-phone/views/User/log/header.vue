<script>
export default {
  props: ['isSearch', 'privateStyle'],
  methods: {
    goSearch() {
      this.$router.push({path: 'search'})
    }
  },
  computed: {
    isShowSearch() {
      return this.isSearch ? true : false
    },
    isShowBack() {
      return this.hideBack ? false : true
    }
  }
}
</script>
<template lang="pug">
.default-header
  slot(name="left")
    span.icon-back
  slot(name="center")
  span.icon-search(@click="goSearch")
</template>
<style lang="stylus" scoped>
.default-header
  position fixed
  top 0
  width 100%
  height 0.88rem
  padding 0 0.2rem
  display flex
  justify-content space-between
  align-items center
  box-sizing border-box
  color #fff
  background-color #3496e1
  box-shadow 0 2px 3px rgba(0,0,0,.1)
  z-index 199
  span
    display inline-block
    &.placeholder
      width 0.36rem
</style>
