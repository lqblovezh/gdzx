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
  .comp-adv(v-if="!isClose") 
    .wrap.f0
      .icon.icon-close(@click="close")
      //- .icon.icon-advertising
      a.img.ib(target="_blank" :href="url")
        img(:src="imgUrl", alt="alt")
</template>


<style lang="stylus">
.comp-adv
  margin-top 20px
  margin-bottom 12px
  >.wrap
    position relative
    >.img
      width 100%
      height 110px
      overflow hidden
      >img
        width 100%
        height 100%
        object-fit cover
    >.icon
      position absolute
      right 0
      &.icon-close
        top 0px
        &:hover
          background-color none
      &.icon-advertising
        bottom 0
</style>
