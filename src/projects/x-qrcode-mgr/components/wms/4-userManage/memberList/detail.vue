<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-library/series'
import { scanList as getList } from 'services/x-qrcode/statics'
import { mapMutations, mapState } from 'vuex'
import Detail from '../../5-orderManage/detail'

export default {
  props: ['detailVisible', 'detailData'],
  data() {
    return {
      services,
      types: 'order', //tabs类型
      orderVisible: false,
      orderDate: {},
      scanList: [],
      page: {
        pageNum: 1,
        pageOffset: 10,
        total: 1,
      },
    }
  },
  components: { Detail },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList({
        user_id: this.detailData.user_id,
        ...this.page,
      }).then(res => {
        this.scanList = res.data
        this.page.total = res.page.total
        this.page.pageNum = res.page.num
      })
    },
    opneDetail(item) {
      this.orderDate = item
      this.orderVisible = true
    }, //订单详情
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
  },
}
</script>

<template lang="pug">
.div
	.intro
		.img
			img.img(:src="detailData.picture")
		ul
			li
				.name 昵称
				.item {{detailData.nick_name}}
			li
				.name 消费额
				.item {{detailData.total_consumption}}
			li
				.name 扫码量
				.item {{detailData.scan_qrcode_count}}
			li
				.name 扫码产品
				.item {{detailData.scan_product_count}}
			li
				.name 资源购买数量
				.item {{detailData.buy}}
	.bottom
		el-tabs(:value="types" v-if="detailData")
			el-tab-pane(label="订单记录" name="order")
				Detail(:orderVisible.sync="orderVisible" v-if="orderVisible" :detailDate="orderDate")
				table.table
					thead
						tr
							th 序号
							th 单号
							th 用户
							th 手机
							th 金额
							th 交易时间
							th 渠道
							th 订单状态
							th 操作
					tbody
						tr(v-for="item,index in detailData.orderList")
							td
								.th-name {{index+1}}
							td
								.th-name {{item.order_number}}
							td
								.th-name {{item.user_name}}
							td
								.th-name {{item.phone}}
							td
								.th-name {{item.orde_amount}}
							td
								.th-name {{item.create_time}}
							td
								.th-name {{item.pay_type}}
							td
								.th-name {{item.is_pay}}
							td
								Icon(type="icon-detail" title="详情" @click="opneDetail(item)")
			el-tab-pane(label="扫码记录" name="scanCode")
				table.table
					thead
						tr
							th 扫码时间
							th 产品名称
							th 停留时间
					tbody
						tr(v-for="item in scanList")
							td
								.th-name {{item.create_time}}
							td
								.th-name {{item.product_name}}
							td
								.th-name {{item.duration}}
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
			el-tab-pane(label="拥有资源" name="ownRes")
				table.table
					thead
						tr
							th 资源名称
							th 类型
					tbody
						tr(v-for="item in detailData.sourceList")
							td
								.th-name {{item.name}}
							td
								.th-name {{item.type_name}}
		.btn()
			el-button(type="info" plain @click="$emit('update:detailVisible',false)") 取消
</template>


<style lang="stylus" scoped>
.btn
  margin-top 15px
  text-align right
.bottom
  margin-top 15px
.intro
  padding 10px 0
  margin-top 15px
  border-bottom 1px solid #333
  .img
    border-radius 50%
    border 1px solid #ccc
    width 60px
    height 60px
    display inline-block
  ul
    width 90%
    display inline-block
    margin-left 10px
    li
      width 15%
      line-height 30px
      text-align center
      float left
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
</style>
