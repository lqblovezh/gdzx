<script>
import {main} from "@/util/mixins"
import {getResource,reset_paper} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return {
			total_score:0,
			ok_score:0,
		}
	},
	methods:{
		async getList(){
			let id = this.$route.query.resource_id
			this.$dialog.loading.open('加载数据中...')
			getResource({
				product_id:this.$route.query.qrcode_product_id,
				resource_id:id
			}).then(res=>{
				this.list = res.data.practice_list
				this.list.forEach(el=>{
					if(el.answer == el.user_answer.toString() || el.question_type=='subjective_item'){
						this.ok_score += Number(el.score)
					}
					this.total_score += Number(el.score)
				})
			})
			this.$dialog.loading.close()
		},
		reset(){
			reset_paper({
				id:this.$route.query.resource_id
			}).then(res=>{
				 this.to('/resource/qus',{...this.$route.query})
			})
		}
	},
	computed:{
		getType(){
			return function(type){
				if(type == 'multi') return '【多选题】'
				if(type == 'single') return '【单选题】'
				if(type == 'subjective_item') return '【主观题】'
				if(type == 'fill') return '【填空题】'
				if(type == 'judgment' ) return '【判断题】'
			}
		},
		getIndex(){
			return function(index,list){
				// console.log(list,index)
				if(list.length>10 && list.length<100){
					if(index<9){
						return '0'+(index+1)
					}
					return index+1
				}else if(list.length>100 && list.length<1000){
					if(index<9){
						return '00'+(index+1)
					}else if(index>9 && index<99){
						return '0'+(index+1)
					}else{
						return index+1
					}
				}
			}
		}
	}
}
</script>
<template lang="pug">
yd-layout.body
	yd-navbar(slot="navbar" title="在线测试" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content
		.infoMsg 点击题目可查看正确答案和解析，简答题默认满分
		.title 
			.name {{$route.query.name}}
			.dec 
				span.c5 总分：{{total_score}}
				span
					span.c5 得分：
					span.c2 {{ok_score}}
		ul.list 
			li(v-for="(item,i) in list" @click="to('/resource/qus',{n:i,...$route.query})")
				div.c2 {{getIndex(i,list)}}. {{getType(item.question_type)}}
				div.name(v-html="item.question" :class="item.answer!=item.user_answer.toString() && item.question_type!='subjective_item'?'c1':''")
	.handel(slot="tabbar")
		yd-button(size="large" bgcolor="#3998e2" color="#fff" @click.native="reset") 再做一次
</template>
<style lang="stylus" scoped>
.body 
	background #fff
.content
	padding 0.2rem 0.3rem
	.infoMsg
		color #b3b3b3
	.title
		padding 0.1rem 0
		.name 
			color #333333
			font-size 0.32rem
			text-align center
			padding 0.3rem 0
		.dec
			width 50%
			margin 0 auto
			display flex 
			justify-content space-between
.list 
	li  
		padding 0.2rem 0
		display flex
		font-size 0.26rem
		.name 
			>>>img 
				max-height 0.3rem
</style>
