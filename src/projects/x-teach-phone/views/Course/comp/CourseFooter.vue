<template lang="pug">
  footer.tc.f15(:class="{spec: whichType}")
    .footer-item(
      v-for="item, index in list"
      :key="index"
      :class="item.type"
      @click="clickHandler(item.action)"
    )
      i(
        :class="'i-'+item.icon"
        v-show="item.icon"
      )
      p {{ item.label }}
</template>
<script>
export default {
  props: {
    whichType: Boolean
  },
  computed: {
    list () {
      return this.whichType ? [
        { action: 'discuss', icon: 'discuss', label: '学习讨论'},
        { action: 'answer', icon: 'answer', label: '教师答疑'},
        { action: 'online-exam', icon: 'exam', label: '在线测试'}
      ] : [
        { action: 'cart', type: 'theme', label: '加入购物车'},
        { action: 'order', label: '立即购买'}
      ]
    }
  },
  methods: {
    clickHandler (type) {
      switch(type) {
        case 'discuss':
        case 'answer':
        case 'online-exam':
          this.$router.push({ path: type })
          break
        case 'cart':
          this.addToCart()
        case 'order':
          this.$emit('createOrder')
          break
        default:
      }
    },
    addToCart () {
      if (this.$checkLogin) {
        this.$emit('addToShopCar')
      }
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  footer
    display flex
    position fixed
    bottom 0
    height $footer-height
    width 100%
    box-shadow 0 0 0.04rem rgba(0, 0, 0, .2)
    background-color $color-white
    &.spec
      .footer-item
        position relative
        line-height normal
        &:not(:last-child)
          &::after
            content ''
            position absolute
            right 0
            top 0.3rem
            height 0.4rem
            width 0.04rem
            background-color #f2f4f5
    .footer-item
      flex 1
      overflow hidden
      line-height $footer-height
      &.theme
        color $color-white
        background-color $theme-color
      i
        margin 0.1rem 0
</style>
