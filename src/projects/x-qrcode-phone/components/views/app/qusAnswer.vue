<script>
import {main} from "@/util/mixins"
import {get_content,questionnaire} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			toPath:"/qus",
			params:{},
		}
	},
	methods:{
		async getList(){
			let id = this.$route.query.id
			this.params = this.fetch()
			this.$dialog.loading.open('加载数据中...')
			if(id && !this.params.qus){
				await	get_content({id}).then(res=>{
				this.params = this.fetch()
				res.data.n = 0
				res.data.questions.map(el=>{
				})
					this.$set(this.params,'qus',{...this.$route.query,app_id:res.data.id,data:res.data})
				},err=>{
					this.$dialog.loading.close()
				})	
			}
			this.toPath = `/qus?id=${this.params.qus.id}&qrcode_product_id=${this.params.qus.qrcode_product_id}`
			this.info = this.params.qus.data
			this.$dialog.loading.close()
		},
		next(){
			this.info.n++
			if(this.n>= this.info.questions.length){
				this.info.n = this.info.questions.length-1
				this.$dialog.toast({
					mes: '已经是最后一题！',
					timeout: 1500
				})
			}
		},
		pre(){
			this.info.n--
			if(this.n<0){
				this.info.n=0
			}
		},
		sendData(){
			if(this.params.qus.data.is_answer){
				this.$dialog.toast({
					mes: '你已提交过该问卷！',
					timeout: 1500
				})
				return
			}
			let formData = {
				app_id : this.params.qus.app_id,
				qrcode_product_id:this.params.qus.qrcode_product_id,
				questionnaire_answer:[],
				type:'question_and_a'
			}
			let status = false
			this.info.questions.forEach(el=>{
					if(el.user_answer=='' || el.user_answer==[]){
						status = true
				 }
			   formData.questionnaire_answer.push({
					 questionnaire_answer_id:el.id,
					 answer:el.user_answer
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
			questionnaire(formData).then(
				res=>{
					this.$dialog.toast({
					mes: '提交成功',
					timeout: 1500,
					icon: 'success'
					})
					this.info.is_answer = true
				},
				err=>{
					this.$dialog.toast({
					mes: '提交失败',
					timeout: 1500,
					icon: 'error'
					})
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
	.content(v-if="info.questions")
		template(v-for="(item,i) in info.questions")
			.group(v-show="i==info.n")
				.qus
					span.c4 问题 {{i+1}}
					span {{item.question}}
				.ans
					.txt 
						span(v-if="info.is_answer") 答：{{item.answer}}
						yd-textarea.textarea(slot="right" v-else v-model="item.user_answer" placeholder="请填写答案" maxlength="500")
					//- .dependent 
						.left 相关资源：
						ul 
							li(v-for="item in item.resource_info" @click="to('gather',{qrcode_id,id:item.id,name:item.name,type:'home_resource'})") {{item.name}}
		.handel
			span.pre(@click="pre" v-if="info.questions && info.n>0") 上一题 
			span.next(@click="next" v-if="info.questions && info.n<info.questions.length-1") 下一题
		.btn
			yd-button(size="large" bgcolor="#3998e2" color="#fff" @click.native="sendData" ) 提交调查
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
	.ans
		background #f5f5f5
		font-size 0.28rem
		color #808080
		line-height 0.5rem
		text-align justify
		padding  0.2rem
		border-radius 0.1rem
	.dependent
		display flex
		margin-top 0.15rem
		.left 
			margin-right 0.1rem
		ul 
			color #3496e1
.textarea
	padding 0.1rem 0.2rem 0
.handel 
	text-align right
	.next,.pre
		color #3496e1
		background url('./img/next.png') right 0.05rem no-repeat	
		background-size  auto 80%
		padding 0 0.3rem
		margin-top 0.2rem
		display inline-block
	.pre 
		background url('./img/pre.png') left 0.05rem no-repeat
		background-size  auto 80%	
	.btn
		padding-top 0.3rem
</style>
