<script>
import {
  main
} from '@/util/mixins'
import * as userServices from 'services/x-teach/signin'
import * as dbiServices from 'services/x-read/dbi'
import { mapMutations, mapState } from 'vuex'
// import * as commonServices from 'services/common/member'

export default {
	created() {
    this.init()
  },
  mixins: [main],
  data() {
    return {
			user: {
				phone: '',
				pass: '', //密码
				code_id: '',
				code_val: '', //验证码内容
				code_val_img: '', //
				name:"",
			},
			valiCode: null, //验证码图片
			openCount: false,
			phoneCount: 60,
    }
  },
  methods: {
		init() {
			this.getCode()
		},
		back() {
			if (this.$router.currentRoute.path == '/signin') {
				this.$router.push({
					path:'/login'
				})
			} else {
				this.$router.push({
					path:'/login'
				})
			}
		},
		register() {
			userServices.register(this.user).then(
				res => {
					this.$message.success("注册成功! 转跳登陆中...")
					setTimeout(() => {
						this.back()
					}, 1000)
					this.registerEvent(res)
				}
			).catch(err=>{
				this.$message.error(err)
			})
		},
		// 倒计时
		countDown() {
			this.openCount = true
			let timer = setInterval(() => {
				if (this.phoneCount > 0) {
					this.phoneCount--
				} else {
					clearInterval(timer)
					this.openCount = false
					this.phoneCount = 60
				}
			}, 1000)
		},
		getCode(){
			userServices.codeImage().then(res => {
				this.valiCode= res.data
			})
		},
    getPhoneCode() {
			let phone=this.$refs.phoneVal.value
			if(!phone){
				this.$message.error('请输入手机号码');
				return
			}
			userServices.codePhone({
				phone:phone,
				not_check_user_exist: 1,
				code_id_img: this.valiCode.code_id,
				code_val_img: this.user.code_val_img,
			}).then(res=>{
				this.user.code_id = res.data.code_id
				this.$message.success('已发送！')
				this.countDown()
			}).catch(err=>{
				this.$message.error(err)
			})
    },
		registerEvent(res) {
      let eventOpts = null
      let addData = null
      let cb = msg => {}
      let data = res.data

      eventOpts = {
        event_class: 'User',
        event_type: '注册',
        event_source: 'WEB', //默认为WEB
      }
      addData = {
        User: [
          {
            user_id: data.id,
            user_name: data.name,
            user_nick: data.nick_name,
            user_sex: '男',
            user_birth_date: '1980-01-01',
            update_time: data.update_time,
            update_ipv4: '',
            create_time: data.create_time,
            create_ipv4: '',
          },
        ],
      }
      dbiServices.declare(eventOpts, addData, cb)
    },
  },
}
</script>

<template lang="pug">
.div
	.top
		img(src="./img/1.jpg")
		span xxx大学在线教育培训系统
	.bottom
		.account
			form
				.group
					span 手机号：
					input.phone(placeholder="请输入手机号" v-model="user.phone" ref="phoneVal" autocomplete="off")
				.group
					span 账户：
					input.phone(placeholder="请输入账户" v-model="user.name" ref="name" autocomplete="off")
				.group
					span 密码：
					input(placeholder="请输入密码" type="password" v-model="user.pass" ref="pass")
				.group.valicode
					span 验证码：
					input.vali(placeholder='验证码' autocomplete="off"   v-model='user.code_val_img')
					img.vali(:src='valiCode.code_img' @click="getCode" )
				.group
					input.val(placeholder='输入6位短信验证码' autocomplete="off" v-model="user.code_val")
					el-button(type="primary" size="mini" plain @click="getPhoneCode" v-if="!openCount") 发送验证码
					.send_btn.disable( v-if="openCount") 倒计时: {{phoneCount}}
				.next()
					.left
						el-button(type="priamry" size="large" plain @click="register") 注册
					.right
						el-button(type="priamry" size="large" plain @click="back") 返回
</template>

<style lang="stylus" scoped>
.div
	width 100%
	height 1000px
	.top
		width 100%
		height 78px
		background #ccc
		line-height 78px
		font-size 18px
		img
			width 97px
			height 38px
			padding 20px 0 0 50px
		span
			padding-left 15px
	.bottom
		width 100%
		padding-top 150px
		.account
			width 940px
			height 619px
			border 1px solid #666
			margin 0 auto
			background #fff
			form
				padding 110px 260px 0
				height 100%
				.next
					width 100px
					height 35px
					padding-top 15px
					margin 0 auto
				.next
					float left
					width 100%
					.left,.right
						width 50%
						float left
				.group
					height 30px
					line-height 30px
					font-size 16px
					margin-bottom 15px
					position relative
					.vali
						width 120px
					.val
						float left
						width 200px
						margin-right 10px
					el-button
						float right
					input
						width 300px
						height 25px
						margin-left 10px
						float left
					.phone
						float left
						width 300px
					img
						width 30px
						padding 0 25px 0
						height 30px
						float left
					span
						display block
						width 80px
						float left

</style>
