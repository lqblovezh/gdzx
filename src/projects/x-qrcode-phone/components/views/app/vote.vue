<script>
import {main} from "@/util/mixins"
import {get_content,vote} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			total:100,
			is_answer:false,
			n:0,
			formData:{
				id:'',
				qrcode_product_id:'',
				answer:'',
				type:'vote',
			}
		}
	},
	methods:{
		getList(){
			let id = this.$route.query.id
			this.formData.qrcode_product_id = this.$route.query.qrcode_product_id
			get_content({id}).then(res=>{
				this.info = res.data
				this.formData.id = res.data.id
				let total=0
				for(var key in this.info.answer){
					total+=this.info.answer[key].count
					if(this.info.answer[key].is_answer){
						this.is_answer = true
						this.n = key
					}
				}
				total>this.total?this.total=total:null
				this.info.answer.map(el => {
					 el.progress = el.count/this.total
					 return el
				})
			})
		},
		sendVote(answer){
			this.formData.answer = answer
			vote(this.formData).then(res=>{
				if(res.status){
					this.getList()
					this.$dialog.toast({
						mes: '投票成功',
						timeout: 1500,
						icon: 'success'
					})
				}
			}).catch(err=>{
				this.$dialog.toast({
					mes: '投票失败',
					timeout: 1500,
					icon: 'error',
				})
			})
		}
	}
}
</script>
<template lang="pug">
yd-layout.body
	yd-navbar(slot="navbar" title="投票" color="#fff" bgcolor="#ff6955")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content
		.qus 
			span {{info.name}}
		//- .dependent 
				.left 相关资源：
				ul 
					li(v-for="item in info.constitute" @click="to('gather',{qrcode_id,id:item.id,name:item.name,type:'home_resource'})") {{item.info.name}}
		ul.voteChoose 
			li(v-for="item in info.answer")
				.info
					//img.tx(src="http://img2.imgtn.bdimg.com/it/u=3135339935,1064367009&fm=26&gp=0.jpg")
					.vote
						span.ans {{item.answer}}
						yd-progressbar.pro(type="line" :progress="item.progress" trail-width="3" trail-color="#FE5D51")
						span.total
							span.c1 {{item.count}}
							span 票
				.btn
					yd-button(size="mini" color="#fff" bgcolor="#ff6955" v-if="!is_answer" @click.native="sendVote(item.answer)") 投票
					yd-button(size="mini" type="disabled" disabled v-else) 投票
		.msgInfo(v-if="is_answer && info.answer") 
			span.c1 注： 
			span 你已经为 
			span.c1 {{info.answer[n].answer}} 
			span 投票
		//.send
			yd-button(size="large" color="#fff" bgcolor="#ff6955") 提交 
</template>
<style lang="stylus" scoped>
.body 
	background #fff
.content
	background #fff
	font-size 0.28rem
	padding 0.3rem
	.qus
		line-height 0.4rem
		padding 0.1rem 0
		font-size 0.3rem
	.c4 
		margin-right 0.3rem
	.dependent
		display flex
		border-bottom 1px solid #e8e8e8
		padding-bottom 0.25rem
		.left 
			margin-right 0.1rem
			color #808080
		ul 
			color #3496e1
	.voteChoose
		margin 0.1rem 0
		li 
			background #f7f7f7
			padding 0.4rem 0.1rem
			margin-bottom 0.2rem
			.btn 
				display flex 
				justify-content flex-end
			.info
				display flex
				margin-bottom 0.2rem
			img 
				height 1.14rem
				width 1.14rem
				border-radius 1.14rem
				margin-right 0.2rem
			.vote
				display flex
				
				>span
					min-width 0.6rem
				.ans 
					width 2rem
				.total
					width 1.4rem
				.pro 
					margin -0.04rem  0.2rem 0 0.2rem
</style>
