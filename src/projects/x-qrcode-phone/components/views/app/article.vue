<script>
import {main} from "@/util/mixins"
import {get_content} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			params:{gather:{}}
		}
	},
	methods:{
		getList(){
			this.params = this.fetch()
			let gather = this.params.gather
			this.info = gather.data.components[gather.n]
		},
	}
}
</script>
<template lang="pug">
yd-layout.body
	yd-navbar(slot="navbar" :title="info.name" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content(v-html="unescapeHTML(info.preview)")
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
