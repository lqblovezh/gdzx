
<script>
import {main} from "@/util/mixins"
import price1 from "./img/coupon_0.png"
import price2 from "./img/coupon_2.png"
import price3 from "./img/coupon_1.png"
import price4 from "./img/coupon_3.png"
import {my_coupons} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			prizeType:[],
		}
	},
	methods:{
		getList(){
			my_coupons().then(res=>{
				let color = ['#61abe5','#e5be61','#e68d60','#b195f1']
				let bg = [price1,price2,price3,price4]
				res.data.map((el,i) => {
					el.color = color[i]
					el.bg = bg[i]
				});
				 this.prizeType = res.data
			})
		},
		use(){
			
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" title="我的奖品" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content
		ul.list
			li(v-for="(item,i) in prizeType" :key="i" :style="{backgroundImage:'url('+item.bg+')'}")
				.size(:style="{color:item.color}") {{item.count}}张
				.price(:style="{color:item.color}") 
					span.pr {{item.name}}
		.noMsg(v-if="!prizeType.length") 暂无数据
				//- .btn 
					yd-button(size="small" @click.native="use()" :bgcolor="item.color" color="#fff") 立即使用			
</template>
<style lang="stylus" scoped>
.content
	background #fff
	font-size 0.28rem
	.banner 
		height 2.9rem
	.list
		padding 0.3rem
		li  
			margin 0.1rem 0 0.3rem 0
			height 2.26rem
			padding 0.4rem 0.3rem
			background url('./img/coupon_1.png') no-repeat center center
			background-size 100% 100%
			.size 
				text-align right
			.price 
				text-align center
				height 0.7rem
				line-height 0.7rem
				font-size 0.45rem
			.btn 
				text-align center
</style>
