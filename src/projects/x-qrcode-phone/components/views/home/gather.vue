<script>
import {main} from "@/util/mixins"
import {get_resource_content,get_home_resource} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			type:0,
			params:{gather:{}},
			id:'',
		}
	},
	methods:{
		getList(){
			this.id = this.$route.query.id
			if(!this.id){
					this.params = this.fetch()
					this.id= this.params.gather.id
			}
			if(this.$route.query.type){
				get_home_resource({id:this.id}).then(res=>{
					this.info = res.data.info
					this.$set(this.params,'gather',{id:this.id,name:this.$route.query.name,data:this.info,res_id:res.data.id,is_buy:res.data.is_buy})
				})
				return
			}
			get_resource_content({id:this.id}).then(res=>{
				this.info = res.data.info
				this.$set(this.params,'gather',{id:this.id,name:this.$route.query.name,data:this.info,res_id:res.data.id,is_buy:res.data.is_buy})
			})
		},
		itemClick(key){
			this.$dialog.loading.open('数据加载中')
			setTimeout(() => {
					this.type = key;
					this.$dialog.loading.close();
			}, 1000)
		},
		goResource(item,i){
			let type = item.type_name
	    if(!this.params.gather.is_buy){
				this.$dialog.toast({
					mes: '请先购买',
					timeout: 1500,
					})
				return
			}
			switch(type){
				case '音频' :this.goPlay(i,'audio') ; break;
				case '视频' :this.goPlay(i,'video') ; break;
				case '数字图书' : this.goPlay(i,'chapters') ; break;
				case '文章' : this.goPlay(i,'article') ; break;
				case '图片' : this.goPlay(i,'pic');break;
			}
		},
		goPlay(i,name){
			this.params.gather.n=i 
			this.save(this.params)
			this.to(name,{qrcode_id:this.$route.query.qrcode_id,qrcode_product_id:this.$route.query.qrcode_product_id})
		},
		showPic(i){
			this.$refs['spic'][i].$el.click()
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" :title="params.gather.name" color="#fff" bgcolor="#3998e2")
		router-link(:to="'/home?qrcode_id='+qrcode_id" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.scroll
		.content(slot="list")
			.list
				ul(v-if="info.components" )
					yd-lightbox(v-if="info.components[0]['type_name']=='图片'&& params.gather.is_buy")
						li(v-if="info")
							yd-lightbox-img.img(:src="info.img_src" )
							.abstract
								.title 
									span.oh {{info.name}}
								.txt {{info.abs}}
								.handle
									.price
										span 价格：
										span.pr ￥{{info.price}}  
									yd-button(size="mini" v-if="!params.gather.is_buy"  @click.native="to('/pay',{qrcode_id:$route.query.qrcode_id,id:$route.query.id,type:'createOrder'})" bgcolor='#3998e2' color="#fff" ) 立即购买
									yd-button( disabled v-else size="mini" type="disabled") 免费
						li(v-for="(item,i) in info.components" :key="i" @click="showPic(i)")
							yd-lightbox-img.img.small(:src="item.img_src || item.preview_path" ref="spic")
							.abstract()
								.title {{item.name}}
								.txt {{item.abs}}
					template(v-else)
						li(v-if="info")
							yd-lightbox-img.img(:src="info.img_src" )
							.abstract
								.title 
									span.oh {{info.name}}
								.txt {{info.abs}}
								.handle
									.price 
										span 价格：
										span.pr ￥{{info.price}}
									yd-button(size="mini" v-if="!params.gather.is_buy"  @click.native="to('/pay',{qrcode_id:$route.query.qrcode_id,id:$route.query.id,type:'createOrder'})" bgcolor='#3998e2' color="#fff" ) 立即购买
									yd-button( disabled v-else-if="info.price!='0.00'" size="mini" type="disabled") 已购买
									yd-button( disabled v-else size="mini" type="disabled") 免费 
									
						li(v-for="(item,i) in info.components" :key="i" @click="goResource(item,i)") 
							yd-lightbox-img.img.small(:src="item.img_src || item.preview_path")
							.abstract
								.title
									span.oh {{item.name}}
								.txt {{item.abs}}
</template>
<style lang="stylus" scoped>
.scroll
	padding 0
	background #fff
.content
	font-size 0.28rem
	.list
		li
			display flex
			padding 0.3rem 0.2rem
			height 2.0rem
			&:nth-child(1)
				height 2.4rem
				.abstract>.txt
					-webkit-line-clamp 2
			.abstract 
				flex 1
				margin-left 0.3rem
				font-size 0.3rem
				width 3rem
				.title 
					display flex 
					flex 1
					justify-content space-between
				.txt
					padding 0.1rem 0 0.2rem 0
					margin-bottom 0.2rem
					text-align justify
					color #808080
					height 0.8rem
					overflow hidden
					font-size 0.26rem
					display -webkit-box
					-webkit-box-orient vertical
					-webkit-line-clamp 3
				.handle
					display flex
					justify-content space-between
					.price
						color #808080
						font-size 0.26rem
						text-align right
						padding-top 0.05rem
						.pr 
							color #ff4614
			img
				border-radius 0.08rem
			.img 
				width 1.3rem
				height 1.84rem
			.small 
				width 1.08rem
				height 1.53rem
		li:not(:last-child)
			border-bottom 1px solid #e8e8e8
.ad
	height 3rem
	margin-top 0.2rem
	background center center no-repeat
	background-size 100% auto
</style>
