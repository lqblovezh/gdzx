<script>
import {main} from "@/util/mixins"
import {get_content,questionnaire,get_app_info} from "services/x-qrcode/phone"
export default {
	mixins:[main],
	data(){
		return{
			params:{},
		}
	},
	methods:{
		async getList(){
			let id = this.$route.query.id
			this.$dialog.loading.open('加载数据中...')
			this.params = this.fetch()
			if(this.$route.query.type && id && !this.params.ans){
					get_app_info({id:id,qrcode_product_id:this.$route.query.qrcode_product_id}).then(res=>{
						this.params = this.fetch()
						res.data.n = 0
						this.$set(this.params,'ans',{is_answer:res.data.is_answer,id:res.data.id,qrcode_product_id:this.$route.query.qrcode_product_id,data:res.data})
					},err=>{
						this.$dialog.loading.close()
					})
			}else{
				if(id && !this.params.ans){
					await	get_content({id}).then(res=>{
					this.params = this.fetch()
					res.data.n = 0
					this.$set(this.params,'ans',{is_answer:res.data.is_answer,id:res.data.id,qrcode_product_id:this.$route.query.qrcode_product_id,data:res.data})
					},err=>{
						this.$dialog.loading.close()
					})	
				}
			}
			this.$dialog.loading.close()
			this.info = this.params.ans.data
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
			if(this.params.ans.is_answer){
				this.$dialog.toast({
					mes: '你已提交过该问卷！',
					timeout: 1500
				})
				return
			}
			let formData = {
				app_id : this.params.ans.id,
				qrcode_product_id:this.params.ans.qrcode_product_id,
				questionnaire_answer:[],
				type:'questionnaire'
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
					this.params.ans.is_answer = true
				},
				err=>{
					console.log(err.errors)
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
	yd-navbar(slot="navbar" title="问卷调查" color="#fff" bgcolor="#3998e2")
		a(href="javascript:history.back(-1)" slot="left")
			yd-navbar-back-icon(color="#fff") 返回
	.content(v-if="info.questions")
		template(v-for="(item,i) in info.questions" )
			.qus(v-show="i==info.n") 
				span {{i+1+'、'+item.question}}
				yd-radio-group.group(v-show="item.type=='single'" v-model="item.user_answer[0]"  color="#3998e2")
					yd-radio.radio(:val="vo" v-for="(vo,k) in item.option" :disabled="params.ans.is_answer" ) {{vo}} 
				yd-checkbox-group.group(v-show="item.type!='single'" v-model="item.user_answer"  color="#3998e2" @callback="save(params)")
					yd-checkbox.radio(:val="vo" v-for="(vo,k) in item.option" :disabled="params.ans.is_answer") {{vo}}
			//- .dependent(v-show="i==info.n") 
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
		border-bottom 1px solid #e8e8e8
		padding-bottom 0.2rem
		.type
			color #808080
			margin-left 0.2rem
	.group 
		margin-top 0.2rem
	.radio
		line-height 0.3rem
		display block
		padding 0.2rem 0
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
.dependent
	display flex
	margin-top 0.15rem
	.left 
		margin-right 0.1rem
	ul 
		color #3496e1
</style>
