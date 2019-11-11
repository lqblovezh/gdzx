<script>
import {main} from "@/util/mixins"
import {get_resource_content,get_home_resource} from "services/x-qrcode/phone"
export default {
	mixins:[main],
  data(){
    return {
			id:this.$route.query.id,
			params:{},
			infoData:{},
      imgURL :'',
    }
	},
	methods:{
		getList(){
			get_resource_content({id:this.id}).then(res=>{
				this.infoData = res.data
				this.imgURL = res.data.info.img_src
			})
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" title="习题库" )
		span(@click="to('/home',{qrcode_id:$route.query.qrcode_id})" slot="left")
			yd-navbar-back-icon 返回
	.banner(:style="{backgroundImage:'url('+imgURL+')'}")
	.title 
		.name {{infoData.name}}
		.describe
			p
				span 题数：
				span.c5 {{infoData.practice_count}}道
			p.betn
				span
					span 价格：
					span.c1 ￥{{infoData.price}}
				span
					yd-button(size="mini" color="#fff" bgcolor="#3998e2" @click.native="to('/resource/qus',{qrcode_id:$route.query.qrcode_id,id:$route.query.id,resource_id:infoData.id,qrcode_product_id:$route.query.qrcode_product_id,name:infoData.name})" v-if="infoData.is_buy") 进入题库
					yd-button(size="mini" color="#fff" bgcolor="#3998e2" @click.native="to('/pay',{qrcode_id:$route.query.qrcode_id,id:$route.query.id,type:'createOrder'})" v-else) 立即购买
	.content
		.tag 
			span.line 
			span 简介
		.txt(v-if="infoData.info") {{infoData.info.abs}}
</template>
<style lang="stylus" scoped>
.banner 
	height 4.25rem
	background center center no-repeat
	background-size 100% 100%
.title 
	line-height 0.48rem
	background #fff
	padding 0 0.3rem 0.4rem
	margin-bottom 0.2rem
	.name 
		font-size 0.32rem
		padding 0.4rem 0
		color #333
	.describe 
			font-size 0.28rem
.content
	background #fff
	padding 0 0.3rem 0.4rem
	.tag
		line-height 0.6rem
		font-size 0.3rem
		color #3998e2
		padding 0.2rem 0
		.line 
			border-left 0.06rem solid #3998e2
			height 0.26rem
			display inline-block
			margin-right 0.2rem
	.txt 
		color #454545
		font-size 0.26rem
		word-wrap wrap
</style>
