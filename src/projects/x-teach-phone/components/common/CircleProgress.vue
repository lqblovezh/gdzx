<template>
<div class="circle-progress">
  <svg width="48" height="48">
    <circle r="12" cx="24" cy="24" fill="#d5e7f5" stroke="#3496e1" stroke-width="24" :stroke-dasharray="circle_percent"></circle>
    <circle r="21.5" cx="24" cy="24" fill="#f8f8f8"></circle>
  </svg>
  <span>{{percent}}</span>
</div>
</template>
<script>
export default {
  props: {
    percent: {
      required: true
    }
  },
  computed: {
    circle_percent () {
      let percent = parseFloat(this.percent)/100
      return [75*percent, 75]
    }
  }
}
</script>
<style lang="stylus" scpoped>
.circle-progress
  position relative
  display inline-block
  margin 0 3px
  svg
    transform rotate(-90deg)
    background #d5e7f5
    border-radius 50%
  span
    position absolute
    top 35%
    left 50%
    line-height 1
    transform translate(-50%, -50%)
</style>