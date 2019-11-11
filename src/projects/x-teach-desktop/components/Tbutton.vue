<script>
export default {
  props: {
    type: {
      default: 'primary',
    },
    icon: {
      default: '',
    },
    round: {
      default: true,
    },
    pointer: {
      default: true,
    },
    size: {
      default: 'middle', // big
    },
  },
  data() {
    return {
      data: {
        primary_plain: {
          c_theme: true,
        },
        primary: {
          c_f: true,
          c_theme_bg: true,
          bd_theme: true,
        },
        og_plain: {
          c_og: true,
        },
        b7_plain: {
          c_b7: true,
        },
        og: {
          c_f: true,
          c_og_bg: true,
          bd_og: true,
        },
        del: {
          c_f: true,
        },
        default: {
          c_f: true,
        }
      },
    }
  },
  computed: {
    btnClass() {
      const common = {
        pointer: this.pointer,
        [this.size]: true,
      }
      return { ...this.data[this.type], ...common }
    },
  },
}
</script>


<template lang="pug">
  .comp-btn(:class="btnClass") 
    .wrap
      span.icon(v-if="icon" :class="`icon-${icon}`")
      span.ib.vm(v-if="$slots.default") 
        slot

</template>
<style lang="stylus">
.bd_og
  border-color #ffa800
.bd_theme
  border-color $main-color
.search-btn
  width 52px
  height 34px
  line-height 30px
  box-sizing border-box
.comp-btn
  display inline-block
  border-radius 4px
  border-width 1px
  border-style solid
  vertical-align middle
  text-align center
  box-sizing border-box
  &.big
    padding 20px
  &.middle
    height 42px
    line-height 37px
    padding 0 20px
    font-size 18px
  &.default
    height 32px
    line-height 28px
    font-size 14px
    padding 0 10px
  &.small
    font-size 14px
    height 26px
    line-height 22px
    padding 0px 5px
  &.pointer
    cursor pointer
  >.wrap
    >div, span
      &:nth-child(2)
        padding-left 10px
</style>
