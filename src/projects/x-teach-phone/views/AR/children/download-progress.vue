<template lang="pug">
.download-progress
  svg.progress(viewBox="0 0 100 100")
    path(d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke="#e6e9f2" stroke-width="4.8" fill="none" style="stroke-dasharray:295.31px, 295.31px; stroke-dashoffset:0px")
    path(d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke="#20a0ff" fill="none" stroke-linecap="round" stroke-width="4.8" :style="circlePathStyle")
  .text {{percent}}%
  p.dec 下载中，请勿离开此页面
</template>
<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100,
    },
    width: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      // 本是需要计算的值，现在直接声明了一个值
      // 如果需要拓展，就计算一下
      // value = 2 * Math.PI * this.radius
      perimeter: 295.31,
    }
  },
  computed: {
    circlePathStyle() {
      return {
        strokeDasharray: `${this.perimeter * (this.percent / 100)}px, ${
          this.perimeter
        }px`,
        strokeDashoffset: '0px',
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s',
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
.download-progress
  position relative
  color #fff
  .progress
    width 2rem
    height 2rem
  .text
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    margin-top -10px
    font-size 18px
    color #fff
  .dec
    margin-top 10px
    white-space nowrap
</style>
