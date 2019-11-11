<script>
import {main} from "@/util/mixins"
import {get_resource_content,get_home_resource} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			id:''
		}
	},
	methods:{
		getList(){
			this.id = this.$route.query.id
			let type = this.$route.query.type || ''
			if(this.$route.query.type){
				get_home_resource({id:this.$route.query.id,type:type}).then(res=>{
					this.list = res.data.category_list
					this.info = res.data
				})
				return
			}
			get_resource_content({id:this.id}).then(res=>{
				this.list = res.data.category_list
				this.info = res.data
			})
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" :title="info.name" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.scroll
		.content
			.list
				ul
					li(v-for="(item,i) in list" @click="to('/subject',{qrcode_id,pid:id,id:item.id,qrcode_product_id:$route.query.qrcode_product_id})")
						.img
							img(:src="item.img_src")
						.abstract
							.title 
								span {{item.name}}
								span.num 资源数：{{item.count}}
			.noMsg(v-if="!list.length") 暂无数据
			//-.img
				img(:src="info.ad_info.img_src") 
			.ad(:style="{backgroundImage:'url('+info.ad_info.img_src+')'}" v-if="info.ad_info" @click="outLink(info.ad_info.preview)")
</template>
<style lang="stylus" scoped>
.scroll 
	background #fff
	padding 0.1rem 0.3rem
.content
	background #fff
	font-size 0.28rem
	.list
		li  
			display flex
			padding 0.2rem 0
			.abstract 
				flex 1
				margin-left 0.3rem
				font-size 0.3rem
				.title 
					flex 1
					display flex
					align-items center
					height 100%
					justify-content space-between
					.num 
						color #808080
						font-size 0.26rem
			.img 
				width 1.16rem
			img
				max-width 1.16rem
				max-height 1.16rem
				border-radius 0.08rem
		li:not(:last-child)
			border-bottom 0.01rem dashed #e8e8e8
.img 
	margin 0 auto
	width 100%
	img
		display block
		max-width 100% 
		margin 0 auto 
.ad
	height 3rem
	margin 0.2rem 0
	background center center no-repeat
	background-size 100% auto
</style>
