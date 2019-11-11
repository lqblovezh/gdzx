<script>
import Head from './head'
import Schema from 'validate'
import {code} from '@/util/mixins'
import { toast_err } from '@/util'
import { userReg } from 'services/common/user'
import { constants } from 'crypto';

const phoneInfo = new Schema({
	phone: {
		type: Number,
		length: 11,
		message: {
			type: "手机号码格式不正确",
			length: "手机号码长度应为11位"
		}
	}
})
const validateRegForm = new Schema({
	name: {
		required: true,
		type: String,
		length: {min: 4, max: 16},
		message: {
			required: '请输入用户名',
			type: '用户名只能是字符以及数字',
			length: '用户名长度应在4-16之间'
		}
	},
	pass: {
		required: true,
		type: String,
		length: {min: 6, max: 16},
		message: {
			required: '请输入密码',
			type: '密码只能是字符以及数字',
			length: '密码长度应在6-16之间'
		}
	},
	phone: {
		required: true,
		type: String,
		length: 11,
		message: {
			required: '请输入手机号',
			type: '手机号码格式不正确',
			length: '手机号码长度应为11位'
		}
	},
	code_val: {
		required: true,
		type: String,
		length: 6,
		message: {
			required: '请输入验证码',
			type: '验证码格式不正确',
			length: '验证码长度不正确'
		}
	},
	code_id: {
		required: true,
		type: String,
		message: {
			required: '缺失参数',
		}
	}	
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
				code_val: null
			}
		}
	},
	components: {
		Head,
	},
	mounted() {
		this.getImgCode()
	},
	methods: {
		backToLogin() {
			this.$router.replace({path: 'login'})
		},
		regUser() {
			console.log(this.info)
			console.log('this.info')
			const errors = validateRegForm.validate(this.info)
			if (!this.$check_form(errors)) {
				return
			}
			userReg(this.info).then(res => {
				this.$dialog.toast({
					mes: '注册成功',
					icon: 'success',
					timeout: 1500
				})

				this.backToLogin()
			}).catch(err => {
				this.$toast_err(err, '注册失败，请检查')
			})
		}
	}
}
</script>
<template lang="pug">
.register.pt88-static__vh.c-bg-f
	Head(text="注册")
	.img-panel.text-center
		.img-login_bg
	.p15rem
		form
			.form-control
				span.icon-user
				input(type="text" v-model="info.name" placeholder="请输入用户名")
			.form-control
				span.icon-lock
				input(type="password" v-model="info.pass" placeholder="请输入密码")
			.form-control
				span.icon-phone
				input(type="text" v-model="info.phone" placeholder="请输入手机号码")
			.form-control
				span.icon-envelope
				input(type="text" v-model="img_code_val" placeholder="请输入图片验证码")
				img(:src="img_code.code_img" @click="getImgCode")
			.form-control
				span.icon-code
				input(type="text" v-model="info.code_val" placeholder="请输入短信验证码")
				span.btn-send(@click="sendCheckCode") {{code_tip}}
		button.btn-large(@click="regUser") 注册
		p.tip 用户注册即代表同意
			span 《服务条款》
			|和
			span 《隐私政策》
</template>
<style lang="stylus">
.register
	.register-title
		font-size 20px
	form
		padding-bottom 1.2rem
	.tip
		margin-top 0.3rem
		font-size 14px
		color #ccc
		span
			color #3496e1
</style>
