<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/lession'
import { setTimeout } from 'timers'
export default {
  mixins: [main],
  data() {
    return {
      service,
      children: [],
      query: {
        id: 0,
      },
      form: {
        src: '',
        name: '',
        img: '',
      },
    }
  },
  methods: {
    getList() {
      service.getList(this.query).then(res => {
        log(res)
        this.tableData = JSON.parse(JSON.stringify(res.data))
      })
    },
    append(data) {
      this.$prompt('请输入分类名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        inputErrorMessage: '输入内容不能为空！！',
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你加的分类为: ' + value,
          })
          if (!data.children) {
            this.$set(data, 'children', [])
          }
          service.save({ pid: data.id, name: value }).then(res => {
            if (res && res.status) {
              this.getList()
              // data.id != 0
              //   ? data.children.unshift({ name: value })
              //   : this.tableData.unshift({ name: value })
            }
          })
        })
        .catch(() => {})
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      let $msg
      if (data.pid == 0) {
        $msg = '此操作将删除所有子集分类且不能恢复, 是否继续'
      } else {
        $msg = '你真的要删除这条数据吗？'
      }
      this.$confirm($msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          service.del({ id: data.id }).then(res => {
            if (res && res.status) {
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    open(e, item) {
      if (item) {
        service.getList({ id: item.id }).then(res => {
          this.children = res.data
        })
      } else {
        this.children = []
      }
      this.$refs.ani.classList = 'info animated zoomOutRight'
      setTimeout(_ => {
        this.$refs.ani.classList = 'info animated zoomIn'
      }, 500)
      this.tableData.forEach(el => {
        el.class = 'el-icon-circle-plus'
      })
      item.class = 'el-icon-remove'
    },
    add(type) {
      if (type == 'p') {
        this.tableData.push({ class: 'el-icon-circle-plus', children: [] })
      } else {
        this.tableData.push({ class: 'el-icon-circle-plus', children: [] })
      }
    },
    send_parent(i) {
      log(this.tableData[i].name)
      if (this.tableData[i].name) {
        service.save({ id: 0, name: this.tableData[i].name }).then(res => {
          if (res && res.status) {
            this.$message.success('添加成功')
          }
        })
      } else {
        this.$message.error('新增失败,该条数据内容不能为空')
        this.tableData.splice(i, 1)
      }
    },
  },
}
</script>

<template lang="pug">
.setting
  .content
    .part
      .title 课程类别 :
      el-tree(
        :data="tableData"
        node-key ="id"
        accordion
        :expand-on-click-node="false")
        .list(class="custom-tree-node" slot-scope="{node,data}")
          span {{data.name}}
          span(v-if="data.name")
            el-button(type="text" size="mini" @click="() => append(data)") 添加
            el-button(type="text" size="mini" @click="() => remove(node, data)") 删除
      el-button.add(type="primary" size="mini" @click="() => append({id:0})") 添加
</template>

<style lang="stylus" scoped>
.setting
  padding 20px
  color #444
  min-width 1660px
.content
  background #fff
  padding 15px
  border-radius 5px
  box-shadow 3px -3px 8px #dfdfdf
  .part
    .title
      margin-bottom 12px
      font-weight bold
      line-height 30px
      font-size 18px
  .list
    width 600px
    display flex
    overflow hidden
    line-height 30px
    justify-content space-between
.add
  margin-top 20px
</style>

