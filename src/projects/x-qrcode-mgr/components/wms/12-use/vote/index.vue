<script>
import {
	main
} from '@/util/dyTool'
import formSerialize from 'form-serialize'
import * as service from "services/x-qrcode/vote/vote.js"
// import Detail from 'projects/common/readOnlyDetail'
import Detail from './detail'
import TimePick from '@/components/common/TimePick'

import {
	mapMutations,
	mapState
} from 'vuex'

export default {
	components: {
		Detail,
		TimePick
	},
	mixins: [main],
	data() {
		return {
			service,
			query:{
				name:'',
				start_time:'',
				end_time:'',
				status:'',
			},
			// detailVisible: false, // 详情框
			detailDialog: false,  //详情框
			detailDialoaType: 'info', //详情tabs类型
			detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
		}
	},
	methods: {
		opneDetailDialog(item){
			if(item){
				this.detailData=item
			}else{
				this.detailData = ''
			}
			this.detailDialog=true
		},
		dialogClose(){
			this.detailDialog= false
			this.getList()
		},
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
						.title
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="名称" v-model="query.name" name="name" clearable)
							span.group-inline
								TimePick(@getTime="getTime")
							span.group-inline
								select.form-control.width-small(v-model="query.status" placeholder="标签" name="status")
									option(value="") 全部
									option(value='true') 使用中
									option(value='false') 未使用
							span.group-inline.float-right
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="getList" plain ) 搜索
								//- el-button(size="mediu" type="primary" plain ) 新建
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 
									span(v-if="page" class="totalNum") ({{total}})
								.btns
									el-button(size="mini" type="primary" plain @click="opneDetailDialog('')") 新建
									el-button(size="mini" type="primary" @click="del($getChecked())" plain) 删除
						table.table
							thead
								tr
									th.table-check
										input(type="checkbox" @click="$checkAll($event)")
									th 名称
									th 创建时间
									th 使用状态
									th(width=250) 操作
							tbody(v-if="tableData")
								tr(v-for="item in tableData")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids")
									th
										img.cover-photo()
										.th-name.bookName(:title="item.name") {{item.name}}
									th
										.th-name {{item.create_time}}
									th
										.th-name {{item.status_name}}
									th
										.btns
											//- Icon(type="icon-detail" title="详情" @click="opneDetailDialog(item)")
											span(type="icon-detail" title="详情" @click="opneDetailDialog(item)") 详情&nbsp;&nbsp;
											//- Icon(type="icon-preview" title="报表" @click="$router.push({path:'/wms/statement',query:{pn:page.pageNum,id:item.id}})")
											span(type="icon-preview" title="报表" @click="$router.push({path:'/wms/statement',query:{pn:page.pageNum,id:item.id}})") 报表&nbsp;&nbsp;
											//- Icon(type="icon-delete" title="删除" @click="del(item.id)" v-if="!item.status")
											span(type="icon-delete" title="删除" @click="del(item.id)" v-if="!item.status") 删除
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
						.dialogs
							//- 详情
							el-dialog(
								:center="false"
								:visible.sync="detailDialog"
								append-to-body
								to="50px"
								width="1000px"
								)
								.content(slot="title")
									Detail(v-if="detailDialog"
                  type="info"
									@close="dialogClose"
									:detailData="detailData"
									:detailDialog.sync="detailDialog"
									)
</template>


<style lang="stylus" scoped>
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
.contList
	li
		display inline-block
		padding-right 10px
	.disabled
		color #bdbdbd
</style>
