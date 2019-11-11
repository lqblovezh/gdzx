<script>
import { mapActions } from 'vuex'
import Schema from 'validate'
import urlJoin from 'url-join'
import { isEmptyObj } from '@/utils/algorithm'
import { thirdLoginAPP } from 'services/common/member'
import config from 'services/config'

const user = new Schema({
  user_name: {
    type: String,
    required: true,
    length: { min: 4, max: 16 },
    message: {
      type: '用户名格式不正确，请重新输入！',
      required: '用户名不能为空！',
      length: '用户名长度应在6-16之间',
    },
  },
  user_pass: {
    type: String,
    required: true,
    length: { min: 6, max: 16 },
    message: {
      type: '密码格式不正确，请重新输入！',
      required: '密码不能为空！',
      length: '密码长度应在6-16之间',
    },
  },
})

export default {
  data() {
    return {
      loginInfo: {
        user_name: null,
        user_pass: null,
        // user_name: 'user',
        // user_pass: '123456',
      },
    }
  },
  async mounted() {
    const obj = this.$route.query
    if (obj.token_id) {
      window.sessionStorage.setItem('token', obj.token_id)
      window.localStorage.setItem('token', obj.token_id)
      config.token = obj.token_id
      let redirect = obj.redirect
      if (redirect) {
        // this.$router.push(redirect) 无效
        let root =
          process.env.NODE_ENV === 'development' ? '' : restUrl + '/h5/index#'
        location.href = root + redirect
      } else {
        this.$go('home')
      }
    }
  },
  methods: {
    ...mapActions('user', ['queryUserInfo']),
    go(name) {
      this.$router.replace({ path: name })
    },
    login() {
      const errors = user.validate(this.loginInfo)
      if (errors.length > 0) {
        this.$Toast({
          message: errors[0].toString().replace('Error: ', ''),
        })
        return
      }
      const { redirect } = this.$route.query
      this.$service.user
        .userLogin(this.loginInfo)
        .then(res => {
          this.queryUserInfo().finally(() => {
            if (redirect) {
              this.$router.replace({ path: redirect })
            } else {
              this.$router.go(-1)
            }
          })
        })
        .catch(({ payload }) => {
          this.$Toast({
            message: payload.message,
          })
        })
    },
    sendThirdRequest(type) {
      let { origin, pathname } = location
      if (window.cordova) {
        this.$thirdLogin(type, args => {
          thirdLoginAPP({
            login_type: type == 'weixin_mp' ? 'weixin_app' : 'qq_app',
            ...args,
          })
            .then(res => {
              this.$Toast({
                message: '登录成功',
              })
              this.queryUserInfo()
              this.$go('user')
            })
            .catch(({ payload }) => {
              this.$Toast({
                message: payload.message,
              })
            })
        })
        return
      }
      this.$service.user
        .thirdLogin({
          back_url: origin + pathname,
          type,
        })
        .then(res => {
          window.location.href = res.data.login_link
        })
    },
  },
}
</script>
<template lang="pug">
v-wrapper(title="登录" :main-type="1")
  .login.mi-container
    .bg_box.text-center
      .login_bg
      img.logo_title(src="../../../assets/img/login_logo@2x.png")
    .container
      form.user-form
        .form-control
          span.icon-user
          input(type="text" v-model="loginInfo.user_name" placeholder="请输入用户名")
        .form-control
          span.icon-key
          input(type="password" v-model="loginInfo.user_pass" placeholder="请输入密码")
      .methods.c-9.clearfix.f14
        a.fl.code(@click="go('loginByCode')") 短信验证码登录
        a.fr.forgetPass(@click="go('forgetPwd')") 忘记密码？
      button.btn-login.btn-large(@click="login" type="button") 登录
      .reg-link
        button.btn-login.btn-large(@click="go('register')" type="button") 注册账号
      .reg-link.text-center
        //- buton.btn-login.btn-large(@click="go('register')" type="button") 注册账号
      .third-methods.text-center
        p.third-methods-title.f14 第三方账号登录
        .third-methods-items
          .icon-wx_login(@click="sendThirdRequest('weixin_mp')")
          .icon-qq_login(@click="sendThirdRequest('qq_web')")
</template>
<style lang="stylus">
@import '~@/assets/css/var.styl'

.login
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
  .user-form
    margin-top 0.1rem !important
  .methods
    margin 0.3rem 0 0.7rem
    .code
      color #169bd5
    .forgetPass
      color red
  .reg-link
    margin 0.2rem 0 0.6rem
  .third-methods-title
    position relative
    color #ccc
    &::before, &::after
      content ''
      position absolute
      top 50%
      margin-top -0.01rem
      height 0.02rem
      width 2.2rem
      background-color #CCC
    &::before
      left 0
    &::after
      right 0
  .third-methods-items
    margin-top 0.5rem
    > div
      margin 0 0.5rem
</style>
