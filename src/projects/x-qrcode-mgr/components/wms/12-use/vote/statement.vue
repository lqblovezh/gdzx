<script>
import {
	main
} from '@/util/dyTool'
import formSerialize from 'form-serialize'
import * as service from 'services/x-qrcode/vote/voteLog'
import * as services from 'services/x-qrcode/qrcodePro'
import Detail from './detail'

export default {
	components: {
		Detail,
	},
	mixins: [main],
	data() {
		return {
			service,
			// detailVisible: false, // 详情框
			detailDialog: false,  //详情框
			detailDialoaType: 'info', //详情tabs类型
			detailData: [], //详情数据 ,  包含id等基本信息, 更多的在详情里面查
			product:[],
			radioBtn:"投票人信息",
			query:{
				id:this.$route.query.id,
				type:'vote',
				product_id:''
			},
			chooseName:'全部',
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
	}
}
</script>

<template lang="pug">
.index.clearfix
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm.clearfix
							el-button(type="primary" @click="$router.push({path:'/wms/vote',query:{pn:$route.query.pn}})") 返回
							span.group-inline.float-right
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
								el-button(type="primary" plain @click="detailDialog=true") 所属产品 :{{chooseName}}
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 
									span(v-if="page" class="totalNum") ({{total}})
								.btns
									el-button( type="primary" plain @click="educe($route.query.id)") 导出
									el-button-group(v-model="radioBtn")
										el-button( type="primary") 投票人信息
										el-button(  type="primary" plain @click="$router.push({path:'/wms/statics',query:{pn:$route.query.pn,id:$route.query.id}})") 数据统计
						table.table
							thead
								tr
									th.table-check
										input(type="checkbox" @click="$checkAll($event)")
									th 昵称
									th 性别
									th 产品名称
									th 投票时间
									th 电话
									th 投票选项
							tbody(v-if="tableData")
								tr(v-for="item in tableData")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids")
									th
										.th-name {{item.user_name}}
									th 
										.th-name {{item.sex}}
									th 
										.th-name {{item.product_name}}
									th {{item.update_time}}
									th {{item.phone}}
									th {{item.answer}}
						//- 分页
						.pageWrap(v-if="page")
							el-pagination(
								:small="false" background
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
		margin 5px
		width 100px
		border 1px solid #44c3aa
		cursor pointer
		border-radius 5px
		overflow hidden
		text-overflow ellipsis
		white-space nowrap
		text-align center
		&:hover
			background #44c3aa
			color #fff
</style>
