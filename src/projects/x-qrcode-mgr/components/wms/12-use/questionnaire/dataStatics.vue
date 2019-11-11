<script>
import {statistics} from 'services/x-qrcode/vote/attendLog'
export default {
	data() {
		return {
			detailDialoaType: 'info', //详情tabs类型
			detailData: [], //详情数据 ,  包含id等基本信息, 更多的在详情里面查
			radioBtn:"投票人信息",
			questionInfoVisi:false, //问卷详情弹框
		}
	},
	mounted(){
		statistics({
			id:this.$route.query.id
		}).then(res=>{
			this.detailData = res.data
		})
	},
	methods: {
		opneDetailDialog(){
			this.detailDialog=true
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
						el-button(type="primary" @click="$router.push({path:'/wms/questionnaire',query:{pn:$route.query.pn}})") 返回
						.btns
							el-button( type="primary" plain ) 导出
							el-button-group(v-model="radioBtn")
								el-button(type="primary"  @click="$router.push({path:'/wms/voteInfo',query:{id:$route.query.id}})") 投票人信息
								el-button(type="primary" plain) 数据统计
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span class="totalNum">({{detailData.length}})</span>
								
						.bottom
							div.allNum
								span 问题总数：
								span {{detailData.length}}
							template(v-for="(item,i) in detailData")
								div.question
									ul
										span.title 第{{i+1}}题
										li
											span.eximination {{item.question}}
											span.percent 选项比例
								div.answers
									ul
										li(v-for="(vo,k) in item.count")
											.eximination
												span.title 答案{{k}}：
												span.answer {{vo.question}}
											span.percent
												span {{vo.count}}
												span.percentage {{vo.ratio*100}}%
</template>

<style lang="stylus" scoped>
.owner
	font-size 16px
	color #666
	margin-right 15px
.tableWrap
	width 97%
	.bottom
		width 100%
		>div
			&.answers
			&.question
			&.allNum
				text-align left
				.title
					font-size 14px
					font-weight bold
					color #333
					display inline-block
				.percentage
					text-align right
				span
					line-height 30px
					font-size 16px
					color #333
					padding 0 20px
.answers
	padding-bottom 20px
	.percent
		margin-left 20px
.eximination
	min-width 300px
	display inline-block
.form-control
	width 170px
.width-small
	width 100px
.el-dialog__wrapper
	.form-control
		margin-right 10px
		width 100px
		min-width @width
.serachWrap
	padding-bottom 15px
	display flex
	justify-content space-between
</style>
