<script>
import {
  main
} from '@/util/dyTool'
import * as service from 'services/x-qrcode/vote/voteLog'
// import Detail from 'projects/common/readOnlyDetail'
import Detail from './detail'
import echarts from 'echarts'
import { open } from 'fs';
export default {
  components: {
    Detail,
  },
  mixins: [main],
  data() {
    return {
      service,
      detailDialog: false, //详情框
      detailDialoaType: 'info', //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
			radioBtn: "投票人信息",
			info:[],
			local:[]
    }
	},
	mounted(){
		service.statics({id:this.$route.query.id}).then(res=>{
			this.info = res.data.answer
			this.local = res.data.pro
			this.$nextTick(() => {
				this.init()
			})
		})
	},
  methods: {
    init() {
      this.draw1();
      this.draw2();
			this.draw3();
    },
    draw1() {
			let option = {
				title : {
					text: '女性总计票数',
					bottom: 0,
					left: 'center',
					textStyle:{
						fontSize:14
					}
				},
        tooltip: {
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: 'left',
				},
        series: [{
          name: '占比',
          type: 'pie',
          radius: '55%',
          data: [{value: 100,name: '男'},{value: 20,name: '女'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
			for(let i in this.info){
				option.title.text = this.info[i].answer+':' + this.info[i].count 
				option.series[0].data[0].value = this.info[i].sex_man_count
				option.series[0].data[1].value = this.info[i].sex_woman_count
				echarts.init(this.$refs.sex[i]).setOption(option)
			}
    },
    draw2() {
			let dom = echarts.init(this.$refs.charts2)
			let arr = []
			this.local.forEach(el=>{
				for(let key in el){
					arr.push({name:key,value:el[key]})
				}
				// 
			})
      dom.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'center',
                  max: 1548
                }
              }
            },
          }
        },
        calculable: true,
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              label: {
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            }
          },
          data: arr
        }]
      })
    },
		draw3(){
			let name=[],man=[],women=[];
			let option = {
				title : {
					text: '男性总计票数',
					bottom:0,
					left:'center'
				},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					type: 'category',
					data: []
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [],
					type: 'bar',
					barWidth: 20
				}]
			}
			for(let i in this.info){
				name.push(this.info[i].answer)
				man.push(this.info[i].sex_man_count)
				women.push(this.info[i].sex_woman_count)
			}
			for(let i=0;i<2;i++){
				if(!i){
					option.title.text = '男性总计票数：' + this.sum(man) + '票'
					option.series[0].data = man
				}else{
					option.title.text = '女性总计票数：' + this.sum(women) + '票'
					option.series[0].data = women
				}
				option.xAxis.data = name
				echarts.init(this.$refs.sexData[i]).setOption(option)
			}
			//log(dom.getDataURL())
		},
    opneDetailDialog() {
      this.detailDialog = true
		},
		sum(arr) {
			return arr.reduce(function(prev, curr, idx, arr){
					return prev + curr;
			})
		}
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
						el-button(type="primary" @click="$router.push({path:'/wms/vote',query:{pn:$route.query.pn}})") 返回
						.btns()
							el-button( type="primary" plain ) 导出
							el-button-group(v-model="radioBtn")
								el-button(type="primary" plain @click="$router.push({path:'/wms/statement',query:{pn:$route.query.pn,id:$route.query.id}})") 投票人信息
								el-button(type="primary" ) 数据统计
					.bottom
						.top
							.left
								.vote
									.name 投票统计
									.answer(v-for="(item,i) in info")
										.answer1
											span {{item.answer}}：
											span {{item.count}}票
								.percent
									.name 男女比例
									.tail
										.group(v-for="(item,i) in info")
											.draw(ref="sex")
							.right
								.name 投票地域分析
								.group
									.draw(ref="charts2")
						.all
							.name 男女投票统计
							.group(v-for="item in 2")
								.draw(ref="sexData")
</template>
<style lang="stylus" scoped>
.serachWrap
	display flex
	justify-content space-between
	padding-bottom 20px
.owner
	font-size 16px
	color #666
	margin-right 15px
.tableWrap
	width 97%
.bottom
	padding 10px 0
	margin-top 10px
	background #fff
	.top
		min-height 200px
		.left
			width 60%
			height 100%
			display inline-block
			.vote,.percent
				padding 15px 0 0 10px
				.name
					font-size 18px
					color #333
					font-weight bold
				.answer
					margin 10px 15px 10px 0
					border 1px solid #333
					width 150px
					height 35px
					line-height 35px
					text-align center
					display inline-block
					&:nth-child(1)
						margin-left 50px
					.answer1
						font-size 14px
						color #333
				.tail
					.group
						margin-top 20px
						width 30%
						display inline-block
						background #f1f1f1
						margin-right 2%
						&:nth-of-type(3n)
							margin-right 0
						.draw
							height 210px
		.right
			margin-left 10px
			display inline-block
			width 38%
			height 100%
			.name
				padding 15px 0 0 10px
				font-size 18px
				color #333
				text-align left
				font-weight bold
			.group
				margin 15px 25px
				width 90%
				background #fff
				.draw
					height 310px
	.all
		height 350px
		.name
			padding 15px 0 0 10px
			font-size 18px
			color #333
			text-align left
			font-weight bold
		.group
			width 45%
			margin 15px 2% 0 2%
			display inline-block
			.draw
				height 300px
</style>
