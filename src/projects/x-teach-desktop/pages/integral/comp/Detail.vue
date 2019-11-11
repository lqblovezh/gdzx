<script>
import { regionData } from 'element-china-area-data'
import Status from './Status'

export default {
  props: ['item', 'detailDialog', 'currentNave'],
  components: { Status },
  data() {
    return {
      addressDialog: false,
      exchangeType: null, // 兑换后的状态
      statusDialog: false, // 兑换状态弹出层
      addressDetail: {},
      resourcesDate: {},
      provinceCity: regionData,
    }
  },
  methods: {
    submit() {
      if (this.currentNave == 'books' || this.currentNave == 'pod_book') {
        this.addressDialog = true
        this.addressDetail = {}
      } else {
        this.exchangeSubmit()
      }
    },
    close() {
      this.$emit('update:detailDialog', false)
    },
    getSourceName(item) {
      return item.book_name || item.resources_name || item.coupon_name
    },
    submitAddress() {
      this.exchangeSubmit({
        books_id: this.item.id,
        ...this.addressDetail,
        region: this.$refs['cascaderAddr'].currentLabels.join('-'),
      })
    },
    exchangeSubmit(data = {}) {
      this.$service.intearal
        .exchange({ id: this.item.id, type: this.currentNave, ...data })
        .then(res => {
          this.$user.statistics.credits -= this.item.integral
          this.resourcesDate = {
            url: res.data,
            type: this.currentNave,
          }
          this.addressDialog = false
          this.statusDialog = true
          this.exchangeType = true
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
  },
}
</script>

<template lang="pug">
el-dialog(
  title="积分兑换"
  :visible.sync="detailDialog"
  width="530px"
  top="20%"
  :before-close="close"
  append-to-body
)
  el-dialog(
    title="寄送信息"
    v-if="addressDialog"
    :visible.sync="addressDialog"
    width="530px"
    top="20%"
    :before-close="close"
    append-to-body
  )
    el-form.form(label-width="120px")
      el-form-item(label="收货人：")
        el-input(v-model="addressDetail.user_name")
      el-form-item(label="联系电话：")
        el-input(v-model="addressDetail.phone")
      el-form-item(label="地区：")
        el-cascader(
          ref="cascaderAddr"
          expand-trigger="hover"
          :options="provinceCity"
          value="name"
          v-model="addressDetail.region"
        )
        //- el-input(v-model="addressDetail.region")
      el-form-item(label="收货地址：")
        el-input(v-model="addressDetail.address")
      el-form-item(label="备注信息：")
        el-input(v-model="addressDetail.remarks")
      el-form-item
        el-button(@click="close()" size="small") 取消
        el-button(type="primary" @click="submitAddress" size="small") 确定
  .content
    .comp-integral-detail(v-if="!statusDialog")
      .img.ib.icon
        img(:src="item.img")
      .detail.ib
        .title
          span.f18  {{getSourceName(item)}}
        .author.f13 {{item.author_name}}
        .stock.c_8 剩余库存：{{item.limit}}
        .price.c_8.f14 所需积分：
          span.c_price.icon.icon-integration {{item.integral}}
          span  积分
      .btns.tc
        el-button(@click="close()" size="small") 取消
        el-button(type="primary" @click="submit" size="small") 确定
    Status(:item="resourcesDate" :type="exchangeType" @close="close" v-else)
</template>

<style lang="stylus" scoped>
.comp-integral-detail
  >.img, img
    vertical-align top
    width 250px
    height 190px
  >.detail
    width 200px
    margin-left 20px
    .title
      padding 15px 0
      color #4c4c4c
    .author
      color #757575
      margin-bottom 20px
    .stock
      height 40px
      line-height @height
      background #f8f8f8
      padding-left 9px
      margin-bottom 20px
    .c_price
      color #fb9f00
      padding-left 20px
      vertical-align baseline
      background-position left
  >.btns
    margin-top 50px
    button
      width 100px
</style>
