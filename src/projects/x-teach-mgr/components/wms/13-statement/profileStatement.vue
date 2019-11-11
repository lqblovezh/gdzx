<script>
import {
  main
} from '@/util/mixins'
import echarts from 'echarts'
import * as services from 'services/x-teach/statement'

export default {
  data() {
    return {
			classProfile:'', //课程收入
    }
  },
	created(){
		this.getLine()
	},
  methods: {
		getLine(type='day'){
			// console.log(type);
			services.getList({type}).then(res=>{
				this.classProfile=res.data.total_income
				let lineData={date:[],course_income:[]}
				let statistics=res.data.statistics
				statistics.forEach(value=>{
					lineData.course_income.push(value.tota_income)
					lineData.date.push(value.date.substr(0,10));
				})
				let chart=document.querySelector("#charts")
				echarts.init(chart).setOption({
					legend: {
							data:['课程收入']
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
						name:'课程收入',
						data: lineData['course_income'],
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
		span  课程收入：{{classProfile}}
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
	    width 45%
	    margin-top 10px
.bottom
	width 100%
	background #fff
	#charts
		margin 0 auto
		height 300px
		margin-top 15px
</style>
