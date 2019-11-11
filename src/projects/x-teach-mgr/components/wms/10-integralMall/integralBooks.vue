<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/intearal/books'

export default {
  mixins: [main],
  data() {
    return {
      service,
    }
  },
  methods: {
    isOnline(data) {
      service
        .isOnline({
          id: data.id,
        })
        .then(_ => {
          this.getList()
          this.$message.success(data.state == 'true' ? '下架' : '上架' + '成功')
        })
    },
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" closed="{nav:true}" :total="total" ref="child" detailWidth="600px")
  .buttons(slot="buttons")
    el-button.add(@click="detail()" class='el-icon-plus' type="primary") 添加
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(prop="book_name" label="书籍名称")
      el-table-column(prop="author_name" label="作者")
      el-table-column(prop="integral" label="价格（积分）")
      el-table-column(label="上架状态")
        template(slot-scope="{row}")
          span {{row.state==='true'?'已上架':'已下架'}}
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="el-icon-sort" :title="row.state=='true'?'下架':'上架'" @click="isOnline(row)")
          Icon(type="icon-detail" @click="detail(row.id)" title="详情" v-if="row.state=='false'")
          Icon(type="icon-delete" @click="del([row.id])" title="删除" v-if="row.state=='false'")
  .detail(slot="detail")
    .info
      .cover
        .img
          img(:src="detailData.img_src||detailData.img" ref="img")
        input.updateImg.hide(type="file" @change="previewImg" ref="updateImg")
        el-button(type="primary" size="small" @click="$refs.updateImg.click()") 上传图片
      .box
        el-form.form(label-width="120px")
          el-form-item(label="书籍名称")
            el-input(v-model="detailData.book_name")
          el-form-item(label="作者")
            el-input(v-model="detailData.author_name")
          el-form-item(label="每日库存")
            el-input(v-model="detailData.limit")
          el-form-item(label="所需积分")
            el-input(v-model="detailData.integral")
</template>

<style lang="stylus" scoped>
.add
  margin-bottom 20px
.info
  padding-top 10px
  display flex
  .cover
    text-align center
    .img
      display block
      border 1px solid #e8e8e8
      margin-bottom 30px
      img
        width 150px
        height 150px
        object-fit contain
</style>

