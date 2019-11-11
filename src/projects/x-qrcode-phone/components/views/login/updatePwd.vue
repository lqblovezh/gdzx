<script>
import Head from './head'
import Schema from 'validate'
import { setPwd } from 'services/common/user'

const newPassRule = {
	new_pass: {
		required: true,
		match: /^[A-Za-z0-9_@]{6,16}$/,
		message: {
			required: '请输入新密码',
			match: '新密码应当是6-16个字符',
		}
	}
}
export default {
	data() {
		return {
			info: {
				old_pass: '',
				new_pass: '',
				new_pass_confirm: '',
				code_val: ''
			}
		}
	},
	components: {
		Head
	},
	methods: {
		go() {
			this.userInfo ? this.$router.go(-1) : this.$router.replace({path: 'login'})
		},
		back() {
			this.userInfo ? this.$router.go(-1) : this.$router.replace({path: 'forgetPwd'})
		},
		validateMyForm(flag) {
			let validateReg = new Schema(Object.assign({}, newPassRule))
			const errors = validateReg.validate({
				old_pass: this.info.old_pass,
				new_pass: this.info.new_pass
			})
			if(!this.$check_form(errors)) {
				return
			}
			if (this.info.new_pass !== this.info.new_pass_confirm) {
				this.$dialog.toast({
					mes: '请确认新密码一致',
					timeout: 1500,
					icon:'error'
				})
				return false
			}
			return true
		},
		setPwd () {
			if (this.validateMyForm()) {
				setPwd({
					user_id: this.$route.query.uid,
					pass: this.info.new_pass,
					pass_confirm: this.info.new_pass_confirm,
					code_val: this.info.code_val
				}).then(res => {
					this.$dialog.toast({
						mes: res.message || '重置密码成功',
						timeout: 1500,
						icon: 'success'
					})
					this.$router.push({path: '/login'})
				}).catch(this.$toast_err)
			}
		}
	}
}
</script>
<template lang="pug">
.pt88-static__vh.c-bg-f
	Head(text="修改密码")
	.img-panel.tc
		.img-login_bg
	.p15rem.f-top
		.control-title 修改密码
		form
			.form-control(v-if="!userInfo")
				span.icon-code
				input(type="text" v-model="info.code_val" placeholder="请输入短信验证码")
			.form-control
				span.icon-lock
				input(type="password" v-model="info.new_pass" placeholder="请输入新密码")
			.form-control
				span.icon-lock
				input(type="password" v-model="info.new_pass_confirm" placeholder="确认密码")
		button.btn-pwd.btn-large(@click="setPwd") 确定
</template>
<style lang="stylus" scoped>
.f-top
	margin-top 1rem
</style>