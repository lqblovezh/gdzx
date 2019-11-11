<script>
import Head from './head'
import Schema from 'validate'
import {code} from '@/util/mixins'
import { phoneLogin } from 'services/common/user'

export default {
	mixins: [code],
	data() {
		return {
			info: {
				phone: null,
				code_id: null,
				code_val: null
			},
		}
	},
	components: {
		Head
	},
	mounted() {
		this.getImgCode()
	},
	methods: {
		...mapMutations('user', ['setUserInfo']),
		backToLogin() {
			this.$router.replace({path: 'login'})
		},
		login() {
			phoneLogin({...this.info}).then(res => {
				this.$dialog.toast({
					mes: '登陆成功',
					timeout: 1500,
					icon: 'success'
				})
				this.$router.push({path: '/'})
			}) .catch(this.$toast_err)
		}
		
	}
}
</script>
<template lang="pug">
.pt88-static__vh.c-bg-f
	Head(text="短信验证码登录")
	.p15rem
		.img-panel.text-center
			.img-login_bg
		form
			.form-control
				span.icon-phone
				input(type="text" v-model="info.phone" placeholder="请输入手机号")
			.form-control
				span.icon-envelope
				input(type="text" v-model="img_code_val" placeholder="请输入图片验证码")
				img(:src="img_code.code_img" @click="getImgCode")
			.form-control
				span.icon-lock
				input(type="text" v-model="info.code_val" placeholder="请输入短信验证码")
				span.btn-send(@click="sendCheckCode") 获取验证码
		button.btn-large(@click.prevent="login") 登录
</template>
<style lang="stylus" scoped>
.info-menu
	color #333
button
	margin-top 1rem
</style>