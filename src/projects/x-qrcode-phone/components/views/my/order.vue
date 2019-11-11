<script>
import {main} from "@/util/mixins"
import {order_list} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			type:0,
			pay_status:'',
			getMoreData:order_list,
			page:{},
			items:[
				{type:'全部'},
				{type:'已购买'},
				{type:'未购买'}
			]
		}
	},
	methods:{
		getList(key=0){
			this.$dialog.loading.open('数据加载中')
			order_list({pay_status:this.pay_status}).then(res=>{
				this.list = res.data
				this.type = key
				this.page = res.page
				this.$dialog.loading.close()
			})
		},
		loadList(){
			let pageStart = this.page.start + this.page.offset
			this.getMoreData({pay_status:this.pay_status,pageStart:pageStart,pageOffset:this.page.offset}).then(res=>{
				this.list = [...this.list,...res.data]
				if (this.list.length>=this.page.total) {
					/* 所有数据加载完毕 */
					this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone')
					return;
				}
				this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad')
			})
		},
		itemClick(key){
			if(key == 0){
				this.pay_status = ''
			}else if(key == 1){
				this.pay_status = 'already_paid'
			}else{
				this.pay_status = 'not_pay'
			}
			this.getList(key)
		},
		toOther(item){
			if(item.is_pay=="等待支付"){
				this.to('/pay',{qrcode_id:this.qrcode_id,id:item.id})
			}else{
				this.to('gather',{qrcode_id:this.qrcode_id,id:item.order_info[0].goods_id,type:'scan'})
			}
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" title="我的订单" color="#fff" bgcolor="#3998e2")
		router-link(:to="'/home?qrcode_id='+qrcode_id" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	yd-infinitescroll.scroll(:callback="loadList" ref="infinitescroll")
		.content(slot="list")
			yd-tab(v-model="type" active-color="#3998e2" :prevent-default="false" :item-click="itemClick")
				yd-tab-panel(:label="item.type" v-for="item in items")
					.list
						ul
							li(v-for="(item,i) in list" @click="toOther(item)")
								img(:src="item.order_info[0].goods_img")
								.abstract
									.title {{item.order_info[0].goods_name}} 
									.txt {{item.order_info[0].goods_abs}}
									.price 
										span 
											span 价格：
											span.c1 ￥{{item.pay_price}}
										span.c2 {{item.is_pay}}
		img.loading(slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg")
		span(slot="doneTip") 没有数据啦 ~~~
</template>
<style lang="stylus" scoped>
.scroll
	padding 0
.content
	font-size 0.28rem
	.list
		li
			background #fff
			display flex
			padding 0.2rem
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
					display flex
					justify-content space-between
			img
				max-width 1.8rem
				max-height 1.8rem
				border-radius 0.08rem
		li:not(:last-child)
			margin 0.15rem 0
</style>
