<script>
export default {
  data() {
    return {
      toTopShow: false,
      scrollTop: null,
      timer: null,
      clientWidth: null,
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('scroll', this.handleScroll, false)
    })
    window.onresize = () => {
      return (() => {
        this.clientWidth =
          document.documentElement.clientWidth || document.body.clientWidth
      })()
    }
    this.$nextTick(() => {
      this.clientWidth =
        (document.documentElement.clientWidth || document.body.clientWidth) - 17
    })
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (this.scrollTop > 230) {
        this.toTopShow = true
      } else {
        this.toTopShow = false
      }
    },
    scroll(e) {
      const currentY =
        document.documentElement.scrollTop || document.body.scrollTop
      this.scrollToTop(currentY, e)
    },
    scrollToTop(currentY, targetY) {
      let el = document.documentElement || document.body
      let needScrollTop = targetY - currentY
      let _currentY = currentY
      this.timer = setTimeout(() => {
        const dist = Math.ceil(needScrollTop / 10)
        _currentY += dist
        el.scrollTop = currentY
        if (needScrollTop > 10 || needScrollTop < -10) {
          this.scrollToTop(_currentY, targetY)
        } else {
          el.scrollTop = currentY
        }
      }, 1)
    },
  },
  computed: {
    setLeft() {
      let left = (this.clientWidth - 1200) / 2 + 1200
      return left + 'px'
    },
  },
}
</script>

<template lang="pug">
transition(name="el-fade-in")
  .page-component-up(@click="scroll(0)" v-show='toTopShow' :style="{left:setLeft}")
    .icon.icon-topBtn
</template>

<style lang="stylus" scoped>
.page-component-up
  position fixed
  // right 100px
  bottom 60px
  cursor pointer
  z-index 9999
</style>
