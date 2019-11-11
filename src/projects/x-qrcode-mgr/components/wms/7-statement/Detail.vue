<script>
import * as services from 'services/x-qrcode/statics'
import echarts from 'echarts'

export default {
  props: ['detailVisible', 'detailDate'],
  data() {
    return {
      infoDate: {},
      historyList: [],
      page: {
        pageNum: 1,
        pageOffset: 10,
        total: 1,
      },
    }
  },
  created() {
    this.getDetail()
    this.getList()
  },
  methods: {
    init() {
      this.draw1()
      this.draw2()
    },
    getList() {
      services
        .scanList({
          user_id: this.detailDate.user_id,
          ...this.page,
        })
        .then(res => {
          this.historyList = res.data
          this.page.total = res.page.total
          this.page.pageNum = res.page.num
        })
    },
    getDetail() {
      services
        .userStatics({
          user_id: this.detailDate.user_id,
        })
        .then(res => {
          this.infoDate = res.data
          this.init()
        })
    },
    draw1() {
      let dom = echarts.init(this.$refs.charts1)
      dom.setOption({
        title: {
          text: '读者停留时长分析',
          subtext: '纯属虚构',
          x: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.infoDate.list.map(item => item.date),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.infoDate.list.map(item => item.stay),
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
          text: '读者扫码次数分析',
          x: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.infoDate.list.map(item => item.date),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.infoDate.list.map(item => item.scan),
            type: 'line',
            smooth: true,
          },
        ],
      })
    },
    handleSizeChange(val) {
      //处理size变化
      this.page.pageNum = 1
      this.page.pageOffset = val
      this.getList()
    },
    handleCurrentChange(val) {
      //处理页码变化
      this.page.pageNum = val
      this.getList()
    },
    colse() {
      this.$emit('update:detailVisible', false)
    },
  },
}
</script>

<template lang="pug">
.div
	el-dialog(:visible="detailVisible" width="1000px" top="50px" append-to-body  :before-close="colse")
		.header(slot="title")
			el-tabs(value="detail")
				el-tab-pane(label="用户统计" name="detail")
		.info
			.group
				.label 昵称:
				span {{infoDate.nick_name}}
			.group
				.label 电话:
				span {{infoDate.phone}}
			.group
				.label 性别:
				span {{infoDate.sex}}
			.group
				.label 地域:
				span {{infoDate.pro}}
			.group
				.label 转发次数:
				span {{infoDate.share_count}}
			.group
				.label 首次扫码时间:
				span {{infoDate.first_time}}
			.group 
				.label 最高停留时长:
				span {{infoDate.max_stop}}
			.group
				.label 累计停留时长:
				span {{infoDate.total_stop}}
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
						th 扫码时间
						th 产品名称
						th 二维码名称
						th 停留时间
				tbody
					tr(v-for="item in historyList")
						th {{item.create_time}}
						th {{item.product_name}}
						th {{item.qrcode_name}}
						th {{item.duration}}
			//- 分页
			.pageWrap(v-if="page")
				el-pagination(
					:small="false" background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="page.pageNum"
					:page-sizes="[10, 50, 100]"
					:page-size="page.pageOffset"
					layout="total, sizes,prev, pager, next, jumper"
					:total="page.total"
				)
		div(slot="footer" class="dialog-footer")
			el-button(type="info"  @click="$emit('update:detailVisible',false)" size="small") 取消
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
.info
  .group
    width 45%
    display inline-block
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
