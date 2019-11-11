<script>
import {main} from "@/util/mixins"
export default {
	mixins:[main],
	data(){
		return{

		}
	},
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" title="" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	yd-infinitescroll.scroll(:callback="loadList" ref="infinitescroll")
		.content(slot="list")
			yd-slider(autoplay="3000")
				yd-slider-item(v-for="(item,i) in 3" :key="i") 
					a(href="#")
						img.banner(src="http://img0.pcgames.com.cn/pcgames/1412/22/4678686_61.jpg")
			ul.list
				li(v-for="item in list")
					.txt {{'在中国历史变迁中，身处不同时代的三个空巢女人的命运'}}
					img(src="./imgl/a.png")
		img.loading(slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg")
		span(slot="doneTip") 没有数据啦 ~~~
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
			display flex
			padding 0.1rem 0
			height 1.4rem
			border-bottom 1px solid #ccc
			.txt 
				flex 1
				display flex
				align-items center
				margin-right 0.3rem
			img
				width 1.18rem
</style>
