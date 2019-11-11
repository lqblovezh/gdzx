<script>
import {
  main
} from '@/util/mixins'
import * as service from "services/x-teach/editorial"
import * as msg from "services/x-teach/msg"
import Private from './private'
import Detail from './detail'
export default {
  mixins: [main],
  componets: {
    Private,
    Detail,
  },
  data() {
    return {
			query:{
				nick_name:'',
				phone:'',
				company:'',
			},
			form:{
				profit_ratio:'',
				tags:'',
				id:''
			},
			msg:'',
			money:'',
			service,
			money_list:[],
      privateDialog: false, //私信框
      dialogVisible: false, //详情框
    }
	},
  methods: {
    handleSelectionChange(val) {
      this.ids = val.map(el => {
        return el.id
      })
      this.multipleSelection = val;
		},
		detail(id){
			this.service.detail({id}).then(res=>{
				this.detailData = res.data
				this.form.id = id
				if(res.data.app_setting){
					this.form.profit_ratio = res.data.app_setting.profit_ratio
				}else{
					this.form.profit_ratio=''
				}
			})
			//获取提现记录
			this.service.cashRecord({user_id:id}).then(res=>{
				this.money_list = res.data
			})
			this.$refs.child.dialogVisible= true
		},
		save(){
			if(isNaN(this.form.profit_ratio)){
				 this.$message.error('分销必须为数字')
				 return 
			}
      this.service.save(this.form).then(res=>{
         if(res.status){
					 this.$message.success('保存成功')
           this.getList({...this.query,...this.page})
         }
      },_=>{
				  this.$message.error('保存失败')
			});
			this.$refs.child.dialogVisible= false
    },
    showPrivaDialog(id) {
			this.service.detail({id}).then(res=>{
				this.detailData = res.data
				this.form.id = id
				if(res.data.app_setting){
					this.form.profit_ratio = res.data.app_setting.profit_ratio
				}else{
					this.form.profit_ratio=''
				}
			})
      this.privateDialog = true
		},
		sendMsg(){
			msg.save({
				to_user_id:this.form.id,
				type:'private_message',
				content:this.msg,
			}).then(res=>{
				 this.$message.success("消息发送成功")
				 this.msg=" "
			})
		},
    resetPass() {},
		lookRecord(){
			this.$router.push({
				path:'/wms/message/show',
				query:{id:this.form.id}
			})
		},
		addCash(id){
			this.service.addRecord({
				user_id:id,
				money:this.money
			})
		}
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
	.search(slot="search")
		el-input.dy_inputWidth(placeholder="姓名"  clearable v-model="query.nick_name")
		el-input.dy_inputWidth(placeholder="电话" clearable v-model="query.phone")
		el-input.dy_inputWidth(placeholder="单位" clearable v-model="query.company")
		el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)" ) 搜索
	.list(slot="list")
		el-table(ref="table"
			stripe
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		)
			el-table-column( type="selection" width="55" fixed)
			el-table-column( prop="nick_name" label="姓名")
			el-table-column( prop="phone" label="电话" )
			el-table-column( prop="company" label="单位")
			el-table-column( prop="duties" label="职务")
			el-table-column(label="操作" fixed="right")
				template(slot-scope="scope")
					Icon( title="详细信息" @click="detail(scope.row.id)")
					Icon( title="发私信" @click="showPrivaDialog(scope.row.id)")
					Icon( title="删除" @click="del([scope.row.id])")
					
		.dialogs
			//- 详情
			el-dialog(
				title="发送私信"
				:visible.sync="privateDialog"
				width="500px"
				:lock-scroll="false"
				:close-on-click-modal="false"
				center
				)
				.private()
					.div(style="text-align:right")
						.person
							span.name {{detailData.name}}
							a(@click="lookRecord") 查看私信记录
						.message
							el-input(type="textarea" :rows="6" v-model="msg" placeholder="请输入私信内容")
						el-button(type="primary"  size="small" plain @click="sendMsg") 发送
			el-dialog(
				:visible.sync="dialogVisible"
				:before-close="handleClose"
				)
	.detail(slot="detail")
		.bottom(v-if="detailData")
			.left
				.picture
					img(:src="detail.picture_absolute")
				el-form(style="width:200px;float:left" lable-width="40px") 
					el-form-item(label="姓名:"  style="margin-bottom:5px;float:left;" )
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.name" disabled)
					
					el-form-item(label="出生日:"  style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.date_of_birth" disabled)
					el-form-item(label="x-teach销售分成比例:"  style="margin-bottom:5px")
						el-input(autocomplete="off"  input-width="60px" style="float:left;margin-bottom:10px"  v-model="form.profit_ratio" )
							template(slot="append") %
					el-form-item(label="可提现金额:" style="margin-bottom:5px")
						el-input(autocomplete="off"  input-width="60px" style="float:left" v-model="detailData.balances" disabled)
					el-form-item(label="提现金额")
						.money
							el-input(input-width="60px" v-model="money")
							el-button(type="primary" @click="addCash(detailData.id)") 确定
			.center
				el-form(style="width:150px;float:left" lable-width="40px")
					el-form-item(label="性别:"  style="margin-bottom:5px" )
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.sex"  disabled)
					el-form-item(label="学历:"  style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.education" disabled)
					el-form-item(label="电话:"  style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.phone" disabled)
					el-form-item(label="邮箱:" style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" v-model="detailData.email" disabled)
					el-form-item(label="标签"  style="margin-bottom:5px" )
						el-input(autocomplete="off" input-width="60px" v-model="form.tags" placeholder="教师标签")
		
			.right
				el-form(style="width:150px;float:left")
					el-form-item(label="单位:"  style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" v-model="detailData.company" disabled)
					el-form-item(label="职务:"  style="margin-bottom:5px")
						el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detailData.duties" disabled)
					el-form-item(label="简介:"  style="margin-bottom:5px")
						el-input(autocomplete="off"   type="textarea" style="float:left; width:300px" rows="5" v-model="detailData.summary" disabled)
		.record
			.title 体现流水记录
			ul 
				li
					span 时间
					span 金额
				li(v-for="item in money_list")
					span {{item.create_time}}
					span {{item.money}}
</template>

<style lang="stylus" scoped>
.private .div
	padding 10px 10px 0 10px
	margin 0 auto
	.person
		height 50px
		line-height 50px
		font-size 16px
		color #333
		span
			float left
		.look
			float right
			color blue
			cursor pointer
	.message
		margin-bottom 15px
		textarea
			width 100%
			height 100px
.detail .bottom
	width 100%
	height 500px
	.left,.center,.right
		height 100%
		float left
		margin-right 10px
	.left
		width 49%
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
		width 22%
.record
	.title
		line-height 30px
		border-bottom 1px solid #e8e8e8
	ul 
		li 
			display flex
			line-height 35px
			span 
				width 50%
				padding 0 15px
				border-bottom 1px solid #e8e8e8
				&:not(:last-child)
					border-right 1px solid #e8e8e8
.money
	display flex
	width 200px
</style>
