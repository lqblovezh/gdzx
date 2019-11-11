<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题',
    },
    url: {
      type: String,
    },
    rightName: {
      type: String,
    },
    data: Object,
  },
  methods: {
    go() {
      if (this.url) {
        this.$go(this.url)
      }
    },
  },
  created() {
    console.log(this.$slots)
  },
}
</script>


<template lang="pug">
  .comp-homebox
    .wrap 
      .head.c_f5_bg
        .left.vertical-line.fl.ml10.f24
          span {{title}}
        slot.nav-btn(name="nav-btn")
        .right.f16.fr.cp.pr10.vm-all.c_theme(v-if="!rightName")
          .icon.icon-right-arrow.rotate180(@click="$emit('leftChlickHandler')")
          .icon.icon-right-arrow(@click="$emit('rightChlickHandler')")
        .right.f16.fr.cp.pr10.vm-all.c_theme(v-else @click="go") 
          span {{rightName}} 
          .icon.icon-more
      .slot  
        slot
</template>


<style lang="stylus">
.comp-homebox
  >.wrap
    width 100%
    // border solid 1px #e0e0e0
    >.head
      height 50px
      line-height 48px
      color #2d4148
      >.left
        min-width 95px
        text-indent 10px
      >.right
        >.icon
          margin-left 20px
          &.icon-more
            margin 0
    >.slot
      padding 10px 0px
      overflow hidden
</style>
