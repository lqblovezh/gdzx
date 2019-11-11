<script>
import {main} from "@/util/mixins"
import urlParse from 'url-parse'
import {get_resource_content,orderDetail,my_coupons,pay_money,createOrder,cancel} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			show:false,
			id:'',
			current:{},
			myItems:[],
			status:false,
			createOrderData:{
				pay_type:'wechat',
				goods:[], // this.id
				coupon:'', // this.current.id
				rf_url:location.href
			}
		}
	},
	methods:{
		async getList(){
			this.id = this.$route.query.id
			if(this.$route.query.type=="createOrder"){
				let Rdata
				if(this.id){
				await	get_resource_content({
						id:this.id
					}).then(res=>{
						Rdata = res
					})
				}else{
					Rdata = this.fetch().gather
				}

				let data =Rdata.data
				this.status = true
				this.createOrderData.goods = [Rdata.res_id || Rdata.data.id]
				this.info = {
					pay_price:data.price,
					order_info:[{
						goods_img:data.img_src || data.info.img_src,
						goods_type:data.product_type,
						goods_price:data.price,
						goods_name:data.name,
						goods_abs:data.abs
					}]
				}
				await my_coupons().then(res=>{
					this.myItems.push({
							label: '不使用优惠劵',
							name:'不使用优惠劵',
							denomination:0,
							callback: () => {
								this.info.pay_price += this.current.denomination
								this.current= {
									name:'不使用优惠劵',
									denomination:0,
								}
								this.createOrderData.coupon = ''
							}
						})
						res.data.map((el,i) => {
							this.myItems.push({
										label: el.name,
										callback: () => {
											this.current = el
											this.createOrderData.coupon = el.id
											this.info.pay_price -= el.denomination
										}
									})
							});
						this.current = this.myItems[0]
					})
        return
			}
			await orderDetail({id:this.id}).then(res=>{
				this.info = res.data
			})
		},
		pay(){
			if(this.status){
				createOrder(this.createOrderData).then(res=>{
					//后台返回调转地址
					location.href= res.data.pay_link
				})
			}else{
				if(this.info.is_pay=="已支付"){
					return
				}
				let url = urlParse(location.href)
				let newURL = url.origin +url.pathname +'#/gather?qrcode_id='+this.$route.query.qrcode_id +'&id='+this.$route.query.id
				pay_money({
					order_id:this.info.id,
					rf_url:newURL
				}).then(res=>{
					//后台返回调转地址
					location.href= res.data.pay_link
				})
			}			 
		},
		del(){
			cancel({order_id:this.id}).then(res=>{
				 this.$dialog.toast({
					mes: '订单取消成功',
					timeout: 1500
				})
			  this.to('/order',{qrcode_id:this.qrcode_id})
			})
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" :title="status?'订单详情':'待付款订单'" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content
		.info(v-for="item in info.order_info")
			img(:src="item.goods_img")
			.abstract
				.title 
					span {{item.goods_name}}
					yd-badge(type="warning" shape="square" scale="0.8") {{item.goods_type}}
				.txt {{item.goods_abs}}
				.handle
					.price 
						span 价格：
						span.pr(v-if="status") ￥{{item.goods_price}}
						span.pr(v-else) ￥{{info.pay_price}}
		yd-cell-group()
			yd-cell-item(arrow v-if="myItems.length || info.user_coupons")
				span(slot="left") 优惠券
				span(slot="right" @click="status?show=true:null") {{current.name || info.user_coupons}}
			.choose(v-if="!status") 
				button.del(@click="del") 取消订单
				button.pay(@click="pay") 付款
		.payGroup(v-if="status")
			.title 支付方式
			yd-radio-group(v-model="createOrderData.pay_type")
				yd-radio.payType(val="wechat")
					img.img(src="./img/wechat.png")
					span 微信支付
				yd-radio.payType(val="alipay")
					img.img(src="./img/alipay.png")
					span 支付宝支付
		yd-actionsheet(:items="myItems" v-model="show")
	.footer(slot="tabbar" v-if="status")
		.lside  
			span 应付款：
			span.price ￥{{info.pay_price}}元 
		.rside(@click="pay") 购买
</template>
<style lang="stylus" scoped>
.content
	.info
		background #fff
		display flex
		padding 0.2rem
		border-bottom 0.01rem solid #e8e8e8
		.abstract 
			flex 1
			margin-left 0.3rem
			font-size 0.3rem
			.title 
				display flex 
				flex 1
				justify-content space-between
				align-items center
			.txt
				padding 0.1rem 0 0.2rem 0
				text-align justify
				color #808080
				font-size 0.26rem
			.handle
				display flex
				justify-content space-between
				.price
					color #808080
					font-size 0.26rem
					text-align right
					.pr 
						color #ff4614
		img
			max-width 1.8rem
			max-height 1.8rem
			border-radius 0.08rem
		.small 
			max-width 1.4rem
.choose 
	padding 0.3rem
	display flex 
	justify-content flex-end
	button 
		border 1px solid #cccccc
		outline none 
		background #fff
		color #cccccc
		padding 0.2rem
		width 1.6rem
		font-weight bold
	.pay 
		color #ff643e
		border-color #ff643e
		margin-left 0.3rem
.payGroup
	padding 0.2rem
	margin 0.2rem 0
	background #fff
	.title 
		font-size 0.28rem
		padding 0 0.2rem
.payType 
	 display flex
	 align-items center
	 flex-direction row-reverse
	 justify-content space-between
	 margin 0.3rem 0
.img 
		width 0.35rem
		margin 0 0.2rem
		top 0.06rem
		position relative
.footer 
	height 0.98rem
	line-height 0.98rem
	width 100%
	display flex
	text-align center
	background #fff
	font-size 0.32rem
	color #666
	.lside
		flex 1
		.price
			color #ff4614
	.rside
		width 3.2rem
		background #ff4614
		color #fff
</style>
