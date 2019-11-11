<script>
import * as services from "services/x-qrcode/statics";
import echarts from "echarts";
import "echarts/map/js/china.js";

export default {
  data() {
    return {
      services,
      infoDate: {}
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      services
        .analysAll({
          type: this.$route.query.index,
          id: this.$route.query.id
        })
        .then(res => {
          console.log(res);
          this.infoDate = res.data;
          this.init();
        });
    },
    init() {
      this.draw1();
      this.draw2();
      this.draw({
        ref: "charts3",
        name: "读者扫码时段分析",
        x: this.infoDate.twenty_four_distribution.map(i => i.distribution),
        y: this.infoDate.twenty_four_distribution.map(i => i.total)
      });
      this.draw4();
      this.draw({
        ref: "charts5",
        name: "读者扫码时段分析",
        x: this.infoDate.week_scan_count.map(i => i.distribution),
        y: this.infoDate.week_scan_count.map(i => i.total)
      });
      this.draw({
        ref: "charts6",
        name: "二维码扫描量7日前9名排行榜",
        x: this.infoDate.top_seven.map(i => i.name),
        y: this.infoDate.top_seven.map(i => i.total),
        type: "bar"
      });
      this.draw({
        ref: "charts7",
        name: "二维码扫描量30日前9名排行榜",
        x: this.infoDate.top_thirty.map(i => i.name),
        y: this.infoDate.top_thirty.map(i => i.total),
        type: "bar"
      });
      this.draw({
        ref: "charts8",
        name: "二维码扫描总量前9名排行榜",
        x: this.infoDate.top_thirty.map(i => i.name),
        y: this.infoDate.top_scan.map(i => i.total),
        type: "bar"
      });
      this.draw({
        ref: "charts9",
        x: this.infoDate.top_one_retention.map(i => i.date),
        y: this.infoDate.top_one_retention.map(i => i.data)
      });
      this.draw({
        ref: "charts10",
        x: this.infoDate.top_seven_retention.map(i => i.date),
        y: this.infoDate.top_seven_retention.map(i => i.data)
      });
      this.draw({
        ref: "charts11",
        x: this.infoDate.top_thirty_retention.map(i => i.date),
        y: this.infoDate.top_thirty_retention.map(i => i.data)
      });
      this.draw({
        ref: "charts12",
        x: this.infoDate.new_seven_user.map(i => i.date),
        y: this.infoDate.new_seven_user.map(i => i.new_user_count)
      });
      this.draw({
        ref: "charts13",
        x: this.infoDate.new_user.map(i => i.date),
        y: this.infoDate.new_user.map(i => i.new_user_count)
      });
    },
    draw1() {
      let dom = echarts.init(this.$refs.charts1);
      dom.setOption({
        title: {
          text: "男女百分比",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true,
          x: '370',
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            }
          }
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.infoDate.user_sex.map(i => i.name)
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.infoDate.user_sex,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    draw2() {
      let dom = echarts.init(this.$refs.charts2);
      dom.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.infoDate.pro_list.map(i => i.name).splice(0, 10)
        },
        toolbox: {
          show: true,
          x: '370',
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            },            
            mark: {
              show: true
            },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "center",
                  max: 1548
                }
              }
            }
          }
        },
        calculable: true,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
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
                  position: "right",
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              }
            },
            data: this.infoDate.pro_list
          }
        ]
      });
    },
    draw4() {
      let dom = echarts.init(this.$refs.charts4);
      dom.setOption(
        {
          tooltip: {
            trigger: "item"
          },
          legend: {
            x: "right",
            selectedMode: false,
            data: ["北京", "上海", "广东"]
          },
          dataRange: {
            orient: "horizontal",
            min: 0,
            max: 100,
            text: ["高", "低"], // 文本，默认为数值文本
            splitNumber: 0
          },
          toolbox: {
            show: true,
            orient: "vertical",
            x: "590",
            feature: {
              saveAsImage: {
                show: true,
                excludeComponents: ["toolbox"],
                pixelRatio: 2
              },              
              mark: { show: false },
              dataView: { show: false, readOnly: false }
            }
          },
          series: [
            {
              name: "地域详细分布",
              type: "map",
              mapType: "china",
              mapLocation: {
                x: "center"
              },
              selectedMode: "multiple",
              itemStyle: {
                normal: { label: { show: true } },
                emphasis: { label: { show: true } }
              },
              data: this.infoDate.pro_list
            }
          ],
          animation: false
        },
        true
      );
    },
    draw({ ref, name = "", x = [], y = [], type = "line" }) {
      let dom = echarts.init(this.$refs[ref]);
      let downloadX = ''
      if(ref == 'charts3'){
        downloadX = '370'
      }
      dom.setOption({
        title: {
          text: name,
          x: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          x: downloadX || '590',
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ["toolbox"],
              pixelRatio: 2
            }
          }
        },        
        xAxis: {
          type: "category",
          data: x
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: y,
            type: type,
            smooth: true,
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "#5e7e54"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<template lang="pug">
.index.clearfix
  .mainRight
    .contentWrap
      .contentLeft
        .maindata
          .data
            .tableTop
              .title
                .name
                  span 用户总数：
                .item
                  span {{infoDate.user_count}}
            .tail
              .group
                .name 用户性别分布
                .draw(ref="charts1")
              .group
                .name 用户地域分布
                .draw(ref="charts2")
              .group
                .name 24小时扫码时间段分布
                .draw(ref="charts3")
            .tail.tail2
              .group
                .name 用户地域详细分布
                .draw(ref="charts4")
              .group
                .name 每周扫码时间段分布
                .draw(ref="charts5")
              .group
                .name 7日二维码扫码排行榜
                .draw(ref="charts6")
              .group
                .name 30日二维码扫码排行榜
                .draw(ref="charts7")
              .group
                .name 二维码扫码排行榜
                .draw(ref="charts8")
              .group
                .name 次日用户留存率
                .draw(ref="charts9")
              .group
                .name 7日用户留存率
                .draw(ref="charts10")
              .group
                .name 30日用户留存率
                .draw(ref="charts11")
              .group
                .name 7日用户新增量
                .draw(ref="charts12")
              .group
                .name 30日用户新增量
                .draw(ref="charts13")
</template>

<style lang="stylus" scoped>
.data {
  background: #fff;
  margin-top: 30px;
  height: auto;

  .tail {
    padding: 20px;

    .group {
      margin-top: 20px;
      width: 32.33%;
      display: inline-block;
      background: #f1f1f1;
      margin-right: 1%;

      &:nth-of-type(3n) {
        margin-right: 0;
      }

      .name {
        position: relative;
        padding: 15px 0 0 10px;
        font-size: 18px;
        color: #333;
        text-align: left;
        font-weight: bold;

        .download {
          position: absolute;
          right: 10px;
          top: 17px;
        }
      }

      .draw {
        height: 300px;
      }
    }
  }

  .tail2 {
    .group {
      width: 49%;

      &:nth-of-type(2n) {
        margin-right: 0;
      }

      &:nth-of-type(3n) {
        margin-right: 1%;
      }

      .draw {
        height: 400px;
      }
    }
  }

  .title {
    width: 45%;
    height: 50px;
    display: inline-block;

    .name, .item {
      display: inline-block;
    }

    .item {
      width: 150px;
      height: 30px;
      border: 1px solid #333;
      margin-left: 10px;
      margin-top: 10px;
      text-align: center;
      line-height: 30px;

      span {
        font-size: 16px;
        color: #333;
      }
    }
  }
}

.btnGroup {
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
}

.tableWrap {
  width: 97%;
}

.form-control {
  width: 170px;
}

.width-small {
  width: 100px;
}
</style>
