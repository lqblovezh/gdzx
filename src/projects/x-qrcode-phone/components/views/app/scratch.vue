<script>
import {main} from "@/util/mixins"
import { Scratch } from 'lottery-scratch'
import {get_content,lottery,get_app_info} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			isShow:false,
			className:'hidden',
			phone:'',
			formData:{
				id:'',
				qrcode_product_id:this.$route.query.qrcode_product_id,
				phone:'',
				award_id:'',
			}
		}
	},
	mounted(){
		const el = this.$refs.scratch
		const sc = new Scratch(el,{threshold:1})
	},
	methods:{
		getList(){
			let id = this.$route.query.id
			if(this.$route.query.type){
				get_app_info({id,qrcode_product_id:this.$route.query.qrcode_product_id}).then(res=>{
					this.info = res.data
					this.formData.id = res.data.id
					this.formData.award_id = res.data.lottery_info.win_award_id
				})
				return
			}
			get_content({id}).then(res=>{
				this.info = res.data
				this.formData.id = res.data.id
				this.formData.award_id = res.data.lottery_info.win_award_id
			})
		},
		sendMsg(){
			if(this.isShow || this.info.is_answer){
				return
			}
			this.isShow = true
			console.log(this.info)
			lottery(this.formData).then(res=>{
				console.log(this.info)
				console.log(res)
			})

			//手机验证暂时取消
			
			// if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
      //   this.$dialog.toast({
			// 		mes: '请先填写正确的手机号！',
			// 		timeout: 1500
			// 	}) 
			// 	this.isShow = false
			// 	return false
			// }else{
			// 	this.isShow = true
			// }
		}
	},
	watch:{
		phone(){
			if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
				this.isShow = false
			}else{
				this.isShow = true
			}
		}
	}
}
</script>
<template lang="pug">
.body
	yd-navbar(slot="navbar" title="幸运刮刮乐" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content
		.lottery
			.scratch.cover(v-show="info.is_answer" @mouseover="sendMsg"  @touchstart="sendMsg")
				p(v-if="info.is_answer && info.lottery_info") {{info.lottery_info.win_award_name}}
			.scratch(ref="scratch" @touchstart="sendMsg") 
				p(v-if="info.lottery_info") {{info.lottery_info.win_award_name}}
	//- .getPhone
		.title 需要获取手机号码才能领取哦
		.input
			yd-cell-item
				yd-icon(slot="icon" name="phone3" size=".45rem")
				input(type="text" slot="right" placeholder="请输入手机号码"  ref="input" v-model="phone" :disabled="isShow")
				yd-sendcode(slot="right" v-model="start1" @click.native="sendCode1" type="warning")
</template>
<style lang="stylus" scoped>
.body 
	background #fff
	height 100%
	display flex
	flex-direction column
.content
	font-size 0.28rem
	background url('./img/scratch.png') center 0 no-repeat
	background-size 100% auto
	height 7.35rem
	width 5.9rem
	margin 0.8rem auto 0.4rem
	display flex
	flex-direction column-reverse
	padding 0.3rem
.lottery
	padding 0.3rem
	background #fff
	position relative
.scratch
	height 2rem
	p 
		display flex
		height 2rem
		align-items center
		justify-content center
		width 100%
		height 100%
		background #e8e8e8
.scratch.cover
	background #ccc
	height 2rem
	width 4.7rem
	z-index 5
	position absolute
	touch-action none
.getPhone 
	width 5.5rem
	margin 0 auto 
	.title 
		line-height 0.6rem
		color #666
		font-size 0.28rem
	.input 
		border 0.01rem solid #ff8b1c
		border-radius 0.08rem
		background #ffffff
		height 0.8rem
		input
			border none  
			outline none
			height 0.8rem
			text-indent 0.2rem
			width 100%
</style>
