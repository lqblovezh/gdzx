<script>
import {
  main
} from '@/util/mixins'
import echarts from 'echarts'
import * as services from 'services/x-teach/statement'
export default {
  data() {
    return {
			sum:{}, //总数
    }
  },
  created() {
		this.getLine()
  },
  methods: {
		getLine(type='day'){
			log(type)
			services.getUserList({type}).then(res=>{
				this.sum=res.data
				let lineData={teach_sum:[],student_sum:[],date:[],}
				res.data.user_statis.forEach(value=>{
					lineData.teach_sum.push(value.teach_sum)
					lineData.student_sum.push(value.student_sum)
					lineData.date.push(value.date.substr(0,10));
				})
				let chart = document.querySelector('#charts');
				echarts.init(chart).setOption({
					legend: {
							data:['教师数量','学员数量']
					},
					tooltip: {
						trigger: 'axis'
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
						}
					},
					calculable:true,
					xAxis: {
						type: 'category',
						boundaryGap: 'false',
						data: lineData['date']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						name:'教师活跃度',
						data: lineData['teach_sum'],
						type: 'line',
					},{
						name:'学生活跃度',
						data: lineData['student_sum'],
						type: 'line',
					},]
				})
			})
		},
  }
}
</script>

<template lang="pug">
.container
	.box
		span  教师数量: {{sum.teach_sum}}
		span  学员数量: {{sum.student_sum}}
	.bottom
		el-button-group
				el-button(type="primary" @click="getLine('day')") 日
				el-button(type="primary" @click="getLine('month')") 月
		#charts
</template>

<style lang="stylus" scoped>
.container
	padding 20px
  .box
		width 100%
		padding 15px
		line-height 30px
		margin-bottom 15px
		box-sizing border-box
		display inline-block
		background #fff
    span
	    display inline-block
	    width 20%
	    margin-top 10px
.bottom
	width 100%
	background #fff
	el-button-group
		float right
	#charts
		margin 0 auto
		height 300px
		margin-top 15px
</style>
