<script>
import {main} from "@/util/dyTool"
import * as service from 'services/x-qrcode/resource'
import * as service2 from 'services/x-qrcode/dissertation'
export default {
	mixins: [main],
	props:['resourceDialog'],
	data(){
		return {
			service,
			activeName:'books',
			tabs:[  //切换按钮
				{key:"books",value:"数组图书集"},
				{key:"special",value:"专题"}
			],
			currentType:'books',
			query:{
				// name:'',
				// start_time:'',
				// end_time:'',
				// status:'',
				product_type: 'books'
			}
		}
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab.name);
		},
		handleSelectionChange(){

		},
		add(row){
			row.currentType = this.currentType
			this.$emit('select',row)
		},
		change(){
			if(this.currentType == "books"){
				this.service = service
			}else{
				this.service = service2
			}
			this.page.pageNum = 1
			this.getList()
			this.$emit('setType',this.currentType)
		}
	},
	watch: {
	  
	}
}
</script>

<template lang="pug">
el-dialog(
	:visible.sync="resourceDialog",
	width="1000px"
	append-to-body
)
	.content
		el-radio-group(v-model="currentType" @change="change")
			el-radio-button(label="books" ) 数组图书集
			el-radio-button(label="special") 专题
		el-table(ref="table" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange")
			//el-table-column(type="selection" width="55")
			el-table-column(label="名称" prop="name" width="300")
			el-table-column(label="价格" prop="price")
			el-table-column(label="日期" width="220")
				template(slot-scope="scope") {{scope.row.update_time}}
			el-table-column(label="操作")
				template(slot-scope="scope")
					el-button(size="mini" type="primary" @click="add(scope.row)") 添加
	span(slot="footer")
		.page
			el-pagination(
				:small="false" 
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="page.pageNum"
				:page-sizes="[10, 50, 100]"
				:page-size="page.pageOffset"
				layout="total, sizes,prev, pager, next, jumper"
				:total="total"
			)
</template>
<style lang="stylus" scoped>
.page 
	text-align center

</style>

