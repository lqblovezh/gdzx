<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/intearal/index'

export default {
  mixins: [main],
  data() {
    return {
      service,
      detailData: {},
      dialogVisible: false,
    }
  },
  methods: {
    isOnline(data) {
      this.detailData = data
      if (data.state == 'false') {
        this.dialogVisible = true
        return
      }
      service
        .isOnline({
          id: data.id,
        })
        .then(_ => {
          this.$message.success('下架成功')
          this.detailData.state = 'false'
        })
    },
    send() {
      service
        .isOnline({
          id: this.detailData.id,
          integral: this.detailData.integral,
          limit: this.detailData.limit,
        })
        .then(res => {
          if (res.data) {
            this.$message.success('上架成功')
            this.detailData.state = 'true'
          }
        })
      this.dialogVisible = false
    },
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" closed="{nav:true}" :total="total" ref="child")
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column(label="兑换商品")
        template(slot-scope="scope")
          img.icon(:src="scope.row.img")
          span {{scope.row.coupon_name}}
      el-table-column(prop="limit" label="每日限购")
      el-table-column(prop="integral" label="所需积分")
      el-table-column(prop="status" label="上架状态")
        template(slot-scope="scope")
          span {{scope.row.state==='true'?'已上架':'已下架'}}
      el-table-column(label="操作" fixed="right")
        template(slot-scope="scope")
          Icon(:title="scope.row.state=='true'?'下架':'上架'" @click="isOnline(scope.row)")
    el-dialog(:visible.sync="dialogVisible" width="600px" :before-close="handleClose")
      .detail
        .left
          .img
            img(:src="detailData.img" ref="icon")
          //.select
            el-button(type="primary" size="mini"  @click="$refs.goodsImg.click('icon','goodsImg')") 上传图片
            input.hidden(type="file" ref="goodsImg" @change="update($event,'icon')")
        .right
          el-form(ref="form" label-width="80px")
            el-form-item(label="名称类别:")
              el-input(v-model="detailData.coupon_name" disabled)
            el-form-item(label="所需积分:")
              el-input(v-model="detailData.integral")
            el-form-item(label="每天限购:")
              el-input(v-model="detailData.limit" placeholder="不填写为无限")
      span(slot="footer" class="dialog-footer")
        el-button(type="primary" size="small" @click="send") 确 定
</template>

<style lang="stylus" scoped>
.detail
  display flex
  padding-top 20px
  .left
    width 150px
    text-align center
    .img
      height 150px
      width 150px
      background #e8e8e8
      margin-bottom 10px
    img
      max-width 150px
  .right
    flex 1
    padding-right 20px
img.icon
  max-width 30px
.hidden
  display none
</style>



