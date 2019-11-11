<script>
export default {
  data () {
    return {
      isShow: false,
			code: ''
    }
  },
  methods: {
    toggleStatus() {
      this.isShow = !this.isShow
			this.code = ''
    },
    comfirm() {
      if (!this.code) {
        this.$Toast('请输入授权码')
        return
      }
			this.$emit('sendCode', this.code)
    }
  }
}
</script>
<template lang="pug">
.mask(v-show="isShow")
  .modal
    p
      span.icon-close__a(@click="toggleStatus")
    p 授权码
    p.modal-input
      input(type="text" placeholder="请输入授权码" v-model="code")
    p
      button(@click="comfirm") 确定
</template>
<style lang="stylus" scoped>
.mask
  position fixed
  top 0
  height 100%
  width 100%
  background-color rgba(0,0,0,.5)
  z-index 100
  .modal
    margin 0 auto
    margin-top 2.12rem
    width 6.5rem
    height 4.32rem
    background-color #FFF
    border-radius 3px
    padding 0.2rem
    p
      &:first-child
        text-align right
      &:nth-of-type(2)
        text-align center
        color #4d4d4d
        margin-bottom 1.02rem
      &:last-child
        margin-top 0.88rem
        text-align center
        button
          width 2.5rem
          height 0.6rem
          color #FFF
          border none
          outline none
          border-radius 5px
          background-color #3496e1
    .modal-input
      padding-left 0.3rem
      padding-right 0.3rem
      input
        width 100%
        height 0.8rem
        border none
        outline none
        color #999
        text-indent 0.1rem
        background-color #f0f0f0
        border-radius 5px
        font-size 16px
        letter-spacing 1px
</style>
