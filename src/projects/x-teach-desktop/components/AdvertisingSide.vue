<script>
export default {
  props: {
    imgUrl: {},
    url: {},
  },
  data() {
    return {
      isClose: false,
    }
  },
  methods: {
    close() {
      this.isClose = true
    },
  },
}
</script>


<template lang="pug">
  .comp-adv-side(v-if="!isClose") 
    .wrap.f0
      //- .icon.icon-advertising
      .ib.img
        a.ib(target="_blank" :href="url")
          img(:src="imgUrl", alt="alt")
        .icon.icon-close(@click.stop="close")
</template>


<style lang="stylus">
.comp-adv-side
  >.wrap
    position relative
    >.img
      position relative
      >a
        width 248px
        height 415px
        overflow hidden
        img
          height 100%
      >.icon
        position absolute
        background-color rgba(0, 0, 0, 0.1)
        right 0
        &.icon-advertising
          bottom 0
</style>
