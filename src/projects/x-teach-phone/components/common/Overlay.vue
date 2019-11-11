<template lang="pug">
  transition(name="fade-in")
    .ev-overlay(v-show="value" @click.stop="hide" :style="defStyle")
      transition(:name="transition")
        slot(v-show="value")
</template>
<script>
export default {
  name: 'ev-overlay',
  props: {
    value: Boolean,
    allowClickHide: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'scale'
    },
    defStyle: {}
  },
  methods: {
    hide () {
      if (this.allowClickHide) {
        this.$emit('input', false)
        this.$emit('change')
      }
    }
  }
}
</script>
<style lang="stylus">
  .fade-in-enter, .fade-in-leave-to
    opacity 0
  .fade-in-enter-active, .fade-in-leave-active
    transition opacity .3s cubic-bezier(.32,.12,.52,.76)
  .ev-overlay
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(0, 0, 0, .6)
    z-index 999
</style>