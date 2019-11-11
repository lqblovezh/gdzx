<script>
import {main} from "@/util/mixins"
import {getResource,answer_paper,reset_paper} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			n:this.$route.query.n || 0,
			is_answer: false,
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
					if(!Array.isArray(el.user_answer)){
						el.user_answer = []
					}
				})
				this.is_answer = res.data.is_answer_paper
			})
			this.$dialog.loading.close()
		},
		next(){
			this.n++
			if(this.n>= this.list.length){
				this.n = this.list.length-1
				this.$dialog.toast({
					mes: '已经是最后一题！',
					timeout: 1500
				})
			}
		},
		pre(){
			this.n--
			if(this.n<0){
				this.n=0
			}
		},
		sendData(){
			if(this.is_answer){
				this.$dialog.toast({
					mes: '你已提交过该试卷！',
					timeout: 1500
				})
				return
			}
			let status = false
			let formData = {
				product_id:this.$route.query.qrcode_product_id,
				resource_id:this.$route.query.resource_id,
				answer:[],
			}
			this.list.forEach(el=>{
					if(!el.user_answer.length){
						status = true
				 	}
			   formData.answer.push({
					 id:el.id,
					 answer:el.user_answer,
				 })
			})
			if(status){
				this.$dialog.confirm({
						title: '提示',
						mes: '你还有未填写的题目,是否提交！',
						opts: () => {
							this.saveData(formData)
						}
				});
				return
			}
			this.saveData(formData)
		},
		saveData(formData){
			answer_paper(formData).then(
				res=>{
					this.$dialog.toast({
					mes: '提交成功',
					timeout: 1500,
					icon: 'success'
					})
					this.to('/resource/list',{...this.$route.query})
				},
				err=>{
					this.$dialog.toast({
					mes: '提交失败',
					timeout: 1500,
					icon: 'error'
					})
				})
		},
		answer(item,ans){
			if(!Array.isArray(item.user_answer)){
				item.user_answer = ['']
			}
			switch(item.question_type){
				case 'multi' :
					let i = item.user_answer.findIndex((val,index,arr)=>{
						return val ==ans
					})
					if(i==-1){
						item.user_answer.push(ans)
					}else{
						item.user_answer.splice(0,1)
					}
					break;
				case 'judgment': 
				case 'single' : item.user_answer.splice(0,1,ans);break;
			}
		},
		reset(){
			reset_paper({
				id:this.$route.query.resource_id
			}).then(res=>{
				this.n=0
				this.$route.query.n =0
				this.getList()
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
		isTrue(){
			return function(arr,type){
				if(arr.includes(type)) return 'active'
			}
		}
	}
}
</script>
<template lang="pug">
yd-layout.body
	yd-navbar(slot="navbar" title="在线测试" color="#fff" bgcolor="#3998e2")
		span(@click="to('/resource',{...$route.query})" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content
		template(v-for="(item,i) in list" )
			.qus(v-show="i==n")
				.title 
					span.type.c2 {{getType(item.question_type)}}
					span.c5 {{item.score}}分
				span(v-html="item.question")
			ul.choose(v-show="i==n" v-if="item.question_type =='multi' || item.question_type=='single' ") 
				li(v-for="(vo,i) in item.option" @click="answer(item,['A','B','C','D','E','F','G','H'][i])")
					.lside(:class="isTrue(item.user_answer,['A','B','C','D','E','F','G','H'][i])") {{['A','B','C','D','E','F','G','H'][i]}}
					.rside
						.title(v-html="vo.title")
						img(:src="vo.img" v-if="vo.img")
			ul.choose(v-show="i==n" v-if="item.question_type=='judgment'")
				li( @click="answer(item,'A')")
					.lside(:class="isTrue(item.user_answer,'A')") A
					.rside
						.title 正确
				li(@click="answer(item,'B')")
					.lside(:class="isTrue(item.user_answer,'B')") B
					.rside
						.title 错误
			yd-textarea.textarea(v-show="i==n " v-model="item.user_answer[0]" placeholder="请输入答案" maxlength="100" v-if=" item.user_answer && (item.question_type =='fill' || item.question_type=='subjective_item')")
			.parse(v-show="i==n && is_answer") 
				.isTrue(v-if="item.answer==item.user_answer.toString() || item.question_type=='subjective_item'")
					span.icon
					span 正确
				.isTrue(v-else)
					span.err
					span.c1 错误,正确答案为 {{item.answer}}
				.describe
					div 解析：
					div(v-html="item.analysis")
		.btn
			yd-button(size="large" bgcolor="#3998e2" color="#fff" @click.native="sendData" v-if="!is_answer") 提交
			yd-button(size="large" bgcolor="#3998e2" color="#fff" @click.native="reset" v-else) 再做一次
	.handel(slot="tabbar")
		span.pre(@click="pre" v-show="n")
		span.next(@click="next" v-show="n+1<list.length")
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
		border-bottom 1px solid #e8e8e8
		padding-bottom 0.2rem
		display flex
		flex-wrap wrap
		>>>img
			max-width 100%
		.type 
			font-size 0.3rem
		.title 
			display flex
			width 100%
			margin-bottom 0.2rem
			justify-content space-between
	.choose
		li 
			display flex
			padding 0.2rem 0
		.lside 
			border-radius 0.6rem
			width 0.6rem
			height 0.6rem
			border 1px solid #3998e2
			text-align center
			line-height 0.6rem
			margin-right 0.2rem
		.active
			background #3998e2
			color #fff
		.rside
			flex 1
			.title
				padding 0.15rem 0
				line-height 0.3rem
				word-wrap break-word
				word-break break-all
			img
				max-width 3rem
				border-radius 0.05rem
.handel
	height 1rem
	padding 0 0.3rem
.pre,.next 
	display inline-block
	float left
	height 0.6rem
	width 0.6rem
	background url(../img/pre_qus.png) no-repeat center center
	background-size 100% 100%
	&:hover 
		background-image url(../img/pre_select.png)
.next
	float right
	background-image url(../img/next_qus.png)
	&:hover 
		background-image url(../img/next_select.png)
.parse
	padding 0.2rem
	margin-top 0.2rem
	background #f8f8f8
.describe
	line-height 0.4rem
	color #888
	display flex
.isTrue
	display flex 
	align-items center
	padding 0.2rem 0
	.icon,.err
		display inline-block
		height 0.4rem
		width 0.4rem
		background url(../img/ok.png) no-repeat center center
		background-size 100% 100%
		margin-right 0.2rem
	.err 
		background-image url(../img/err.png)
</style>
