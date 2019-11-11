<script>
import Head from './head.vue'
import Schema from 'validate'
import urlJoin from 'url-join'

import config from 'services/config'
import { userLogin } from 'services/common/user'
import {thirdLogin} from "services/common/member"

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
			},
			back: false,
			showLoading: false
		}
	},
	components: {
		Head,
	},
	async mounted() {
		const obj = this.$route.query
		if (obj.token_id) {
			window.sessionStorage.setItem('token', obj.token_id)
			window.localStorage.setItem('token', obj.token_id)
			config.token = obj.token_id
			let redirect = obj.redirect
			if (false) {
				let root =
					process.env.NODE_ENV === 'development' ? '' : restUrl + '/h5/index#/'
				location.href = root + redirect
			} else {
				this.$router.push({path: '/'})
			}
		}
	},
	methods: {
		go(name) {
			this.$router.replace({ path: name })
		},
		login() {
			this.showLoading = true
			const errors = user.validate(this.loginInfo)
			if (!this.$check_form(errors)) {
				return
			}
			userLogin(this.loginInfo)
				.then(res => {
					this.$router.push({ path: '/'})
				})
				.catch(err => {
					const {
						errors,
						message
					} = err.payload
					this.$dialog.toast({
						mes: errors[0] || message || '登录失败，用户名或密码错误！',
						timeout: 1500,
						icon: 'error'
					})
				})
		},
		sendThirdRequest(type) {
			thirdLogin({
				back_url: window.location.href,
				type,
			}).then(res => {
				window.location.href = res.data.login_link
			})
		},
	},
}
</script>
<template lang="pug">
.login.pt88-static__vh.c-bg-f
	Head(text="登录" :need-back="back")
	.img-panel.tc
		.img-login_bg
	.p15rem
		form
			.form-control
				span.icon-user
				input(type="text" v-model="loginInfo.user_name" placeholder="请输入用户名")
			.form-control
				span.icon-lock
				input(type="password" v-model="loginInfo.user_pass" placeholder="请输入密码")
		.login-phone
			p(@click="go('phone-login')") 短信验证码登录
			p(@click="go('forget-pwd')") 忘记密码？
		button.btn-login.flex-center(@click="login" type="button")
			.ib(v-show="showLoading")
				mt-spinner(type="fading-circle")
			span 登录
		p.text-center.reg-text(@click="go('register')") 注册账号
		.login-methods
			p.login-methods__title.text-center 第三方账号登录
			.login-methods__items
				.icon-weixin(@click="sendThirdRequest('weixin_mp')")
				.icon-qq(@click="sendThirdRequest('qq_web')")
</template>
<style lang="stylus" scoped>
.login
	text-align center
	z-index 100
	form
		padding-top 0.2rem
	.login-phone
		display flex
		justify-content space-between
		align-items center
		color #999999
		font-size 14px
	.reg-text
		margin-top 0.51rem
		color #3496e1
	.login-methods
		padding-bottom 0.5rem
		margin-top 0
		color #ccc
		.login-methods__title
			position relative
			margin-top 0.4rem
			margin-bottom 0.5rem
			&:before
				position absolute
				content ''
				left 0
				top 0.12rem
				background-color #ccc
				height 1px
				width 1.8rem
			&:after
				position absolute
				content ''
				right 0
				top 0.12rem
				background-color #ccc
				height 1px
				width 1.8rem
		.login-methods__items
			display flex
			justify-content center
			div
				&:not(:last-child)
					margin-right 0.5rem
	.btn-login
		margin-top 1.2rem
</style>
