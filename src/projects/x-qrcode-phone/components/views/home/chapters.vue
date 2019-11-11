<script>
import {main} from "@/util/mixins"
import {get_chapters} from "services/x-qrcode/phone"
import {get_progress} from 'services/common/reader'
export default {
	mixins:[main],
	data(){
		return{
			type:0,
			access_code:'',
			params:{gather:{}},
		}
	},
	methods:{
		getList(){
			this.params = this.fetch()
			let gather = this.params.gather
			this.info = gather.data.components[gather.n]
			get_chapters({
				resource_info_id:gather.data.id,
				product_id:gather.data.product_id,
				book_id:this.info.id}).then(res=>{
				 this.access_code = res.data.access_code
				 this.$set(this.info,'chapters',res.data.chapters)
			 })
			// get_progress({
			// 	bookId:this.info.id
			// },{extraParams:{release_id:this.$route.query.qrcode_product_id}}).then(res=>{
			// 	console.log(res,'xxx')
			// })
		},
		run(item){
			this.$router.push({
				path:'/reader',
				query:{
					book_id:item.book_id,
					chapter_id:item.id,
					product_id:this.params.gather.data.product_id,
					access_code:this.access_code}
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
	.scroll()
		.content(slot="list")
			.list
				ul
					li.ths(v-if="info" )
						img(:src="info.img_src" )
						.abstract
							.title 
								span.oh {{info.name}}  
							.txt
								p.author {{info.author}} 
								p.abs {{info.abs || '暂无简介'}}
					li.chapter_title
						.current 
							span 
								span 当前章节：
								span.c5 第 {{1}} 章
							yd-button(size="mini" bgcolor="#3998e2" color="#fff" @click.native="run(info.chapters[0])") 继续阅读 
						h3 目录
					li(v-for="(item,i) in info.chapters" @click="run(item)")
						.abstract
							.titles
								p 第 {{i+1}} 章
								p.oh {{item.chapter_name}}
</template>
<style lang="stylus" scoped>
.scroll
	padding 0
	background #fff
	padding 0.1rem 0.3rem
.content
	font-size 0.28rem
	.list
		.ths
			height 2.3rem
		li
			display flex
			padding 0.2rem
			border-bottom 0.01rem solid #e8e8e8
			.abstract 
				flex 1
				font-size 0.3rem
				color #666
				width 3rem
				.title 
					display flex 
					flex 1
				.titles
					display flex
					font-size 0.29rem
					p 
						&:nth-child(1)
							margin-right 0.2rem
							min-width 1rem
						&:nth-child(2)
							width 5rem
				.txt
					.author 
						font-size 0.28rem
						line-height 0.3rem
						margin-top 0.1rem
					.abs
						overflow hidden
						display -webkit-box
						-webkit-box-orient vertical
						-webkit-line-clamp 2
						height 0.9rem
						font-size 0.28rem
						line-height 0.4rem
						padding 0.1rem 0
			img
				width 1.3rem
				height 1.84rem
				margin-right 0.3rem
				border-radius 0.08rem
		.chapter_title
			display block
			h3 
				color #333
				font-size 0.32rem
		.current
			justify-content space-between
			display flex
			margin-bottom 0.3rem	
</style>
