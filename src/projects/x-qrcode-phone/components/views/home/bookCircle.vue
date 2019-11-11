<script>
import {main} from "@/util/mixins"
import {circle_list} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			type:0,
		}
	},
	methods:{
		getList(){
			circle_list().then(res=>{
				this.list = res.data
			})
		},
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" title="我的书圈" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	yd-infinitescroll.scroll(:callback="loadList" ref="infinitescroll")
		.content(slot="list")
			.list
				yd-lightbox
					ul
						li(v-for="(item,i) in list" :key="i") 
							yd-lightbox-img.small(:src="item.img_src || item.preview_path")
							.abstract(@click="to('/bookDetail',{qrcode_id,id:item.circle_id,type:'circle'})")
								.title {{item.name}}
								.txt {{item.abs}}
			.noMsg(v-if="!list.length") 暂无数据
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
				max-height 1.4rem
		li:not(:last-child)
			border-bottom 0.01rem dashed #e8e8e8
.ad
	height 3rem
	margin-top 0.2rem
	background center center no-repeat
	background-size 100% auto
</style>
