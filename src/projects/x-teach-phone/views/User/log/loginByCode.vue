<script>
import { mapState, mapActions } from 'vuex'
import Schema from 'validate'
import { code } from '@/mixins'
import login from './login'

export default {
  mixins: [code, login],
  data() {
    return {
      info: {
        phone: null,
        code_id: null,
        code_val: null,
      },
    }
  },
  mounted() {
    this.getImgCode()
  },
  methods: {
    ...mapActions('user', ['queryUserInfo']),
    go(name) {
      this.$router.replace({ path: name })
    },
    backToLogin() {
      this.$router.replace({ path: 'login' })
    },
    login() {
      this.$service.user
        .phoneLogin({ ...this.info })
        .then(res => {
          this.queryUserInfo()
            .then(() => {
              this.$Toast('登陆成功')
            })
            .finally(() => {
              this.$router.go(-1)
            })
        })
        .catch(({ payload }) => {
          this.$Toast({
            message: payload.message,
          })
        })
    },
  },
}
</script>
<template lang="pug">
v-wrapper(title="短信验证码登录" class="login-by-code" :main-type="1")
	.mi-container
		.bg_box.text-center
			.login_bg
			img.logo_title(src="../../../assets/img/login_logo@2x.png")
		.container
			form.user-form
				.info-menu
					.info-item
						p 国家/地区
						p 中国 +86
							span.icon-small.icon-enter
				.form-control
					span.icon-phone
					input(type="text" v-model="info.phone" placeholder="请输入手机号")
				.form-control
					span.icon-envelope_s
					input(type="text" v-model="img_code_val" placeholder="请输入图片验证码")
					img.form-align--center(:src="img_code.code_img" @click="getImgCode")
				.form-control
					span.icon-key
					input(type="text" v-model="info.code_val" placeholder="请输入短信验证码")
					.form-align--center.btn-send(@click="sendCheckCode") 获取验证码
			.methods.c-9.clearfix.f14
				a.fl.code(@click="go('login')") 密码登录
			button.btn-large(@click.prevent="login") 登录
			.third-methods.text-center
				p.third-methods-title.f14 第三方账号登录
				.third-methods-items
					.icon-wx_login(@click="sendThirdRequest('weixin_mp')")
					.icon-qq_login(@click="sendThirdRequest('qq_web')")
</template>
<style lang="stylus" scoped>
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
>>>.user-form
  margin-top -0.2rem
.login-by-code
  background-color #fff
.info-menu
  color #333
button
  margin-top 0.2rem
.methods
  margin 0.3rem 0 0.3rem
  .code
    color #169bd5
  .forgetPass
    color red
.third-methods
  margin-top 0.3rem
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
