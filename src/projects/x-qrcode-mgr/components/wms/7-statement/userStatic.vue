<script>
import {main} from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-library/series'
import echarts from 'echarts'
import {
	mapMutations,
	mapState
} from 'vuex'

export default {
	mixins: [main],
	data() {
		return {
			services,
			// detailVisible: false, // 详情框
			detailDialog: false,  //详情框
			detailDialoaType: 'info', //详情tabs类型
			detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
			list:[
				{
					name:"11",
					create_time:"2018.12.27",
				},
				{
					name:"11",
					create_time:"2018.12.27",
				}
			],
		}
	},
	mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
	methods: {
		init(){
			this.draw1();
			this.draw2();
		},
		draw1(){
			let dom = echarts.init(this.$refs.charts1)
			dom.setOption({
				title : {
					text: '读者停留时长分析',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					type: 'category',
					data: ['answer1', 'answer2', 'answer3','answer1', 'answer2', 'answer3','answer1', 'answer2', 'answer3','answer1']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: ['00:00','01:00','02:00','03:00','10:00','13:00','16:00','20:00','21:00','23:00'],
					type: 'line',
					smooth: true
				}]
			})
		},
		draw2(){
			let dom = echarts.init(this.$refs.charts2)
			dom.setOption({
				title : {
					text: '读者扫码次数分析',
					subtext: '纯属虚构',
					x:'center'
				},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					type: 'category',
					data: ['answer1', 'answer2', 'answer3',]
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [820, 300, 901,],
					type: 'line',
					smooth: true
				}]
			})
		},
		opneDetailDialog(){
			this.detailDialog=true
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
			// list: state => state.series.list,
			page: state => state.series.page,
		}),
	},
}
</script>

<template lang="pug">
.index.clearfix
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary" plain ) 新建
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th 昵称
									th 性别
									th 地域
									th 电话
									th 转发次数
									th 累计停留时长
									th 最高停留时长
									th 首次扫码时间
							tbody
								tr
									th
										.th-name
									th
										.th-name
									th
										.th-name
									th
										.th-name
									th
										.th-name
									th
										.th-name
						.tail
							.group
								.name 7日停留时长
								.draw(ref="charts1")
							.group
								.name 7日扫码次数
								.draw(ref="charts2")
						.record
							.name 扫码历史记录
							table.table
								thead
									tr
										th 总次数
										th 扫码时间
										th 产品名称
										th 二维码名称
										th 停留时间
								tbody
									tr
										th
											.th-name
										th
											.th-name
										th
											.th-name
										th
											.th-name
										th
											.th-name
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
.record
	padding 15px 0 10px 10px
	.name
		font-size 18px
		color #333
		text-align left
		line-height 30px
		font-weight bold
		border-bottom 1px solid #333
		margin-bottom 10px
.tail
	.group
		margin-top 20px
		width 45%
		display inline-block
		background #f1f1f1
		margin-right 2%
		&:nth-of-type(3n)
			margin-right 0
		.name
			padding 15px 0 0 10px
			font-size 18px
			color #333
			text-align left
			font-weight bold
		.draw
			height 210px
.btnGroup
	background #fff
	padding 10px
	margin-bottom 10px
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
