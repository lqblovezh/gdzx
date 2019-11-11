<script>
import {main} from "@/util/mixins"
import {circle_list} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			list:[{},{}]
		}
	},
	methods:{
		getList(){
			this.$dialog.loading.open('加载数据中...')
			circle_list({}).then(res=>{
				this.list = res.data
				this.$dialog.loading.close()
			},err=>{
				this.$dialog.loading.close()
			})
		}
	}
}
</script>
<template lang="pug">
yd-layout
	yd-navbar(slot="navbar" title="书圈" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.scroll
		.content(slot="list")
			.list
				ul
					li(v-for="(item,i) in list" @click="to('/bookDetail',{id:item.id})")
						img(:src="item.img_src")
						.abstract
							.title {{item.name}}
							.txt {{item.abs}}
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
			img
				max-width 1.4rem
				max-height 1.4rem
				border-radius 0.08rem
		li:not(:last-child)
			border-bottom 0.01rem dashed #e8e8e8
</style>
