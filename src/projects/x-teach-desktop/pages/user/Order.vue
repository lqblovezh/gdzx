<script>
import userMixins from './mixins'

export default {
  mixins: [userMixins],
  data() {
    return {
      detail: {},
      detailDialog: false,
    }
  },
  methods: {
    details(item) {
      this.detail = item
      this.detailDialog = true
    },
    pay(item) {
      this.$service.user
        .pay({
          order_id: item.id,
          redirect: location.href,
        })
        .then(res => {
          location.href = res.data.pay_link
        })
        .catch(({ payload, message }) => {
          this.$message.error(payload.message || message)
        })
    },
  },
}
</script>


<template lang="pug">
  .page-user-order 
    .wrap 
      table.table
        thead 
          tr 
            th 订单编号
            th 订单商品
            th 下单时间
            th 优惠券
            th 获得积分
            th 总计价格
            th.option 操作
        tbody 
          tr(v-for="item in list")
            td 
              .div.ellipsis {{item.order_number}}
            td 
              .div.ellipsis.name
                span(v-for="items in item.order_goods") {{items.course_name}}
            td
              .div {{item.create_time}}
            td
              .div {{item.coupon_money}}
            td
              .div {{item.integral}}
            td
              .c_price ￥{{item.pay_amount}}
            td.option
              Tbutton( @click.native.stop="pay(item)" type="primary_plain" v-if="item.pay_status == 'not_pay'" size="small") 再次支付
              Tbutton( @click.native.stop="details(item)" type="primary_plain" size="small") 查看物品
              .icon.icon-delete(@click.stop="del(item.id)")
          tr(v-if="!list.length" class="no-data")
            td(colspan="7" align="center") 暂无订单
    .page-wrap
      PageMy(
        @currentChange="pageChangeHandler"
        :total="page.total"
        :pageOffset="page.pageOffset"
        :pageNum="page.pageNum"
      )
    .dialog 
      el-dialog(
        title="查看物品"
        :visible.sync="detailDialog"
        v-if="detailDialog"
        width="530px"
        top="20%"
      )
        .item(v-for="item in detail.order_goods")
          .img.ib.vt
            img(:src="item.goods_img", alt="alt")
          .detail.ib
            .title
              span.f18  {{item.course_name}}
            .price.c_8.f14 价格：
              span.c_price  ￥{{item.price}} 
              span 元
        .dialog-footer.tc(slot="footer")
          el-button(type="primary" @click="detailDialog = false" size="small") 确定

</template>
<style lang="stylus">
.page-user-order
  >.dialog
    .el-dialog
      border-radius 4px
    .el-dialog__header
      border-bottom 1px solid #e6e6e6
      font-size 18px
      color #4c4c4c
    .el-dialog__body
      padding 40px 50px
      >.item
        >.img
          width 225px
          height 140px
          img
            width 100%
            height 100%
            object-fit contain
        >.detail
          width 180px
          margin-left 25px
          .title
            padding 15px 0
          .c_price
            color #fb9f00
    .dialog-footer
      button
        width 100px
  >.wrap
    padding 30px
    >.table
      .btns
        min-width 100px
      >thead
        border 1px solid #ebeef5
        height 50px
        tr
          background #fafafa
          .option
            text-align center
          th
            height 50px
            padding 0 15px
            color #4c4c4c
            font-size 14px
            font-weight normal
      >tbody
        tr
          cursor pointer
        .no-data
          td
            text-align center
        td
          &.option
            text-align center
            >div
              margin-left 10px
              &:first-child
                margin-left 0
          .name
            max-width 150px
</style>
