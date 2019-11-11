<script>
import {
	main
} from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/recycle'
import Detail from 'projects/common/readOnlyDetail'
// import Detail from './detail'

import {
	mapMutations,
	mapState
} from 'vuex'

export default {
	components: {
		Detail,
	},
	mixins: [main],
	data() {
		return {
			services,
			detailVisible: false, // 详情框
			detailDialoaType: 'info', //详情tabs类型
			detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
			searchQuery: {},
		}
	},
	methods: {
		reset(id){ //恢复二维码
			let ids = [];
			if (id) {
				ids.push(id)
			} else {
				ids = this.$getChecked();
				if (!ids) {
					return
				}
			}
			services.reset({id:ids}).then(res=>{
				this.getList()
			})
		},
		setList(data) {
			//设置列表
			this.setSerieslist(data)
		},
		setPage(data) {
			//设置页码
			this.setSerieslistPage(data)
		},
		...mapMutations([
			'setSerieslist',
			'setSerieslistPage',
		]),
	},
	computed: {
		...mapState({
			list: state => state.series.list,
			page: state => state.series.page,
		}),
	},
}
</script>

<template lang="pug">
.box
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="名称" name="name" clearable v-model="searchQuery.name")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline.float-right
								el-button(size="small" type="primary" plain icon="el-icon-search" @click="query()") 搜索
								el-button(size="small" type="primary" plain @click="reset(false)") 全部还原
								el-button(size="small" type="primary" @click="delChoosen(false)" plain) 彻底删除
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.table-check
										input(type="checkbox" @click="$checkAll($event)")
									th 名称
									th 删除时间
									th(width=150) 内容简介
									th(width=80) 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids")
									th
										img.cover-photo(:src="item.img_src")
										.th-name.bookName(:title="item.name") {{item.name}}
									th
										.th-name {{item.deleted_at}}
									th
										.th-name {{item.abs}}
									th
										.btns
											el-button( size='mini' type="success" plain @click="reset(item.id)") 还原
											el-button( size='mini' type="info" plain @click="delChoosen(item.id)") 删除
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
</template>
<style lang="stylus" scoped>
.btn
	background #fff
	width 100%
	padding 15px
	margin-bottom 10px
.box
	background #ececec
	min-height 650px
	min-width 1660px
	.top
		margin-bottom 20px
		.group-inline
			.form-control
				 width 100%
				 height 40px
		.list
			border 15px solid #fff
			background #fff
			width 100%
			line-height 30px
			margin-bottom 50px
			thead
				background #ececec
				tr
					background #ececec
					th
						text-align  center
						padding 18px 10px
			tbody
				tr
					&:nth-child(2n)
						background #eee
					td
						padding 10px
						text-align center
						vertical-align: middle
		.page
				text-align center
				padding-bottom 50px
	.imgList
		margin-bottom 20px
		height 200px
		.item
			float left
			width 150px
			text-align center
			margin-right 5px
			.img
				height 190px
				margin-bottom 10px
				background no-repeat
				background-size 100%
</style>
