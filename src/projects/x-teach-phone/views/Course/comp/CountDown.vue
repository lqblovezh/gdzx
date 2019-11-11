<template lang="pug">
.count-down.f13 剩余时间：{{lave_time|format}}
</template>
<script>
export default {
  props: {
    time: {
      default: 0
    }
  },
  data () {
    return {
      lave_time: 0
    }
  },
  filters: {
    format(value) {
      const second = value % 60
      let minute = Math.floor(value / 60)
      const hour = Math.floor(minute / 60)
      minute = hour > 0 ? minute%60:minute
      return `${hour}时${minute}分${second}秒`
    }
  },
  watch: {
    time(newVal) {
      if (newVal > 0) {
        this.lave_time = newVal
        this.countDown()
      }
    }
  },
  methods: {
    countDown() {
      setTimeout(() => {
        this.lave_time--
        this.lave_time === 0 ? this.$emit('end') : this.countDown()
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.count-down
  height 0.54rem
  line-height 0.54rem
  color #ff9933
  padding-left 0.35rem
  background-color #fdfdc8
</style>