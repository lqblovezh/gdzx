<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/colleges'
import Resource from '@/components/common/Resource'

export default {
  components: { Resource },
  mixins: [main],
  data() {
    return {
      service,
      query: {
        name: '',
      },
      detailDialog: false,
      resourceDialog: false,
      curSoucesList: [],
      infoData: [],
      parameter: {
        status: 1,
      },
    }
  },
  methods: {
    opneDetailDialog(data) {
      this.detailDialog = true
      this.clumnsData = data
      this.clumnsID = data.id
      this.page = {
        pageOffset: 10,
        pageStart: 0,
        total: 1,
      }
      this.getInfoList()
    },
    getInfoList() {
      service
        .getInfoList({
          _id: this.clumnsID,
          ...this.page,
        })
        .then(res => {
          this.infoData = res.data
          this.page.total = res.page.total
        })
    },
    delAll() {
      let arr = []
      this.$refs.select.forEach(e => {
        if (e.checked) {
          arr.push(e.value)
        }
      })
      this.infoDel(arr)
    },
    selectAll(e) {
      this.$refs.select.forEach(item => {
        item.checked = e.target.checked
      })
    },
    infoDel(id) {
      this.$confirm('是否确认删除?')
        .then(() => {
          service
            .infoDel({
              _ids: id,
            })
            .then(res => {
              this.getInfoList()
              this.getList()
              this.$message.success('删除成功')
            })
        })
        .catch(() => {})
    },
    openResource() {
      this.curSoucesList = JSON.parse(JSON.stringify(this.infoData))
      this.resourceDialog = true
    },
    addInfo_send(arr) {
      service
        .infoAdd({
          _id: this.clumnsID,
          course_id: arr.map(item => item.id),
        })
        .then(res => {
          this.getInfoList()
          this.getList()
          this.resourceDialog = false
          this.$message.success('添加成功')
        })
    },
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child" detailWidth="600px")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="课件资源名称"  clearable v-model="query.name")
    .right
      el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
      el-button.add(@click="detail()" class='el-icon-plus' type="primary") 添加
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(prop="name" label="院校名称")
      el-table-column(prop="course_count" label="课程数量")
      el-table-column(prop="study_count" label="学习人数")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-data" @click="opneDetailDialog(row)" title="查看课程")
          Icon(type="icon-detail" @click="detail(row.id)" title="详情")
          Icon(type="icon-delete" @click="del([row.id])" title="删除")
    el-dialog(title="详情" :visible.sync="detailDialog" width="960px")
      .title
        el-button(type="danger" size="small" style='float:right' @click="delAll") 解除绑定
        el-button(type='primary' size='small' style='float:right' @click="openResource") 添加
      table.infoData.table
        tr
          td(width='5%')
            input(type='checkbox' @click='selectAll')
          td 名称
          td(width='25%') 创建时间
          td 操作
        tr(v-for='item in infoData' v-if='infoData')
          td
            input(type='checkbox' ref="select" :value="item.id")
          td {{item.course_name}}
          td {{item.create_time}}
          td
            Icon(type="icon-delete" @click="infoDel([item.id])" title="解除绑定")
        tr(v-if='!infoData.length')
          td.center(colspan='6') 暂无数据
      .pageWrap(v-if="page")
        el-pagination(
          :small="false" background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.num"
          :page-sizes="[10, 50, 100]"
          :page-size="page.offset"
          layout="total, sizes,prev, pager, next, jumper"
          :total="page.total"
        )
      //- 选择已上架资源
      Resource(
        :resourceDialog.sync="resourceDialog" 
        type="course"
        :isShowSearch="true"
        v-if="resourceDialog" 
        @select="addInfo_send"
        :parameter="parameter",
      )
  .detail(slot="detail")
    .info
      .cover
        .img
          img(:src="detailData.img_src||detailData.img" ref="img" alt="院校logo")
        input.updateImg.hide(type="file" @change="previewImg" ref="updateImg")
        el-button(type="primary" size="small" @click="$refs.updateImg.click()") 上传图片
      .box
        el-form.form(label-width="120px")
          el-form-item(label="院校名称")
            el-input(v-model="detailData.name")
          el-form-item(label="英文名称")
            el-input(v-model="detailData.english_name")
          el-form-item(label="校训")
            el-input(v-model="detailData.school_motto")
          el-form-item(label="地址")
            el-input(type="textarea" v-model="detailData.address")
          el-form-item(label="简介")
            el-input(type="textarea" v-model="detailData.abs")
</template>

<style lang="stylus" scoped>
.center
  text-align center
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

