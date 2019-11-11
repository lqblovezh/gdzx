<script>
import {main, apply} from "@/util/mixins"
import * as  service  from "services/x-qrcode/phone"
export default {
	mixins: [apply],
	name: 'Model1',
	data(){
		return{
			service,
		}
	},
	props: ['data'],
	computed: {
		 user_id(){
			 return this.data.id
		 },
		 is_sign_up(){
			 return this.data.id
		 }
	},
}
</script>
<template lang="pug">
.model
	.content
		.form
			.form-control
				label 姓名
				input(placeholder="请输入姓名" v-model="name")
			.form-control
				label 手机
				input(placeholder="请输入手机号" v-model="phone")
			button.btn(@click="submit" )
					
	.footer
</template>
<style lang="stylus" scoped>
.model
	display flex
	flex-direction columns 
	background #fff
	height 100%
	font-size 0.28rem
	background  url('./img/model1/bg_model1.jpg') center -0.8rem no-repeat
	background-size 100% auto
	.content
		margin 3rem 0.5rem 0 0.5rem
		width 100%
		height 5rem
		background  url('./img/model1/bg_content1.png') center 0 no-repeat
		background-size 100% auto	
		.form	
			padding 1rem 0.6rem
			.form-control 
				margin-bottom 20px
				line-height 30px
				label 
					margin-right 20px
				input 
					width 4rem
					border 0px
					outline none
					height 30px
			.btn
				width 100%
				height 0.7rem
				border none
				background url('./img/model1/commit1.png') center 0 no-repeat
				background-size 100% auto
  .footer
		width 100%
		height 5rem
		bottom 0
		left 0
		right 0
		background url('./img/model1/bottom.png') center 0 no-repeat
		background-size 100% 100%
		position absolute 
</style>
