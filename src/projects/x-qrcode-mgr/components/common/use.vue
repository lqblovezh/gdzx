<script>
import {_addBooks} from "services/x-publish/digitalbooks"
import * as commonServices from 'services/x-qrcode/books'
import formSerialize from 'form-serialize'
import { circleMixin,publicMixin } from "@/util/mixins"
import * as services from 'services/x-qrcode/dissertation'

export default {
	mixins: [publicMixin],
	// props:['category',
	// 		'secondCate',],
	props: {
		detailData:Object,
		category:Array,
		resourceDialog: {
			type: Boolean,
			default: false,
		},
		singleElection: {
			//是否单选
			type: Boolean,
			default: true,
		},
		curSoucesList: {
			type: Array,
			default: []
		},
		isShowType: {
			//是否显示菜单切换栏目
			type: Boolean,
			default: false,
		},
		shelf:{
			type: Boolean,
			default: false
		},
		showButton:{
			type: Boolean,
			default: false
		},
		// currentType:{
		// 	type: String,
		// 	default: 'pictures'
		// },
	},
	data(){
		return {
			dataList: [],//列表信息
			page: null,
			currentType:'pictures',
			contentType: [
				{name:"图片集",value:'pictures'},
				{name:"音频集",value:'audios'},
				{name:"视频集",value:'videos'},
				{name:"文章集",value:'articles'},
				{name:"数字图书集",value:'books'},
				{name:"二维码",value:'qrcode'},
			],  //内容属性
		}
	},
	created() {
		if(this.type=="6"){
			this.contentType=[
				{name:"二维码",value:'qrcode'},
			]
		}else if(this.type!="6"){
			this.contentType=[
				{name:"图片集",value:'pictures'},
				{name:"音频集",value:'audios'},
				{name:"视频集",value:'videos'},
				{name:"文章集",value:'articles'},
				{name:"数字图书集",value:'books'},
			]
		}else{
			this.contentType=[
				{name:"图片集",value:'pictures'},
				{name:"音频集",value:'audios'},
				{name:"视频集",value:'videos'},
				{name:"文章集",value:'articles'},
				{name:"数字图书集",value:'books'},
				{name:"二维码",value:'qrcode'},
			]
		}
	},
	methods: {
		getList(pageNum=this.page&&this.page.num||1, pageOffset=this.page&&this.page.offset||10, query) {
			const data = {
				pageNum,
				pageOffset,
				...query,
				product_type: this.currentType,
			}
			commonServices.getMainList(data).then(res => {
				this.dataList = res.data
				this.page = res.page
			})
		},
		colse() {
			this.$emit('update:resourceDialog',false)
		},
		seareHandeler(){//条件查询
			let query = formSerialize(document.querySelector("#detailSearchForm" ) , {hash:true})
			this.getList(1 , this.page.offset , query)
		},
		async addSelection() {//添加选中
			const page = document.querySelector(".addBookForm")
			const list = page.querySelectorAll('input[name="ids"]:checked')
			let array = []
			if(!list.length) {
				return this.$message.warning('请选择添加内容')
			}
			for(let item of list) {
				let index = this.curSoucesList.findIndex(items => {
					return items.b_id == item.value||items.id == item.value
				})
				if(index > -1){
					continue
				}
				array.push(this.dataList.find(items => items.id == item.value))
			}
			this.$emit('select',array.map(item => item.id),array)
		},
		checkAll(e,name){//全选
			const parent = document.querySelector('.' + name)
			parent.querySelectorAll('input[name="ids"]').forEach((item, index) => {
				item.checked = e.target.checked
			})
		},
		uncheckedAll(e){
			if(!this.singleElection){
				this.$refs.ids.forEach(item => item.checked = false)
				e.target.checked = true
			}
		},
		isChecked(id) {//选中状态
			if(this.curSoucesList.findIndex(item => item.b_id === id||item.id === id||item.rel_id == id) > -1) {
				return true
			}
			return false
		},
		handleSizeChange(val) {//处理size变化
			let query = formSerialize(document.querySelector("#detailSearchForm" ) , {hash:true})
			this.getList(1, val, query)
		},
		handleCurrentChange(val) {//处理页码变化
			let query = formSerialize(document.querySelector("#detailSearchForm" ) , {hash:true})
			this.getList(val, this.page.offset, query)
		},
	},
	watch: {
		currentType(type) {
			this.getList(1)
		},
	}
}
</script>

<template lang="pug">
	div
		//- 添加
		el-dialog(
			:center="false"
			:visible="resourceDialog"
			width="1200px"
			top="50px"
			:show-close="false"
			append-to-body
			)
			.header(slot="title")
				span(class="el-icon-close" @click="colse")
				el-tabs(value="detail")
					el-tab-pane(label="添加" name="detail")
			el-form.addBookForm
				span.group-inline(style="margin:0 20px;" v-if="isShowType")
					el-radio-group(v-model="currentType")
						el-radio-button(v-for="item in contentType"  :key="item.id" :label="item.value" :value="item.value") {{item.name}}
				.serachWrap
					form#detailSearchForm
						span.group-inline
							input.form-control( placeholder="输入名称"  name="name" clearable)
						span.group-inline
							TimePick(:inputsName="['start_time','end_time']")
						span.group-inline.right
							el-button(@click="seareHandeler" type="primary" icon="el-icon-search" plain) 搜索
							el-button(@click="addSelection" type="primary" plain) 添加选中
				table.table(width="100%")
						thead
							tr
								th(width=80)
									input(v-if="singleElection" type="checkbox" @click="checkAll($event,'addBookForm')")
									span(v-text="singleElection?'全选':'选择'")
								th 名称
								th 标签
								//- th 类型
								th 创建时间
						tbody(v-if="dataList.length")
							tr(v-for="item,index in dataList")
								td
									input(type="checkbox" :data-type="item.status" @click="uncheckedAll($event,item)" :value="item.id" ref="ids" :checked="isChecked(item.id)" name="ids")
								td {{item.name}}
								td {{item.tag}}
								//- td {{item.type_name}}
								td {{item.create_time}}
				.pageWrap(v-if="page")
					el-pagination( :small="false" background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="page.num"
						:page-sizes="[10, 50, 100]"
						:page-size="page.offset"
						layout="total, sizes,prev, pager, next, jumper"
						:total="page.total"
					)
				//- el-dialog(
				//- :center="false"
				//- :visible="cateVis"
				//- v-if="cateVis"
				//- width="800px"
				//- append-to-body
				//- :show-close="true"
				//- )
				//- 	.content(slot="title")
				//- 		span 一级分类
				//- 		el-select(v-model="types.value")
				//- 			el-option(v-for="item in types.list"
				//- 			:key="item.id"
				//- 			:label="item.name"
				//- 			:value="item.id")
				//- 		span 二级分类
				//- 		el-select(v-model="options.value")
				//- 			el-option(v-for="item in options.list"
				//- 			:key="item.id"
				//- 			:label="item.name"
				//- 			:value="item.id")
				//- 		.btns
				//- 			el-button(type="primary" plain @click="cateVis=false") 取消
				//- 			el-button(type="primary" plain @click="submit") 确定
			div(slot="footer" class="dialog-footer")
				el-button(type="info"  @click="colse") 取消
				el-button(type="primary"  @click="addSelection") 确定
</template>


<style lang="stylus" scoped>
.content
	margin-top 30px
	height 100px
	.btns
		text-align right
		margin 10px 0
	span
		margin 10px
		line-height 30px
.el-icon-close
	position absolute
	cursor pointer
	float right
	display block
	width 20px
	height 20px
	right 20px
	z-index 2
</style>
