<script>
import * as services from 'services/x-qrcode/order'

export default {
  props: ['orderVisible', 'detailDate'],
  data() {
    return {
      infoDate: {},
    }
  },
  created() {
    this.getDetail()
  },
  computed: {
    totalPrice() {
      //计算总价格
      let price = 0
      this.infoDate.order_info.forEach(item => {
        price += item.goods_price
      })
      return price.toFixed(2)
    },
  },
  methods: {
    getDetail() {
      services
        .detail({
          id: this.detailDate.id,
        })
        .then(res => {
          this.infoDate = res.data
        })
    },
    colse() {
      this.$emit('update:orderVisible', false)
    },
  },
}
</script>

<template lang="pug">
	.div
		//- 详情dialog
		el-dialog(:visible="orderVisible" width="1000px" top="50px" append-to-body :before-close="colse")
			.header(slot="title")
				el-tabs(value="detail")
					el-tab-pane(label="订单详情" name="detail")
			el-form
				el-form-item(label="订单信息:" label-width="120px")
					p
						span 订单编号：
						span {{infoDate.order_number}}
					p
						span 订单状态：
						span {{infoDate.is_pay}}
					p
						span 创建时间：
						span {{infoDate.create_time}}
				el-form-item(label="商品信息" label-width="120px")
					table.table(width="100%")
							thead
								tr
									th 商品序号
									th 商品名称
									th 类型
									th 价格
							tbody(v-if="infoDate.order_info&&infoDate.order_info.length")
								tr(v-for="item,index in infoDate.order_info")
									td(v-text='index+1')
									td {{item.goods_name}}
									td {{item.goods_type}}
									td {{item.goods_price}}
								tr
									td(style="text-align: right" colspan="3") 合计:
									td(v-text="totalPrice")
				el-form-item(label="用户信息:" label-width="120px")
					p
						span 用户名：
						span {{infoDate.user_nick||infoDate.user_name}}
					p
						span 绑定手机号：
						span {{infoDate.phone}}
				el-form-item(label="支付信息:" label-width="120px")
					p
						span 支付方式：
						span {{infoDate.pay_type}}
					p
						span 支付金额：
						span {{infoDate.pay_price}}
					p
						span 支付时间：
						span {{infoDate.pay_time}}
					p
						span 优惠券：
						span {{infoDate.user_coupons}}
					p
						span 实际付款：
						span {{infoDate.pay_price}}
			div(slot="footer" class="dialog-footer")
				el-button(type="info"  @click="$emit('update:orderVisible',false)" size="small") 取消
</template>

<style lang="stylus" scoped>
</style>