<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/intearal/resources'

export default {
  mixins: [main],
  data() {
    return {
      service,
      radio: 'url',
    }
  },
  methods: {
    isOnline(data) {
      console.log(data)
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
      el-table-column(prop="resources_name" label="资源名称")
      el-table-column(prop="url" label="链接")
      el-table-column(prop="integral" label="价格（积分）")
      el-table-column(prop="status" label="上架状态")
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
          el-form-item(label="资源名称")
            el-input(v-model="detailData.resources_name")
          el-form-item(label="每日库存")
            el-input(v-model="detailData.limit")
          el-form-item(label="所需积分")
            el-input(v-model="detailData.integral")
          el-form-item(label="提示语-选填")
            el-input(v-model="detailData.remarks")
          el-form-item(label="资源方式")
            el-radio-group(v-model="radio")
              el-radio(label="file") 上传资源
              el-radio(label="url") 链接
          el-form-item(label="上传文件" v-if="radio=='file'")
            input.updateImg.hide(type="file" @change="previewImg($event,'url')" ref="updateFile")
            el-button(type="primary" size="small" @click="$refs.updateFile.click()") 上传资源
          el-form-item(label="填写链接" v-if="radio=='url'")
            el-input(v-model="detailData.url")
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

