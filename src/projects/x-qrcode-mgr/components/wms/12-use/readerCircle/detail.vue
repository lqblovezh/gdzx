<script>
import Resource from './resource'
import {getUseList} from "services/x-qrcode/dissertation"
import {
	main
} from '@/util/dyTool'
import * as service from 'services/x-qrcode/vote/readerCircle'
export default {
  props: ['type', 'id', 'detailDialog', 'readOnly', 'defaultData'],
  components: {
    Resource
	},
	mixins: [main],
  data() {
    return {
			service,
			activeName:'',
			dialogVisible:false,
			resourceDialog:false,
			cover: null, //书籍或专题封面
			discussData:[],
			themeDetailData:[],
			rules:{
				name:{ required: true, message: '书圈名不能为空', trigger: 'blur' },
				abs:{ required: true, message: '简介不能为空', trigger: 'blur' },
			},
			useProduct:[],
    }
	},
	mounted(){
		if(this.id){
			this.detail(this.id)
		}else{
			this.detailData = {
				name:'',
				abs:'',
				img:'',
				img_src:'',
				type:"", //books =》数组图书集   special=>专题
				resource_id:""
			}
		}
	},
  methods: {
    handleClick(tab, event) {
      if(tab.name == 'discuss' && !this.discussData.length){
			 	service.themeList({id:this.id}).then(res=>{
					this.discussData = res.data
				})
			}
			if (tab.name == 'qrcode') {
				getUseList({special_id:this.id}).then(res=>{
					console.log(res)
					this.useProduct = res.data
				})
			}
    },
		thumbsup(item){ //点赞
			log("munber")
		},
		replay(){ //回复

		},
		addSelect(row){
			this.detailData.type = row.currentType
			this.detailData.img_src =  row.img_src
			this.detailData.resource_id = row.id
			this.resourceDialog = false
		},
		setType(type){
			this.detailData.type = type
		},
		submitInfo(){
			service.save(this.detailData).then(res=>{
				this.$emit('close')
			})
		},
		discussDetail(id){
			this.dialogVisible = true
			service.themeDetail({id}).then(res=>{
				this.themeDetailData = res.data
			})
		},
		delTheme(scope){
			service.delTheme({id:scope.row.id}).then(res=>{
				this.discussData.splice(scope.$index,1)
			})
		},
		delMsg(id){
			service.delMsg({id}).then(res=>{
				
			})
		}
  },
}
</script>

<template lang="pug">
.div
	el-tabs( :value="type||'info'" @tab-click="handleClick")
		Resource(
			v-if="resourceDialog"
			:resourceDialog.sync="resourceDialog"
			:curSoucesList="[]"
			@select="addSelect"
			:isShowType="true"
			@close="resourceDialog=false"
			@setType="setType"
			)
		//- 详情
		el-tab-pane( label="详情" name='info' )
			el-form.form(:rules="rules" ref="ruleForm" label-width="90px")
				el-form-item(label="名称：")
					.img(@click="resourceDialog=true" :style="{backgroundImage:'url(' + detailData.img_src + ')'}")
						i(class="el-icon-plus" v-if="!detailData.img_src")
				el-form-item(label="书圈名称：")  
					el-input.w(v-model="detailData.name" prop="name") 
				el-form-item(label="简介：")
					el-input.w(v-model="detailData.abs" prop="abs")
		el-tab-pane(label="使用中产品" name="qrcode" v-if="id")
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
		//- 讨论区
		el-tab-pane( label="讨论区" name="discuss" v-if="id")
			//- 回复
			el-dialog(
				:center="false"
				:visible.sync="dialogVisible"
				append-to-body
				to="50px"
				width="1000px"
				)
				span(slot="title") 消息详情
				ul.msg
					li.noMsg(v-if="!themeDetailData.length") 暂无消息
					li(v-for="item in themeDetailData")
						.pic(:style="{backgroundImage:'url(' + item.picture_absolute + ')'}")
						.tf 
							.title  
								span {{item.form_user_name || '无法获取名称'}}
								span.handel 
									el-button( type="primary" size="mini") 点赞
									el-button(type="danger" size="mini" @click="delMsg(item.id)") 删除
							.content {{item.content}}
							ul.backMsg
								span 所有回复 ({{item.children.length}})
								li(v-for="vo in item.children")
									.pic(:style="{backgroundImage:'url(' + vo.picture_absolute + ')'}")
									.tf 
										.title  
											span {{vo.form_user_name || '无法获取名称'}}
											span.handel 
												i.danger(class="el-icon-delete" @click="delMsg(vo.id)")
										.content {{vo.content}}
			//- 表格
			el-table(ref="table" :data="discussData" tooltip-effect="dark" @selection-change="handleSelectionChange")
				el-table-column(type="selection" width="55")
				el-table-column(label="用户昵称" prop="user_name" width="100")
				el-table-column(label="手机号" prop="phone")
				el-table-column(label="时间" width="220" prop="update_time")
				el-table-column(label="主题内容" width="220")
					template(slot-scope="scope")
						el-popover(
							placement="top-start"
							title=""
							width="160"
							trigger="hover"
							:content="scope.row.abs")
							span.t_overflow(slot="reference") {{scope.row.abs}}
				el-table-column(label="操作")
					template(slot-scope="scope")
						el-button(size="mini" type="primary" @click="discussDetail(scope.row.id)") 详情
						el-button(size="mini" type="danger" @click="delTheme(scope)") 删除
		.btns(v-if="!readOnly")
			el-button(type="info" size="small" @click="$emit('update:detailDialog',false)") 取消
			el-button(@click="submitInfo()" size="small" type="primary") 确定
</template>

<style lang="stylus" scoped>
.discuss
	border 1px solid red
.form-control
	max-width 50px
.btns
	text-align right
	margin-top 20px
.group
	display flex
.img
	max-width 250px
	max-height 200px
	min-width 150px
	min-height 100px
	text-align center
	cursor pointer
	line-height 100px
	font-size 40px
	background center center no-repeat
	background-size 100% auto
	color #ccc
	border 1px solid #ccc
.w 
	max-width 300px
.btn
	margin-left 15px
	display inline-block
.t_overflow 
	overflow hidden
	text-overflow ellipsis
	white-space nowrap
.danger
	color #f00
	cursor pointer

.msg
	padding 10px 0
	border 1px dashed #e8e8e8
	.noMsg
		color #999
		display block
		text-align center
	li
		padding 0 20px
		display flex
		&:not(:last-child) 
			border-bottom 1px solid #ccc
		.pic 
			height 80px
			width 80px
			border 1px dashed #e8e8e8
			border-radius 80px
			background center center no-repeat
			background-size 100% auto
			margin-right 15px
		.tf
			flex 1
			.title 
				display flex 
				line-height 30px
				font-weight bold
				margin-bottom 10px
				justify-content space-between
			.content
				padding-bottom 10px
				border-bottom 1px solid #ccc
		.backMsg
			padding 15px 0
			.content 
				border none
</style>
