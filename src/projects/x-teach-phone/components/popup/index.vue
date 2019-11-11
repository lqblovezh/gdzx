<script>
export default {
  data () {
    return {
      showPopup: false
    }
  },
  methods: {
    show () {
      this.showPopup = true
    },
    hideDialog () {
      this.showPopup = false
    }
  },
  directives: {
    toggleDialog: {
      bind: function (el, binding) {
        function clickHandler (e) {
          if (el.contains(e.target) || e.target.classList.contains('showMore')) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = clickHandler
        document.addEventListener('click', clickHandler)
      },
      unbind: function (el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  }
}
</script>
<template lang="pug">
.popup(v-show="showPopup")
  .popup-container(v-toggleDialog="hideDialog")
    p.container.popup-title 可用优惠券
    .popup-content
      slot
    p.btn-confirm.text-center
      button(@click="hideDialog") 确定
</template>
<style lang="stylus" scoped>
.popup
  position fixed
  width 100%
  height 100%
  bottom 0
  left 0
  background-color rgba(0,0,0,.5)
  z-index 10
  .popup-title
    margin-top 0.31rem
    font-size 15px
    color #333
    background-color #FFF
  .popup-container
    position absolute
    width 100%
    height 4.41rem
    bottom 0
    background-color #FFF
  .popup-content
    position absolute
    top 0.7rem
    left 0
    bottom 1rem
    min-height 1.8rem
    width 100%
    overflow-x auto
  .btn-confirm
    position absolute
    padding 0.2rem 0
    bottom 0
    width 100%
    border-top 1px solid #e9eef0
    background-color #FFF
    z-index 11
    button
      width 2.8rem
      height 0.6rem
      font-size 16px
      border none
      outline none
      color #3496e1
      background-color #FFF
</style>