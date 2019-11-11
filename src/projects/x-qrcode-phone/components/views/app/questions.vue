<script>
import {main} from "@/util/mixins"
import {get_content} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			query:{}
		}
	},
	methods:{
		getList(){
			let id = this.$route.query.id
			this.query = this.$route.query
			this.$dialog.loading.open('加载数据中...')
			get_content({id}).then(res=>{
				this.info = res.data
				this.$dialog.loading.close()
			},err=>{
				this.$dialog.loading.close()
			})
		}
	}
}
</script>
<template lang="pug">
yd-layout.body
	yd-navbar(slot="navbar" title="问答" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	yd-infinitescroll.scroll(:callback="loadList" ref="infinitescroll")
		.content(slot="list")
			ul.list
				li(v-for="(item,i) in info.questions" @click="to('qusAnswer',{n:i,...$route.query})")
					span.num {{i+1}} 
					span {{item.question}}
		span(slot="doneTip") 没有数据啦 ~~~
</template>
<style lang="stylus" scoped>
.body 
	background #fff
.scroll 
	background #fff
	padding 0
.content
	font-size 0.28rem
	.banner 
		height 2.9rem
	.list
		padding 0.3rem
		font-size 0.3rem
		li  
			display flex
			padding 0.3rem 0
			line-height 0.3rem
			border-bottom 1px solid #e8e8e8
			.num 
				color #ff9933
				margin-right 0.15rem
</style>
