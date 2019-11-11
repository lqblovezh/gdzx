<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/ArVr'
import Resource from '@/components/common/Resource'

export default {
  components: { Resource },
  mixins: [main],
  data() {
    return {
      service,
      query: {
        keyword: '',
      },
      detailDialog: false,
      infoData: [],
      clumnsData: {},
      clumnsID: null,
    }
  },
  methods: {
    opneDetailDialog(data) {
      this.detailDialog = true
      this.clumnsID = data.id
      this.page = {
        pageOffset: 10,
        pageNum: 0,
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
              id,
            })
            .then(res => {
              this.getInfoList()
              this.getList()
              this.$message.success('删除成功')
            })
        })
        .catch(() => {})
    },
    async importCodes(e, type) {
      let node = e.target
      let file = node.files[0]
      this.$refs.updateFile.setAttribute('type', 'text')
      this.$refs.updateFile.setAttribute('type', 'file')
      const { url, path } = await this.$globalUpdateFile(file)
      service
        .infoAdd({
          import_file: path,
          book_id: this.clumnsID,
        })
        .then(res => {
          this.$message({
            dangerouslyUseHTMLString: true,
            message:
              '<strong>' + res.message.replace(/;/g, '<br/>') + '</strong>',
          })
          this.getInfoList()
        })
        .catch(({ payload }) => {
          this.$message.error(payload.message)
        })
    },
    handleInfoCurrentChange(val) {
      this.page.pageNum = val
      this.getInfoList()
      // this.getList({ ...this.page, ...this.query })
    },
    modify({ book_id, code, id }) {
      this.$prompt('', '是否修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: code,
        inputPattern: /^.+$/,
        closeOnClickModal: false,
        inputErrorMessage: '不能为空',
      })
        .then(({ value }) => {
          service
            .modify({ book_id, id, code: value })
            .then(res => {
              this.getInfoList()
              this.$message.success('修改成功')
            })
            .catch(({ payload }) => {
              this.$message.error(payload.message)
            })
        })
        .catch(() => {})
    },
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total" ref="child" detailWidth="600px")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="Ar名称"  clearable v-model="query.keyword")
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
      el-table-column(prop="name" label="Ar名称")
      el-table-column(prop="author" label="作者")
      el-table-column(prop="isbn" label="isbn")
      el-table-column(prop="create_time" label="创建时间")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-data" @click="opneDetailDialog(row)" title="查看授权码")
          Icon(type="icon-detail" @click="detail(row.id)" title="详情")
          Icon(type="icon-delete" @click="del([row.id])" title="删除")
    el-dialog(title="详情" :visible.sync="detailDialog" width="700px")
      .title
        el-button(type="danger" size="small" style='float:right' @click="delAll") 删除
        el-button(type='primary' size='small' style='float:right' @click="$refs.updateFile.click()") 导入
        el-button(type="primary" size="small" style='float:right')
          <a class="color" href="http://gdzx.xnjdcbs.com/ar_code.xlsx">模板下载</a>
        input.updateImg.hide(type="file" @change="importCodes" ref="updateFile" accept=".xls,.xlsx")
      table.infoData.table
        tr
          td(width='5%')
            input(type='checkbox' @click='selectAll')
          td 授权码
          td 状态
          td(width='25%') 创建时间
          td 操作
        tr(v-for='item in infoData' v-if='infoData')
          td
            input(type='checkbox' ref="select" :value="item.id")
          td {{item.code}}
          td {{item.authorized_time?'已使用':'未使用'}}
          td {{item.create_time}}
          td(v-if="!item.authorized_time")
            Icon(type="icon-detail" @click="modify(item)" title="修改")
            Icon(type="icon-delete" @click="infoDel([item.id])" title="删除")
        tr(v-if='!infoData.length')
          td.center(colspan='6') 暂无数据
      .pageWrap(v-if="page")
        el-pagination(
          :small="false" background
          @current-change="handleInfoCurrentChange"
          :current-page="page.num"
          :page-sizes="[10, 50, 100]"
          :page-size="page.offset"
          layout="total, prev, pager, next"
          :total="page.total"
        )
  .detail(slot="detail")
    .info
      .cover
        .img
          img(:src="detailData.cover_absolute||detailData.cover_absolute" ref="img" alt="封面")
        input.updateImg.hide(type="file" @change="previewImg" ref="updateImg")
        el-button(type="primary" size="small" @click="$refs.updateImg.click()") 上传图片
      .box
        el-form.form(label-width="120px")
          el-form-item(label="Ar名称")
            el-input(v-model="detailData.name")
          el-form-item(label="作者")
            el-input(v-model="detailData.author")
          el-form-item(label="isbn")
            el-input(v-model="detailData.isbn")
          el-form-item(label="苹果资源地址")
            el-input(type="url" v-model="detailData.res_uri_ios")
          el-form-item(label="苹果资源版本")
            el-input(type="url" v-model="detailData.version_ios")
          el-form-item(label="苹果强制更新")
            el-switch(v-model="detailData.version_ios_update" active-color="#13ce66" :active-value="1" :inactive-value="0")
            //- el-input(type="url" v-model="detailData.version_ios_update")
          el-form-item(label="安卓资源地址")
            el-input(type="url" v-model="detailData.res_uri_android")
          el-form-item(label="安卓资源版本")
            el-input(type="url" v-model="detailData.version_android")
          el-form-item(label="安卓强制更新")
            el-switch(v-model="detailData.version_android_update" active-color="#13ce66" :active-value="1" :inactive-value="0")
            //- el-input(type="url" v-model="detailData.version_android_update")
</template>

<style lang="stylus" scoped>
.color
  color #fff
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

