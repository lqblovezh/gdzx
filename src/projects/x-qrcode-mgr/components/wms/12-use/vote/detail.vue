<script>
import Resource from '@/components/common/Resource'
import formSerialize from 'form-serialize'
import * as myServices from "services/x-qrcode/vote/vote"
import {getUseList} from "services/x-qrcode/dissertation"
import { Server } from 'tls';
export default {
	props: ['type', 'detailData', 'detailDialog', 'readOnly', 'defaultData'],
	components:{Resource},
	data(){
		return{
			radio: 0 ,
			resource:[],
			voteAnswer:[],
			name:'',
			id:'',
			res:[],
			useProduct:[],
			resourceDialog:false, //添加资源弹框
		}
	},
	created(){
		if(!this.detailData){
			return
		}
		myServices.detail({id:this.detailData.id}).then(res=>{
			this.res = res.data.constitute
			this.name = res.data.name
			this.id = res.data.id
			this.voteAnswer = res.data.answer
			this.resource = res.data.constitute.map(res=>{
				return res.info
			})
		})
		myServices.usedVote({id:this.detailData.id}).then(res=>{
			
		})
	},
	methods:{
		handleClick(tab, event) {
			if (tab.name == 'qrcode') {
				getUseList({special_id:this.id}).then(res=>{
					console.log(res)
					this.useProduct = res.data
				})
			}
		},
		addSelect(data,arr){
			this.resource = this.array_del_repeat(this.resource.concat(arr),'id')
			this.resourceDialog = false
		},
		//根据某个键去重数组对象
		array_del_repeat(arr,key){
			let obj = {}
			arr=arr.reduce((item, next)=>{
				obj[next[key]] ? '' : obj[next[key]] = true && item.push(next)
				return item;
			}, [])
			return arr  
		},
		addAnswer(){
			let len = this.voteAnswer.length
			if(len && !this.voteAnswer[len-1].answer){
				this.$message.warning('请先填写')
				this.$refs.answer[len-1].focus()
				return 
			}
			this.voteAnswer.push({answer:'',option:''})
		},
		remove(data,i,state){
			if(state){
				myServices.delRes({id:this.res[i].id}).then(res=>{
					if(res.status){
						data.splice(i,1)
					}
				})
				return
			}
			data.splice(i,1)
		},
		newArr(arr,key){
			return arr.map(res=>{
				return res[key]
			})
		},
		submitInfo(){
			//  !this.newArr(this.resource,'id').length
			if(!this.name  || !this.voteAnswer.length){
				return this.$message.warning('相关信未填写完整！')
			}
			let data = {
				name:this.name,
				resource_ids: this.newArr(this.resource,'id'),
				answer: this.voteAnswer,
				id:this.id,
			}
			myServices.save(data).then(res=>{
				if(res.status){
					this.$emit('close')
				}
			})
			.catch(({payload}) => {
				for(let i in payload.messages){
					this.$message.error(payload.messages[i])
					break
				}
			})
		}
	},
}
</script>

<template lang="pug">
.div
	el-tabs( :value="type" @tab-click="handleClick")
		Resource(
			v-if="resourceDialog"
			:resourceDialog.sync="resourceDialog"
			:curSoucesList="[]"
			@select="addSelect"
			:isShowType="true"
			)
		//- 详情
		el-tab-pane( label="详情" name='info' )
			VaForm( ref="detailForm" )
				form.detailForm( ref="detailForms" )
					fieldset(:disabled="readOnly")
						.group
							.label * 投票名称:
							input.form-control( v-va="{ type:'required' }" v-model="name"  type="text" maxlength="20" :disabled="readOnly")
						//- .group
							.label * 投票资源:
							.res
								.item(v-for="(item,index) in resource")
									input.form-control( disabled=true v-model="item.name" )
									input.form-control.hide(  v-model="item.id" )
									el-button(type="danger" plain @click="remove(resource,index,true)" size="small" v-if="!detailData") 删除
								.item 
									el-button(type="primary" plain @click="resourceDialog=true" size="mini" v-if="!detailData") 新增资源
						.group
							.label * 投票答案:
							.res
								.item(v-for="(item,i) in voteAnswer")
									el-radio(v-model="item.option"  :label="item.option")
										input.form-control(v-model="item.answer"  ref="answer")
										el-button(type="danger" plain size="small" @click="remove(voteAnswer,i)" ) 删除
								.item
									el-button(type="primary" plain size="mini" @click="addAnswer" ) 新增投票答案
				.btns(v-if="!readOnly")
					el-button(type="info" @click="$emit('update:detailDialog',false)") 取消
					el-button(@click="submitInfo('detailForms')" type="primary" ) 确定
		//- 二维码使用中产品
		el-tab-pane( label="使用中产品" name="qrcode")
			table.table
				thead
					tr
						th 二维码
						th 产品名称
						th 产品简介
						th 创建时间
				tbody
					tr(v-if="!useProduct.length") 
						td.noMsg(colspan="4" align="center") 暂无相关数据
					tr(v-for="item in useProduct")
						td
							img.cover-photo(:src="item.img_src")
							.th-name.bookName()
						td {{item.name}}
						td {{item.abs}}
						td {{item.create_time}}
</template>

<style lang="stylus" scoped>
>>> .el-radio
	line-height 40px
	margin 0 15px
.form-control
	max-width 300px
	width 300px
	margin-right 10px
>>> .el-checkbox__label
	line-height 35px
>>> .el-checkbox-group
	display inline-block
	width calc(100% - 150px)
>>>.el-checkbox+.el-checkbox
	line-height 35px
.btns
	text-align right
	margin-top 20px
.img
	max-width 250px
	max-height 200px
.btn
	margin-left 15px
	display inline-block
.detailForm
	font-size 15px
.res 
	display inline-block
	width 400px
</style>
