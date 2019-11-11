<script>
export default {
  props: {
    // ['hideBack', 'search', 'privateStyle']
    hideBack: {},
    type: {},
    privateStyle: {},
    isRewrite: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isShowSearch() {
      return this.isSearch ? true : false
    },
    isShowBack() {
      return this.hideBack ? false : true
    },
  },
  methods: {
    goBack() {
      let len = this.$store.state.historyRouteLength
      if (this.isRewrite) {
        this.$emit('back')
      } else {
        if (len < 2) {
          this.$go('/home')
          this.$store.state.historyRouteLength = 10000
        } else {
          this.$router.go(-1)
        }
        if (len > 2) {
          this.$store.state.historyRouteLength = len - 2
        }
      }
    },
    goSearch() {
      this.$router.push({ name: 'search' })
    },
    share() {},
  },
}
</script>
<template lang="pug">
.header(:style="privateStyle")
  .header-left
    slot(name="left")
      span.icon-go-back.icon-back(@click="goBack")
  .header-center.text-center
    slot
  .header-right.text-right
    slot(name="right")
      span.icon-share(@click="share" v-if="type==='share'")
      span.icon-search_h(v-else-if="type==='search'" @click="goSearch")
      span.placeholder(v-else)
</template>
<style lang="stylus" scoped>
.header
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
  box-shadow 0 2px 3px rgba(0, 0, 0, 0.1)
  z-index 9
  .header-left, .header-right
    width 0.7rem
  .header-center
    flex 1
  span
    display inline-block
    &.placeholder
      width 0.36rem
</style>
