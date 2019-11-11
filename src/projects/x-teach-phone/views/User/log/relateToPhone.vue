<script>
import {validatePhone} from '@/utils/validate.js'
export default {
  data() {
    return {
      phoneInfo: {
        phone: '',
        code: ''
      }
    }
  },
  computed: {
    isEmpty() {
      return this.phoneInfo.phone == ''||this.phoneInfo.code == ''
    }
  },
  methods: {
    skip() {
      this.go('Login')
    },
    go(name) {
      this.$emit('changeCur', name)
    },
    sendCheckCode() {
      if (this.phone_tip != '发送验证码'||this.phoneInfo.phone == '') {
        return
      }
      const errors = validatePhone({phone: this.phoneInfo.phone})
      if (errors.length > 0) {
        this.$Toast({
          message: errors[0].toString().replace('Error: ', '')
        })
        return
      }
      let i = this.time
      const cutDown = () => {
        this.phone_tip = `${i}秒后再试`
        if (i-- > 0) {
          setTimeout(cutDown, 1000)
        } else {
          this.phone_tip = '发送验证码'
        }
      }
      cutDown()
    },
  }
}
</script>
<template lang="pug">
v-wrapper(title="绑定手机" class="relate-with-phone" :main-type="1")
  .mi-container
    .container
      .checkPhone-tips 温馨提示：为了保证你的账户安全，请关联手机、也可在个人中心操作
      form.user-form
        .form-control
          span.icon-phone
          input(type="text" v-model="phoneInfo.phone")
        .form-control
          span.icon-key
          input(type="text" v-model="phoneInfo.code")
          .form-align--center.btn-send 获取验证码
      button.btn-large(@click="skip" :class="{unclick: isEmpty}" :disabled="isEmpty") 绑定
</template>
<style lang="stylus">
.relate-with-phone
  background-color #fff
.checkPhone
  .checkPhone-tips
    margin-top 1.8rem
    line-height 20px
  form
    margin-top 1rem
</style>
