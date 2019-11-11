<script>
import { mapState } from 'vuex'
import Schema from 'validate'
const oldPassRule = {
  old_pass: {
    required: true,
    match: /^[A-Za-z0-9_@]{6,16}$/,
    message: {
      required: '请输入旧密码',
      match: '旧密码应当是6-16个字符',
    },
  },
}
const newPassRule = {
  new_pass: {
    required: true,
    match: /^[A-Za-z0-9_@]{6,16}$/,
    message: {
      required: '请输入新密码',
      match: '新密码应当是6-16个字符',
    },
  },
}
const codeValRule = {}
export default {
  data() {
    return {
      info: {
        old_pass: '',
        new_pass: '',
        new_pass_confirm: '',
        code_val: '',
      },
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
  methods: {
    go() {
      this.userInfo
        ? this.$router.go(-1)
        : this.$router.replace({ path: 'login' })
    },
    back() {
      this.userInfo
        ? this.$router.go(-1)
        : this.$router.replace({ path: 'forgetPwd' })
    },
    validateMyForm(flag) {
      let validateReg =
        flag === 0
          ? new Schema(Object.assign({}, oldPassRule, newPassRule))
          : new Schema(Object.assign({}, newPassRule))
      const errors = validateReg.validate({
        old_pass: this.info.old_pass,
        new_pass: this.info.new_pass,
      })
      if (errors.length > 0) {
        this.$Toast({
          message: errors[0].toString().replace('Error: ', ''),
        })
        return false
      }
      if (this.info.new_pass !== this.info.new_pass_confirm) {
        log(this.info.new_pass, this.info.new_pass_confirm)
        this.$Toast('请确认新密码一致')
        return false
      }
      return true
    },
    checkPwd() {
      this.userInfo ? this.update() : this.setPwd()
    },
    update() {
      if (this.validateMyForm(0)) {
        this.$service.user
          .updatePwd({ ...this.info })
          .then(res => {
            this.$Toast({
              message: '修改成功',
              iconClass: 'icon-toast icon-success',
            })
            this.go()
          })
          .catch(this.errorHandler)
      }
    },
    setPwd() {
      if (this.validateMyForm(1)) {
        this.$service.user
          .setPwd({
            user_id: this.$route.query.uid,
            pass: this.info.new_pass,
            pass_confirm: this.info.new_pass_confirm,
            code_val: this.info.code_val,
          })
          .then(res => {
            this.$Toast('重置密码成功')
            console.log(111)
            this.go()
          })
          .catch(this.errorHandler)
      }
    },
    errorHandler(e) {
      this.$Toast({
        message: e.toString().split(':')[1],
        iconClass: 'icon-toast icon-failed',
      })
    },
  },
}
</script>
<template lang="pug">
v-wrapper(title="修改密码" class="update-pass" :main-type="1")
  .mi-container
    .wrapper
      .bg_box.text-center
        .login_bg
        img.logo_title(src="../../../assets/img/login_logo@2x.png")
      .container
        .title 修改密码
        form.user-form
          .form-control(v-if="userInfo")
            span.icon-key
            input(type="password" v-model="info.old_pass" placeholder="请输入旧密码")
          .form-control(v-if="!userInfo")
            span.icon-code
            input(type="text" v-model="info.code_val" placeholder="请输入短信验证码")
          .form-control
            span.icon-key
            input(type="password" v-model="info.new_pass" placeholder="请输入新密码")
          .form-control
            span.icon-key
            input(type="password" v-model="info.new_pass_confirm" placeholder="确认密码")
        button.btn-pwd.btn-large(@click="checkPwd") 确定
</template>
<style lang="stylus">
.bg_box
  margin-top 0.8rem
  position relative
  .login_bg
    width 100%
    height 3.3rem
    background url('../../../assets/img/login_bg_img@2x.png') no-repeat
    background-size 100% 100%
  .logo_title
    position absolute
    top 30%
    left 50%
    transform translate(-50%, -50%)
    width 50%
.update-pass
  .wrapper
    background-color #fff
    button
      margin-top 1rem
    .title
      margin-top 0.54rem
</style>
