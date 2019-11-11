<script>
import {
  main
} from '@/util/mixins'
import * as service from "services/x-teach/audit"
import Detail from './detail'
export default {
	mixins: [main],
	components:{
		Detail
	},
  data() {
    return {
			query:{
				nick_name:'',
				phone:'',
				company:'',
      },
			service,
			form:{
				profit_ratio:'',
				id:''
			},
      dialogVisible: false, //详情框
      passVisible: false, //通过模态框
    }
  },
  methods: {
		detail(id){
			this.service.detail({id}).then(res=>{
				this.detailData = res.data
				this.form.id = id
				if(res.data.user_info && res.data.user_info.app_setting){
					this.form.profit_ratio = res.data.user_info.app_setting.profit_ratio
				}else{
					this.form.profit_ratio=''
				}
			})
			this.$refs.child.dialogVisible= true
		},
		save(){
			this.$refs.child.dialogVisible= false
    },
    pass(id) {
      service.audit({
				passed: 1,
				id
			}).then(res=>{
				this.getList({...this.query,...this.page})
				this.$message.success('你已同意该列表通过')
			},err=>{
				this.$message.error('操作失败,未知原因')
			})
    },
		reject(id) {
			service.audit({
				passed: 0,
				id
			}).then(res=>{
				this.getList({...this.query,...this.page})
				this.$message.success('你已驳回该列表通过')
			},err=>{
				this.$message.error('操作失败,未知原因')
			})
    },
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
	.search(slot="search")
		el-input.dy_inputWidth(placeholder="姓名"  clearable v-model="query.nick_name")
		el-input.dy_inputWidth(placeholder="电话" clearable v-model="query.phone")
		el-input.dy_inputWidth(placeholder="单位" clearable v-model="query.company")
		el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
	.list(slot="list")
		el-table(ref="table"
			stripe
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		)
			el-table-column( type="selection" width="55" fixed)
			el-table-column( prop="user_info.nick_name" label="姓名")
			el-table-column( prop="user_info.phone" label="电话" )
			el-table-column( prop="user_info.company" label="单位")
			el-table-column( prop="user_info.duties" label="职务")
			el-table-column(label="操作" fixed="right")
				template(slot-scope="scope")
					el-button(type="primary" size="small" @click="detail(scope.row.id)") 详细
					el-button(type="success"  size="small" @click="pass(scope.row.id)" v-if="scope.row.status==0") 通过
					el-button(type="info" size="small" @click="reject(scope.row.id)" v-if="scope.row.status==0") 驳回
	div(slot="detail")
		.bottom(v-if="detailData.user_info")
			.left
				.picture
					img(:src="detailData.user_info.picture_absolute")
				el-form(style="width:200px;float:left") 
					el-form-item(label="姓名:" lable-width="40px" style="margin-bottom:5px;float:left;" )
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.user_info.name" disabled)
					el-form-item(label="性别:" lable-width="40px" style="margin-bottom:5px" )
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.user_info.sex"  disabled)
					el-form-item(label="出生日:" lable-width="40px" style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.user_info.date_of_birth" disabled)
					el-form-item(label="x-teach销售分成比例:" lable-width="40px" style="margin-bottom:5px")
						el-input(autocomplete="off"  input-width="60px" style="float:left;margin-bottom:10px" disabled  v-model="form.profit_ratio" )
							template(slot="append") %
					el-form-item(label="可提现金额:" lable-width="40px" style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.user_info.balance" disabled)
			.center
				el-form(style="width:150px;float:left")
					el-form-item(label="学历:" lable-width="40px" style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.user_info.education" disabled)
					el-form-item(label="电话:" lable-width="40px" style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.user_info.phone" disabled)
					el-form-item(label="邮箱:" lable-width="40px" style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" v-model="detailData.user_info.email" )
					el-form-item(label="标签" lable-width="40px" style="margin-bottom:5px" )
						el-input(autocomplete="off" input-width="60px" v-model="detailData.user_info.tags" disabled)
					el-form-item(label="单位:" lable-width="40px" style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" v-model="detailData.user_info.company" disabled)
			.right
				el-form(style="width:150px;float:left")
					el-form-item(label="职务:" lable-width="40px" style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.user_info.duties" disabled)
					el-form-item(label="简介:" lable-width="40px" style="margin-bottom:5px")
						el-input(autocomplete="off"   type="textarea" style="float:left; width:300px" rows="5" v-model="detailData.user_info.summary" disabled)
</template>

<style lang="stylus" scoped>
.bottom
	width 100%
	height 500px
	.left,.center,.right
		height 100%
		float left
		margin-right 10px
	.left
		width 39%
		margin-left 20px
		.picture
			width 100px
			height 100px
			margin 10px 20px 0 5px
			float left
			img
				height 100px
				width 100px
				
				background-size 100px 100px
				border-radius: 50%;
	.center
		width 22%
	.right
		width 32%

</style>
