<script>
import { statics } from 'services/x-qrcode/order'
import echarts from 'echarts'
import { constants } from 'crypto';

export default {
  data() {
    return {
      infoDate: {},
      staticsList: [],
      types: {
        list: [
          { name: '按年统计', value: 'year' },
          { name: '按月统计', value: 'month' },
          { name: '按日统计', value: 'day' },
        ],
        value: 'day',
      },
      start_date:null,
      end_date: null,
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    getDate() {
      if(this.end_date - this.start_date < 0){
        this.$message.error('结束范围不能小于开始范围')
        return 
      }
      let data = {
        type: this.types.value
      }
      if(this.start_date){
        data.start_date = this.start_date
      }
      if(this.end_date){
        data.end_date = this.end_date
      }
      statics(data)
        .then(res => {
          this.infoDate = res.data
          this.staticsList = res.data.data
          this.draw()
        })
    },
    draw() {
      let dom = echarts.init(this.$refs.charts)
      dom.setOption({
        title: {
          text: '收益报表',
          x: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.staticsList.map(item => item.date),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.staticsList.map(item => item.course_income),
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#9DCA69',
                },
              },
            },
          },
        ],
      })
    },
  },
  watch: {
    'end_date'(val, old) {
      if(val && this.start_date){
        this.getDate()
      }
    },
    'start_date'(val, old){
      if(val && this.end_date){
        this.getDate()
      }
    }
  },
}
</script>

<template lang="pug">
.box
  //- el-button(type="primary" plain @click="$router.push({path:'/wms/incomeStatics'})") 收入统计
  .top
    ul
      li
        span 总收入
        span {{infoDate.total}}元
      li
        span 今日收入
        span {{infoDate.today}}元
      li
        span 昨日收入
        span {{infoDate.yesterday}}元
      li
        span 已提现
        span 10000元
      li
        span 账户剩余
        span 10000元
  .bottom
    .group
      template(v-if="types.value == 'year'")
        .el-select    
          el-date-picker(v-model="end_date" type="year" placeholder="结束-年")       
        .el-select
          el-date-picker(v-model="start_date" type="year" placeholder="开始-年")   
      template(v-if="types.value == 'month'")
        .el-select    
          el-date-picker(v-model="end_date" type="month" placeholder="结束-月")         
        .el-select
          el-date-picker(v-model="start_date" type="month" placeholder="开始-月") 
      .el-select(v-if="types.value == 'day'")
        TimePick(:inputsName="['start_date','end_date']")    
      el-select(v-model="types.value" style='z')
        el-option(v-for="item in types.list"
        :key="item.value"
        :label="item.name"
        :value="item.value")

      .draw(ref="charts")
      
</template>

<style lang="stylus" scoped>
.top {
  ul {
    margin: 20px;
    height: 250px;

    li {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 1px solid #ccc;
      float: left;
      margin: 20px 20px;
      line-height: 200px;
      text-align: center;
    }
  }
}

.bottom {
  .el-select {
    float: right;
    z-index: 10;
  }

  .group {
    margin-top: 20px;
    width: 90%;
    display: inline-block;
    background: #f1f1f1;
    margin: 0 2%;

    .draw {
      height: 400px;
    }
  }
}
</style>
