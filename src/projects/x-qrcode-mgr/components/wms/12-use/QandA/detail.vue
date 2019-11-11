<script>
import Resource from '@/components/common/Resource'
import {main} from '@/util/dyTool'
import {getUseList} from "services/x-qrcode/dissertation"
import * as service from 'services/x-qrcode/vote/answer'
import {
  getTask
} from 'services/common'
export default {
	props: ['type', 'id', 'detailDialog', 'readOnly', 'defaultData'],
	components:{Resource},
	mixins: [main],
	data(){
		return{
			service,
			i:"",
			pageType:"detail",
			resourceDialog:false,
			useProduct:[],
		}
	},
	mounted(){
		if(this.id){
			this.detail(this.id)
		}else{
			this.detailData = {
				name:'',
				img:"",
				abs:'',
				img_src:'',
				
				questions:[{
					question:'',
					answer:'',
					resource_id:[],
					resource_info:[],
				}]
			}
		}
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
		add(){
			this.detailData.questions.push({answer:"",question:""})
		},
		async submitInfo(){
			let file = this.$refs.file.files[0]
			if(file){
				await getTask(file).then(res => {
					this.detailData.img = res.data.path
				})
			}
			service.save(this.detailData).then(res=>{
				this.$emit('close')
			})
			
		},
		delQus(i,item){
			service.delQus({id:[item.id]}).then(res=>{
				this.detailData.questions.splice(i,1)
				this.$message.success('删除成功！！')
			})
		},
		//文件上传
		getFile(e){
			log(this.detailData)
			this.detailData.img_src = URL.createObjectURL(e.target.files[0])
		},
		addRes(i){
			this.i = i 
			this.resourceDialog = true
		},
		addSelect(data,arr){
			let info = this.detailData.questions[this.i]
					if(!info.resource_info){
						info.resource_info = []
					}
			 		info.resource_info = this.array_del_repeat(info.resource_info.concat(arr),'id')
					info.resource_id = this.newArr(info.resource_info,'id')
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
		newArr(arr,key){
			return arr.map(res=>{
				return res[key]
			})
		},
		delRes(i,item){
			item.resource_id.splice(i,1)
			item.resource_info.splice(i,1)
		},
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
	el-tabs( :value="type||'info'" @tab-click="handleClick")
		//- 详情
		el-tab-pane( label="详情" name='info' )
			VaForm( ref="detailForm" )
				form.detailForm( ref="detailForm")
					fieldset(:disabled="readOnly")
						.group
							.label *封面:
							img.img(:src="detailData.img_src" v-if="detailData.img_src")
							.img(v-else @click="$refs.file.click()")
								i(class="el-icon-plus")
							input.hide(type="file" @change="getFile" ref="file")
						.group
							.label *名称:
							input.form-control( v-va="{ type:'required' }" v-model="detailData.name" type="text" maxlength="20" :disabled="readOnly")
						.group
							.label *简介:
							input.form-control( v-va="{ type:'required' }" v-model="detailData.abs" type="text" maxlength="20" :disabled="readOnly")
		
		//- 问答详情
		el-tab-pane( label="问答详情" name="QandA")
			table.table
				thead
					tr
						th 问题题目
						th 问题答案
						//- th 相关资源
						th 操作
				tbody
					tr(v-for="(item,i) in detailData.questions")
						td
							el-input(v-model="item.question")
						td 
							el-input(v-model="item.answer")
						//- td 
							.list(v-for="(vo,i) in item.resource_info")
								span {{vo.name || '未选择资源'}}
								Icon.delete(type="icon-delete" @click="delRes(i,item)" title="删除" v-if="vo.name")
							el-button.add(type="primary" size="mini" @click="addRes(i)") 添加资源
						td
							Icon(type="icon-delete" title="删除" @click="delQus(i,item)")
			.btns(v-if="!readOnly")
				el-button(type="primary" @click="add()" plain) 新增
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
		.btns(v-if="!readOnly")
			el-button(type="info" @click="$emit('update:detailDialog',false)") 取消
			el-button(@click="submitInfo" type="primary") 确定
</template>

<style lang="stylus" scoped>
ul
	padding 0 20px
	div
		>.answer,.operation
			padding 10px 0
			font-size 14px
		>.title
			font-size 16px
			color #333
	.left
		display inline-block
		width 60%
	.right
		display inline-block
		width 25%
.using
	.name
		line-height 30px
		font-size 16px
		color #333
		border-bottom 2px solid #dcdcdc
.form-control
	max-width 50px
.btns
	text-align right
	margin-top 20px
.img
	max-width 250px
	display inline-block
	max-height 200px
	min-height 100px
	min-width 150px
	font-size 40px
	color #999
	cursor pointer
	line-height 100px
	text-align center
	border 1px dashed #ccc
.btn
	margin-left 15px
	display inline-block
.delete 
	margin 0 10px
.list 
	line-height 20px
.add 
	margin 10px 0
</style>
