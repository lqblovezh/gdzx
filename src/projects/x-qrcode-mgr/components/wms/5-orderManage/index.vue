<script>
import { publicMixin } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/order'
import Detail from './detail'

export default {
  mixins: [publicMixin],
  components: { Detail },
  data() {
    return {
      services,
      list: null,
      page: null,
      type: {
        value: '',
        list: [
          { name: '所有', value: '' },
          { name: '等待支付', value: 'not_pay' },
          { name: '支付完成', value: 'already_paid' },
        ],
			},
      timePick: null,
      ctimePick: null,
      orderVisible: null,
      detailDate: null,
    }
  },
  methods: {
    async getList(
      pageNum = (this.page && this.page.num) || 1,
			pageOffset = (this.page && this.page.offset) || 10,
			query
    ) {
      //获取列表信息
      const data = {
        pageNum,
        pageOffset,
        ...query,
      }
      await services.getList(data).then(res => {
        this.page = res.page
        this.list = res.data
        log(this.list)
      })
    },
    opneDetail(item) {
      this.detailDate = item
      this.orderVisible = true
    }, //订单详情
  },
}
</script>


<template lang="pug">
.clearfix
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm
							span.group-inline
								el-input(placeholder="输入单号搜索" name="order" clearable v-model="searchQuery.order")
							span.group-inline
								el-input(placeholder="输入用户搜索" name="user_name" clearable v-model="searchQuery.user_name")
							span.group-inline
								el-input(placeholder="输入手机号搜索" name="phone" clearable v-model="searchQuery.phone")
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							//- span.group-inline
							//- 	TimePick(:inputsName="['start_pay','end_pay']" :placeholder="['支付起始时间','支付结束时间']")
							span.group-inline
								select.form-control.width-small(name="pay_status")
									option(value="") 所有
									option(value="not_pay") 等待支付
									option(value="already_paid") 支付完成
							span.group-inline.right
								el-button(size="mediu" type="primary" icon="el-icon-search" @click="seareHandeler" plain ) 搜索
								//- el-button(size="mediu" type="primary" icon="el-icon-search" @click="educe()" plain ) 导出
					.tableWrap
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
							tbody(v-if="list")
								tr(v-for="item,index in list")
									td
										.th-name {{index+1}}
									td
										.th-name {{item.order_number}}
									td
										.th-name {{item.user_name}}
									td
										.th-name {{item.phone}}
									td
										.th-name {{item.pay_price}}
									td
										.th-name {{item.create_time}}
									td
										.th-name {{item.pay_type}}
									td
										.th-name {{item.is_pay}}
									td
										//- Icon(size="mini" title="详情" @click="opneDetail(item)"  type="icon-detail"  plain)
										span(size="mini" title="详情" @click="opneDetail(item)"  type="icon-detail"  plain) 详情
					.pageWrap(v-if="page")
						el-pagination(
							:small="false"
							background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="page.num"
							:page-sizes="[10, 50, 100]"
							:page-size="page.offset"
							layout="total, sizes,prev, pager, next, jumper"
							:total="page.total")
			Detail(:orderVisible.sync="orderVisible" v-if="orderVisible" :detailDate="detailDate")
</template>


<style lang="stylus" scoped>
.table th, .table td
  text-align center
.table tbody tr td
  line-height 40px
  height 40px
</style>
