<template lang="pug">
v-wrapper(
  title="编辑收货地址"
  class="edit-address"
  :main-type="1"
  @back="$emit('hide-panel')"
)
  template(#right)
    span.c-f(@click="$emit('hide-panel')") 取消
  .edit-address-content
    .edit-address-info.c-bg-f
      .info-field
        label 收货人
        input(type="text" v-model="info.user_name" placeholder="请输入收货人姓名")
      .info-field
        label 手机号码
        input(type="text" v-model="info.phone" placeholder="请输入收货人电话")
      .info-field
        label 所在地区
        .info-field-text.fr(@click="showCascadePicker")
          input(type="text" v-model="info.region" placeholder="请选择区域" disabled)
          span.i-enter
      .info-field
        label 详细地址
        textarea(placeholder="请输入详细地址信息" v-model="info.address")
    .container
      button.c-bg-theme.c-f.btn-submit(@click="submit") 确定
</template>
<script>
import { regionData } from 'element-china-area-data'
export default {
  props: {
    selectItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      info: {
        user_name: '',
        phone: '',
        region: '',
        address: ''
      },
      cascadePicker: null
    }
  },
  mounted () {
    this.cascadePicker = this.$createCascadePicker({
      title: '选择区域',
      data: regionData,
      selectedIndex: [0,1,0],
      alias: {
        text: 'label'
      },
      onSelect: this.selectHandler
    })
  },
  methods: {
    showCascadePicker() {
      this.cascadePicker.show()
    },
    selectHandler (val, index, text) {
      this.info.region = text.join('-')
    },
    async submit() {
      let status, msg
      try {
        const res = await this.$service.intearal.exchange({
          type: 'books',
          id: this.selectItem.id,
          books_id: this.selectItem.id,
          ...this.info
        })
        status = true
        msg = '兑换成功'
      } catch(e) {
        msg = this.$catchError(e, false)
        status = false
      } finally {
        console.log(msg)
        this.$emit('confirm-handler', { status, msg })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
@import "~@/assets/css/mixin.styl";
.edit-address
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 10
  background-color #fff
  >>> section
    z-index 11
  &-content
    background-color $bg-color-default
  &-info
    padding $layout-padding
    .info-field
      padding 0.35rem 0 0.37rem
      font-size 15px
      label
        display inline-block
        color #222
        width 20%
        margin-right 5%
        text-align-last justify
      &-text, input, textarea
        color #000
        width 75%
      &-text
        position relative
        input
          width 100%
          background-color transparent
          &::webkit-input-placeholder
            color #888888
        span
          position absolute
          top 50%
          right 0
          margin-top -0.13rem
      textarea
        border-width 0
        outline none
        box-sizing border-box
      &:not(:last-child)
        border-bottom 1px solid #dfe6eb
  .btn-submit
    margin-top 1rem
    width 100%
    padding 0.24rem 0
    border-radius 0.1rem
</style>