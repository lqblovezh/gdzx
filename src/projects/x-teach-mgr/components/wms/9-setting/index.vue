<script>
import { main } from '@/util/mixins'
export default {
  mixins: [main],
  data() {
    return {
      query: {
        name: '',
        phone: '',
        time_start: '',
        time_end: '',
      },
      ids: [],
      dialogVisible: false,
    }
  },
  methods: {
    getTime(time) {
      this.query.time_start = time[0]
      this.query.time_end = time[1]
    },
    handleSelectionChange(val) {
      this.ids = val.map(el => {
        return el.id
      })
      this.multipleSelection = val
    },
    sendMessage() {
      log('发送信息')
      this.dialogVisible = false
    },
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="用户"  clearable v-model="query.name")
    el-input.dy_inputWidth(placeholder="电话" clearable v-model="query.phone")
    TimePick(@getTime="getTime")
    .right
      el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)" plain) 搜索
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"  
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column( prop="name" label="用户")
      el-table-column( prop="phone" label="电话" )
      el-table-column(label="兑换商品")
      el-table-column(label="积分")
      el-table-column( prop="create_time" label="创建时间" show-overflow-tooltip)
      el-table-column(label="操作" fixed="right")
        template(slot-scope="scope")
          Icon(title="详情" @click="$refs.child.dialogVisible= true")
          Icon(title="删除" @click="del(scope.row.id)")  
    el-dialog(:visible.sync="dialogVisible" width="500px" :before-close="handleClose")
      .message 
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="sendMessage()" size="small") 确定
  .detail(slot="detail")
    .group
      .item
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

