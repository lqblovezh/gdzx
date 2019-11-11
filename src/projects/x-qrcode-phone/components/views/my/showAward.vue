
<script>
import {main} from "@/util/mixins"
export default {
	mixins:[main],
	data(){
		return{

		}
	},
	methods:{
		show(){
			
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" title="晒单奖励" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content
		.list
			ul
				li
					img(src="")
					.abstract
						.title 
							span {{'文明的故事'}}
							span
								yd-button(size="mini" bgcolor="#eea443" color="#fff") 图片集
						.txt {{'《文明的故事》(The Story of Civilization)，美国作家、哲学家、历史学家威尔?杜兰特其…'}}
						.price
							span 价格：
							span.c1 ￥19.00
			.infoMsg {{'朋友圈晒出此单可获得1元优惠券'}}
		yd-button(@click.native="show" size="large" type="warning" bgcolor="#ffc21c" color="#fff") 晒单	
</template>
<style lang="stylus" scoped>
.content
	background #fff
	font-size 0.28rem
	.list
		padding 0.3rem
		li  
			display flex
			padding 0.1rem 0
			.abstract 
				flex 1
				margin-left 0.3rem
				font-size 0.3rem
				.title 
					display flex 
					flex 1
					justify-content space-between
				.txt
					padding 0.1rem 0 0.2rem 0
					text-align justify
					color #808080
					font-size 0.26rem
				.price
					color #808080
					font-size 0.26rem
			img
				max-width 1.8rem
		.infoMsg
			color #fff
			margin-top 0.15rem 
			background #f2d891
			border-radius 0.2rem
			text-align center
</style>


