<script>
export default {
  name: 'xt-slider',
  props: ['formatTooltip', 'value'],
  data () {
    return {
      drag: false,
      defaultVal: 0,
      x0: 0,
      len: 0
    }
  },
  mounted () {
    this.len = this.$refs.progress.offsetWidth
  },
  methods: {
    startmove (evt) {
      this.drag = true
      this.x0 = evt.touches[0].clientX
      this.defaultVal = this.value
    },
    move (evt) {
      if (!this.drag) {
        return
      }
      const x1 = evt.touches[0].clientX
      let num = ((x1-this.x0)/this.len*100).toFixed(2)
      this.updateProgress(num)
    },
    endmove () {
      this.drag = false
    },
    updateProgress (data) {
      data = parseFloat(data) + parseFloat(this.defaultVal)
      if (data >= 100) {
        data = 100
      }
      if (data <= 0) {
        data = 0
      }
      this.$emit('input', parseFloat(data.toFixed(2)))
    }
  }
}
</script>
<template lang="pug">
.xt-slider
  .xt-slider__progress(ref="progress")
    .xt-slider__progress-inner(:style="{width: value+'%'}")
      .xt-slider__block(@touchstart="startmove" @touchmove="move" @touchend="endmove")
  .xt-slider__tip(v-if="formatTooltip") {{formatTooltip}}
</template>
<style lang="stylus" scoped>
.xt-slider
  .xt-slider__progress
    height 0.06rem
    background-color #c9d2d9
    .xt-slider__progress-inner
      position relative
      height 100%
      width 0%
      background-color #3496e1
      transition all ease-in
      .xt-slider__block
        position absolute
        width 0.2rem
        height 0.2rem
        top -0.08rem
        right -0.11rem
        border 0.04rem solid #3496e1
        border-radius 100%
        background-color #FFF
</style>
