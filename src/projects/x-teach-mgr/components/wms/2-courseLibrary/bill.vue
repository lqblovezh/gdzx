<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/course'
import echarts from 'echarts'

export default {
  data() {
    return {
      service,
      index: this.$route.query.index || '/wms/course',
      id: this.index=='/wms/course'?this.$route.query.course_id:this.$route.query.id,
			infoDate: {},
			userDate: []
    }
  },
  created() {
    if (!this.id) {
      this.$router.back()
      return
		}
		this.getBill()
  },
  mounted() {},
  methods: {
    getBill() {
      service.bill({ id: this.id, type:this.index&&this.index.split('/wms/')[1] }).then(res => {
				this.infoDate = res.data
				let data = this.infoDate.course_user_count
				for(let key in data){
					let name
					switch (key) {
						case 'baomi':
							name = '保密'
							break;
						case 'nan':
							name = '男'
							break;
						case 'nv':
							name = '女'
							break;
						default:
							name= '保密'
							break;
					}
					this.userDate.push({name,value:data[key]})
				}
        this.$nextTick(() => {
          this.init()
        })
      })
    },
    init() {
      this.draw1()
      this.draw2()
      this.draw3()
    },
    draw1() {
      let dom = echarts.init(this.$refs.charts1)
      dom.setOption({
        title: {
          text: '课程日学习人数',
          x: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.infoDate.course_sum_seven.map(item => item.course_day),
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.infoDate.course_sum_seven.map(item => item.course_dat_buyer),
            type: 'line',
            smooth: true,
          },
        ],
      })
    },
    draw2() {
      let dom = echarts.init(this.$refs.charts2)
      dom.setOption({
        title: {
          text: '课程日学习时长',
          x: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.infoDate.course_sum_seven.map(item => item.course_day),
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.infoDate.course_sum_seven.map(item => item.course_day_time),
            type: 'line',
            smooth: true,
          },
        ],
      })
    },
    draw3() {
      let dom = echarts.init(this.$refs.charts3)
      dom.setOption({
        title: {
          text: '男女百分比',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['男', '女', '保密'],
        },
        series: [
          {
            name: '占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.userDate,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      })
    },
  },
}
</script>

<template lang="pug">
TPL(ref="child" :nav="true")
  .tab-nav(slot="content")
    el-button-group.header
      el-button(@click="$router.push({name:'CourseStudent',query:{id:$route.query.id,course_id:$route.query.course_id,index}})") 学生列表
      el-button(type="primary") {{index!='/wms/course'?'班级报表':'课程报表'}}
    .container
      .head 
        img(:src="infoDate.img_src")
        .box
          span  {{infoDate.course_name}}
          span  今日学习时长：{{infoDate.course_day_time}}
          span  学习总人数：{{infoDate.course_buyer}}
          span  价格：{{infoDate.price&&infoDate.price.price}}
          span  学习总时长：{{infoDate.course_sum_time}}
      .tail
        .group
          .draw(ref="charts1")
        .group
          .draw(ref="charts2")
        .group
          .draw(ref="charts3")
</template>



<style lang="stylus" scoped>
.container
  .head
    border-bottom 1px solid #ddd
    padding-bottom 20px
    img
      width 120px
      height 160px
      object-fit contain
      box-shadow 0 0 5px 2px #ddd
    .box
      display inline-block
      padding-left 50px
      box-sizing border-box
      width calc(100% - 160px)
      span
        display inline-block
        width 30%
        margin-top 40px
  .tail
    .group
      margin-top 20px
      width 49%
      display inline-block
      background #f1f1f1
      margin-right 2%
      &:nth-of-type(2n)
        margin-right 0
      .draw
        height 300px
</style>

