<script>
import Head from './head'
import {code} from '@/util/mixins'
import { backPwdCode } from 'services/common/user'
export default {
	mixins: [code],
	data() {
		return {
			phone_tip: '发送验证码',
			info: {
				user_name: null,
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
		sendPhoneInfo () {
			if (!this.info.user_name || !this.img_code_val) {
				this.$dialog.toast({
					mes: '请填写用户名以及验证码',
					timeout: 1500,
					icon: 'error'
				})
				return
			}
			backPwdCode({
				user_name: this.info.user_name,
				code_id: this.img_code.code_id,
				code_val: this.img_code_val
			}).then(res => {
				this.$router.replace({path: 'update-pwd', query: {uid: res.data.user_id}})
			}).catch(e => {
				this.$toast_err(e)
			})
		}
	}
}
</script>
<template lang="pug">
.forgetPwd.pt88-static__vh.c-bg-f
	Head(text="忘记密码")
	.img-panel.tc
		.img-login_bg
	.p15rem.fp-body
		.control-title 忘记密码
		form
			.form-control
				span.icon-phone
				input(type="text" v-model="info.user_name" placeholder="请输入用户名")
			.form-control
				span.icon-envelope
				input(type="text" v-model="img_code_val" placeholder="请输入图片验证码")
				img(:src="img_code.code_img" @click="getImgCode")
			button.btn-large.btn-pwd(@click.prevent="sendPhoneInfo") 重置密码
</template>
<style lang="stylus" scoped>
button
	margin-top 0.9rem
.fp-body
	margin-top 1rem
</style>
