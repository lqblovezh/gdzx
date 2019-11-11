<script>
import {
	main
} from '@/util/dyTool'
import * as service from 'services/x-qrcode/vote/attendLog'
import * as services from 'services/x-qrcode/qrcodePro'
export default {
	mixins: [main],
	data() {
		return {
			service,
			product:{},
			detailDialoaType: 'info', //详情tabs类型
			detailData: [], //详情数据 ,  包含id等基本信息, 更多的在详情里面查
			query:{
				id:this.$route.query.id,
				product_id:'',
			},
			chooseName:'全部',
			n:1,
			detailDialog:false,
			radioBtn:"投票人信息",
			questionInfoVisi:false, //问卷详情弹框
			page2:{
				pageOffset:10,
				pageNum:1,
			}
		}
	},
	mounted(){
		this.getPro()
	},
	methods: {
		getPro(){
			services.getList({
			pageOffset:this.page2.pageOffset,
			pageNum:this.page2.num
				}).then(res=>{
					this.page2 = res.page
					this.detailData = res.data
				})
		},
		opneDetailDialog(){
			this.detailDialog=true
		},
		choose(item){
			this.query.product_id = item.id 
			this.chooseName = item.name
			this.getList()
			this.detailDialog= false
		},
		detail(id){
			this.questionInfoVisi=true
			service.detail({id}).then(res=>{
				this.detailData = res.data
			})
		},
		sizeChange(val){
			this.page2.pageOffset = val ;
      this.getPro()
		},
		currentChange(val){
			this.page2.pageNum = val
			this.getPro()
		},
		educe(id){
			this.service.educe({id}).then(res => {
          this.$message.success(
            "任务创建成功，请前往'导入导出列表'页查看进度！"
          )
        })
        .catch(err => {
          this.$message.error('导出失败')
        })
		}
	},
}
</script>

<template lang="pug">
.index.clearfix
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						form#mainForm.clearfix
							el-button(type="primary" @click="$router.push({path:'/wms/questionnaire',query:{pn:$route.query.pn}})") 返回
							el-dialog(
								:center="false"
								:visible.sync="detailDialog"
								append-to-body
								title="所属产品"
								to="50px"
								width="600px"
								)
								ul.type
									li(@click="choose({id:'',name:'全部'})") 全部
									li(v-for="vo in detailData" @click="choose(vo)") {{vo.name}}
								.pageWrap
										el-pagination(
											:small="false" background
											@size-change="sizeChange"
											@current-change="currentChange"
											:current-page="page2.pageNum"
											:page-sizes="[10, 50, 100]"
											:page-size="page2.pageOffset"
											layout="total, sizes,prev, pager, next, jumper"
											:total="page2.total"
										)
							span.group-inline.float-right
								el-button(type="primary" plain @click="detailDialog=true") 所属产品 :{{chooseName}}
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(type="primary" plain @click="educe($route.query.id)") 导出
									el-button-group(v-model="radioBtn")
										el-button(type="primary" ) 投票人信息
										el-button(type="primary" plain @click="$router.push({path:'/wms/dataStatics',query:{pn:$route.query.pn,id:$route.query.id}})") 数据统计
						table.table
							thead
								tr
									th.table-check
										input(type="checkbox" @click="$checkAll($event)")
									th 昵称
									th 性别
									th 问卷时间
									th 电话
									th 操作
							tbody(v-if="tableData")
								tr(v-for="item in tableData")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids")
									th
										.th-name {{item.user_name}}
									th
										.th-name {{item.sex}}
									th {{item.update_time}}
									th {{item.phone}}
									th
										Icon(type="icon-detail" title="问卷详情" @click="detail(item.id)")
						//- 分页
						.pageWrap(v-if="page")
							el-pagination(
								:small="false" background
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="page.num"
								:page-sizes="[10, 50, 100]"
								:page-size="page.offset"
								layout="total, sizes,prev, pager, next, jumper"
								:total="page.total"
							)
						el-dialog(
							v-if="questionInfoVisi"
							:visible.sync="questionInfoVisi"
							top="50px"
							width="1000px"
							title="问卷调查"
							append-to-body
							)
							.questionnaire
								.title
									.userName {{detailData.user_name}}
									.time {{detailData.update_time}}
									.phone {{detailData.phone}}
								.quss
									.item(v-for="(item,i) in detailData.question") 
										.qus
											span 问题{{i+1}}：
											span {{item.question}}
										.ans
											el-checkbox-group(v-model="item.user_answer" v-if="item.type=='multi'")
												el-checkbox.checked(v-for="(vo,k) in item.option" :label="vo" :key="vo" disabled) 
													span 答案 {{k}}：
													span {{vo}}
											el-radio-group(v-model="item.user_answer[0]" v-if="item.type=='single'")
												el-radio.checked(v-for="(vo,k) in item.option" :label="vo" :key="vo" disabled)
													span 答案{{k}}：
													span {{vo}}

</template>

<style lang="stylus" scoped>
.questionnaire
	width 100%
	.title 
		display flex
		justify-content space-between
		padding 20px
.quss
	padding 10px 20px 20px
	.qus
		font-weight bold
	.ans
		padding 20px
		.checked
			display flex
			align-items center
			line-height 20px
.owner
	font-size 16px
	color #666
	margin-right 15px
.tableWrap
	width 97%
.form-control
	width 170px
.width-small
	width 100px
.el-dialog__wrapper
	.form-control
		margin-right 10px
		width 100px
		min-width @width
ul.type 
	display flex
	flex-wrap wrap
	li 
		padding 10px
		margin 10px
		border 1px solid #44c3aa
		cursor pointer
		border-radius 5px
		&:hover
			background #44c3aa
			color #fff
</style>
