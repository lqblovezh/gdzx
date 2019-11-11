<script>
import {main} from "@/util/mixins"
import {get_category,get_category_list} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			type:0,
			toPath:'',
			ad:"",
			preview:'',
			qrcode_product_id:''
		}
	},
	methods:{
		getList(){
			let id = this.$route.query.id
			this.qrcode_product_id = this.$route.query.qrcode_product_id
			this.toPath =  `/special?id=${this.$route.query.pid}&qrcode_product_id=${this.$route.query.qrcode_product_id}`
			get_category_list({id}).then(res=>{
				this.info = res.data
				this.info.children.unshift({
					name:'全部',
					id:id
				})
			})
			this.getData(id)
		},
		getData(id){
			this.$dialog.loading.open('数据加载中')
			get_category({id}).then(res=>{
				this.list = res.data.resource_list
				if(res.data.ad){
					this.ad =res.data.ad.img_src
					this.preview = res.data.ad.preview
				}else{
					this.ad = ''
				}
				this.$dialog.loading.close()
			})
		},
		itemClick(key){
			let id = this.info.children[key]['id']
			this.getData(id)
			this.type = key	
		},
		showType(item){
			let qrcode_id = this.qrcode_id
			if(item.type == 'resource'){
				this.to('gather',{qrcode_id,id:item.id,name:item.name,type:'dal'})
			}else if(item.type=="app"){
				if(item.app_type_name =="书圈"){
					this.to('bookDetail',{qrcode_id,id:item.id,name:item.name,type:'dal'})
				}else if(item.app_type_name =="投票"){
				this.$router.push({path:'/vote',query:{qrcode_id,id:item.id,qrcode_product_id:this.qrcode_product_id,type:'dal'}})
				}else if(item.app_type_name == "问卷调查"){
					this.to('ans',{qrcode_id,id:item.id,qrcode_product_id:this.qrcode_product_id,type:'dal'})
				}else if(item.app_type_name == "问答"){
					this.to('/qus',{qrcode_id,id:item.id,qrcode_product_id:this.qrcode_product_id,type:'dal'})
				}else if(item.app_type_name =='抽奖' && item.lottery_info.type_name == "刮刮卡"){
					this.to('/scratch',{qrcode_id,id:item.id,qrcode_product_id:this.qrcode_product_id,type:'dal'})
				}else if(item.app_type_name =='抽奖' && item.lottery_info.type_name == "大转盘"){
					this.to('/turntable',{qrcode_id,id:item.id,qrcode_product_id:this.qrcode_product_id,type:'dal'})
				}
			}else if(item.type == "special"){
				this.to('/special',{qrcode_id,id:item.id,name:item.name,type:'dal'})
			}
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" :title="info.name" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	yd-infinitescroll.scroll(:callback="loadList" ref="infinitescroll")
		.content(slot="list")
			yd-tab(v-model="type" :horizontal-scroll="false" active-color="#3998e2" :prevent-default="false" :item-click="itemClick")
				yd-tab-panel(:label="vo.name" v-for="vo in info.children")
					.list
						ul
							li(v-for="(item,i) in list" @click="showType(item)")
								img(:src="item.info.img_src" v-if="item.info")
								.abstract
									.title 
										span {{item.name}}
										yd-button(size="mini" type="hollow"  color="#b3b3b3" v-if="item.product_type_name") {{item.product_type_name}}
										yd-button(size="mini" type="hollow"  color="#b3b3b3" v-else-if="item.type=='app'&&item.app_type_name!='抽奖' ") {{item.app_type_name}}
										yd-button(size="mini" type="hollow"  color="#b3b3b3" v-else) {{item.lottery_info.type_name}}
									.txt(v-if="item.info") {{item.info.abs}}
									.price 
										span 价格：
										span.pr ￥{{item.price}}
					.ad(:style="{backgroundImage:'url('+ad+')'}" v-if="ad" @click="outLink(preview)")
		img.loading(slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg")
		span(slot="doneTip") 没有数据啦 ~~~
</template>
<style lang="stylus" scoped>
.scroll
	padding 0
	background #fff
	padding 0.1rem 0.3rem
.content
	font-size 0.28rem
	.list
		li
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
					text-align right
					.pr 
						color #ff4614
			img
				max-width 1.8rem
				max-height 1.8rem
				border-radius 0.08rem
		li:not(:last-child)
			border-bottom 0.01rem dashed #e8e8e8
.ad
	height 3rem
	margin-top 0.2rem
	background center center no-repeat
	background-size 100% auto
</style>
