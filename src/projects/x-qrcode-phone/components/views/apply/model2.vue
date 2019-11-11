<script>
import {main, apply} from "@/util/mixins"
export default {
	mixins: [apply],
	name: 'Model1',
	data(){
		return{
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
			.form-control.namebox
				input(placeholder="请输入姓名" v-model="name")
			.form-control.phonebox
				input(placeholder="请输入姓名" v-model="phone")
			.btn(@click="submit")
					
	.footer
</template>
<style lang="stylus" scoped>
.model
	display flex
	flex-direction columns 
	background #fff
	height 100%
	font-size 0.28rem
	background  url('./img/model2/bg.jpg') center -0.8rem no-repeat
	background-size 100% auto
	.content
		margin 3rem 0.5rem 0 0.5rem
		width 100%
		height 5rem
		background  url('./img/model2/whiteBg.png') center 0 no-repeat
		background-size 100% auto	
		.form	
			padding 1rem 0.6rem
			margin 0 auto
			.form-control.namebox
				background  url('./img/model2/name.png') center 0 no-repeat
				background-size 100% auto 
			.form-control.phonebox
				background  url('./img/model2/phone.png') center 0 no-repeat
				background-size 100% auto				
			.form-control 
				margin-bottom 20px
				line-height 1rem
				input 
					padding-left 1rem
					width 4rem
					border 0px
					outline none
					height 30px
			.btn
				width 50%
				height 0.7rem
				margin 0 auto
				background url('./img/model2/commit.png') center 0 no-repeat
				background-size 100% auto 
</style>
