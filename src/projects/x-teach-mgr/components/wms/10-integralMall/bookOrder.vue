<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/bookOrder'
import Detail from 'projects/common/readOnlyDetail'

export default {
  mixins: [main],
  components: {
    Detail,
  },
  data() {
    return {
      query: {
        book_name: '',
        state: '',
      },
      service,
    }
  },
  methods: {
    edit(item) {
      service.edit({ state: item.state != '已发货', id: item.id }).then(
        res => {
          this.getList()
          this.$message.success('修改成功')
        },
        err => {
          this.$message.error(err.message)
        }
      )
    },
    save(item) {
      this.$prompt('', '编辑备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.+$/,
        inputErrorMessage: '不能为空',
      })
        .then(({ value }) => {
          service.save({ remarks_admin: value, id: item.id }).then(res => {
            this.getList()
            this.$message.success('编辑成功')
          })
        })
        .catch(() => {})
    },
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="书籍名称"  clearable v-model="query.book_name")
    el-select.dy_inputWidth(v-model="query.state" v-if="!$config.isTeacher")
      el-option(label="全部" value="")
      el-option(label="未处理" value="false")
      el-option(label="已处理" value="true")
    .right
      el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
      el-button(type="primary" class="el-icon-download" @click="educe()") 导出
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column( prop="book_name" label="书籍名称")
      el-table-column( prop="user_name" label="姓名")
      el-table-column( prop="phone" label="电话")
      el-table-column( prop="region" label="地区")
      el-table-column( prop="address" label="地址")
      el-table-column( prop="state" label="状态")
      el-table-column( prop="remarks" label="备注")
      el-table-column( prop="remarks_admin" label="后台备注")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="el-icon-edit" title="变更状态" @click="edit(row)")
          Icon(type="el-icon-edit-outline" title="编辑备注" @click="save(row)")
    //- 详情dialog
    Detail(
      :detailVisible.sync="detailVisible"
      v-if="detailVisible"
      :defaultData="detailData"
      :type="productType"
    )
</template>

<style lang="stylus" scoped>
.message
  color #444
  .title
    text-align center
    font-size 20px
    padding 15px 0 30px 0
  .showInfo
    display flex
    justify-content space-between
    padding-bottom 20px
    a
      color #0084ff
  .content
    margin-bottom 20px
.detail .group
  display flex
  flex-wrap wrap
  line-height 30px
  .item
    margin 20px 10px
  .width
    width 180px
  .num
    width 50px
</style>