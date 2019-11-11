<script>
export default {
  props: {
    num: {
      type: Number,
      default: 10,
    },
    showScore: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    scoreList () {
      let i = 1
      let state
      const stateArr = []
      do {
        if (this.num >= 2 * i ) {
          state = 2
        } else if (this.num == 2 * i - 1) {
          state = 1
        } else {
          state = 0
        }
        stateArr.push({
          state
        })
        i++
      } while (i <= 5)
      return stateArr
    },
  },
}
</script>

<template lang="pug">
  .ev-star
    .ls 
      .item.icon-star_empty(
        v-for="i in scoreList"
        :class="{'icon-star_half': i.state == 1, 'icon-star_full': i.state == 2}"
      )
    span.label(v-if="showScore") {{ (num/2).toFixed(1) }}
</template>

<style lang="stylus">
  .ev-star
    display inline-flex
    align-items center
    .ls
      display inline-flex
      align-items center
      .item
        width 0.18rem
        height 0.18rem
        margin-right 0.05rem
</style>
