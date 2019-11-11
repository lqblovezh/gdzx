<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/course'
import echarts from 'echarts'

export default {
  props: ['item'],
  data() {
    return {
      service,
      infoDate: {},
    }
  },
  created() {
    if (!this.$route.query.id) {
      this.$router.back()
      return
    }
    this.getBill()
  },
  methods: {
    getBill() {
      service
        .userBill({
          user_id: this.item.student_id,
          course_id: this.item.course_id || this.$route.query.course_id,
        })
        .then(res => {
          this.infoDate = res.data
					let data = this.infoDate.course_user_count
          this.$nextTick(() => {
            this.init()
          })
        })
    },
    init() {
      this.draw1()
      this.draw2()
    },
    draw1() {
      let dom = echarts.init(this.$refs.charts1)
      dom.setOption({
        title: {
          text: '每日学习时长',
          x: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
					data: Object.entries(this.infoDate.course_sum_seven).map(item => item[0]),
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
            data: Object.entries(this.infoDate.course_sum_seven).map(item => item[1]),
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
          text: '学习进度',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['2011年'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.1],
        },
        yAxis: {
          type: 'category',
          data: Object.entries(this.infoDate.course_speed).map(item => item[0]),
        },
        series: [
          {
            type: 'bar',
            barWidth: 20,
            data: Object.entries(this.infoDate.course_speed).map(item => item[1]),
          },
        ],
      })
    },
  },
}
</script>

<template lang="pug">
  .container
    .head 
      img(:src="infoDate.picture_absolute")
      .box
        span  {{infoDate.name}}
        span  加入收时间：{{infoDate.join_time}}
        span  {{infoDate.school}}
        span  {{infoDate.nick_name}}
        span  {{infoDate.phone}}
        span  学习时长：{{infoDate.length_of_time}}
        span  {{infoDate.college}}
    .tail
      .group
        .draw(ref="charts1")
      .group
        .draw(ref="charts2")
</template>



<style lang="stylus" scoped>
.container
  .head
    border-bottom 1px solid #ddd
    padding-bottom 20px
    img
      width 160px
      height 160px
      border-radius 50%
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
        margin-top 30px
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

