<script>
import Schema from 'validate'
import { code } from '@/mixins'

const phoneInfo = new Schema({
  phone: {
    type: Number,
    length: 11,
    message: {
      type: '手机号码格式不正确',
      length: '手机号码长度应为11位',
    },
  },
})
const validateRegForm = new Schema({
  name: {
    required: true,
    type: String,
    length: { min: 4, max: 16 },
    message: {
      required: '请输入用户名',
      type: '用户名只能是字符以及数字',
      length: '用户名长度应在4-16之间',
    },
  },
  pass: {
    required: true,
    type: String,
    length: { min: 6, max: 16 },
    match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,16}$/,
    message: {
      required: '请输入密码',
      length: '密码位数在6-16位之间',
      match: '大写字母+小写字母+数字的混合密码，密码位数不少于6位',
    },
  },
  phone: {
    required: true,
    type: String,
    length: 11,
    message: {
      required: '请输入手机号',
      type: '手机号码格式不正确',
      length: '手机号码长度应为11位',
    },
  },
  code_val: {
    required: true,
    type: String,
    length: 6,
    message: {
      required: '请输入验证码',
      type: '验证码格式不正确',
      length: '验证码长度不正确',
    },
  },
  code_id: {
    required: true,
    type: String,
  },
})
export default {
  mixins: [code],
  data() {
    return {
      info: {
        name: null,
        pass: null,
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
    backToLogin() {
      this.$router.replace({ path: 'login' })
    },
    regUser() {
      const errors = validateRegForm.validate(this.info)
      if (errors.length > 0) {
        this.$Toast({
          message: errors[0].toString().replace('Error: ', ''),
        })
        return
      }
      this.$service.user
        .userReg(this.info)
        .then(res => {
          this.$Toast('注册成功')
          this.backToLogin()
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
v-wrapper(title="注册" :main-type="1")
	.register.mi-container
		.bg_box.text-center
			.login_bg
			img.logo_title(src="../../../assets/img/login_logo@2x.png")
		.container
			form.user-form
				.form-control
					span.icon-user
					input(type="text" v-model="info.name" placeholder="请输入用户名")
				.form-control
					span.icon-key
					input(type="password" v-model="info.pass" placeholder="请输入密码")
				.form-control
					span.icon-phone
					input(type="text" v-model="info.phone" placeholder="请输入手机号码")
				.form-control
					span.icon-envelope_s
					input(type="text" v-model="img_code_val" placeholder="请输入图片验证码")
					img.form-align--center(:src="img_code.code_img" @click="getImgCode")
				.form-control.clearfix
					span.icon-code
					input(type="text" v-model="info.code_val" placeholder="请输入短信验证码")
					.btn-send.form-align--center(@click="sendCheckCode") {{code_tip}}
			button.btn-large(@click="regUser") 注册
			p.tip 用户注册即代表同意
				span 《服务条款》
				|和
				span 《隐私政策》
</template>
<style lang="stylus">
@import '~@/assets/css/var.styl'

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
.register
  .register-title
    font-size 20px
  form
    padding-bottom 0.5rem
  .tip
    margin-top 0.3rem
    font-size 14px
    color #ccc
    span
      color #3496e1
</style>
