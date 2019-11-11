<script>
import { main } from '@/util/mixins'
import * as service from 'services/x-teach/class'
import { save } from 'services/x-teach/msg'
import Info from './studentDetail'

export default {
  mixins: [main],
  components: {
    Info,
  },
  data() {
    return {
      service,
      query: {
        name: '',
        phone: '',
        time_start: '',
        time_end: '',
        status: '',
      },
      index: this.$route.query.index || '/wms/course',
      options: [
        { value: '1', label: '1小时内' },
        { value: '2', label: '2小时内' },
        { value: '3', label: '3小时内' },
      ],
      currentItem: {},
      active: false,
      messageVisible: false,
      currentDetail: {},
      ids: [],
    }
  },
  created() {
    if (!this.$route.query.id) {
      this.$router.back()
      return
    }
  },
  methods: {
    getList() {
      let data = {
        ...this.query,
        ...this.page,
      }
      let type = this.index != '/wms/course' ? 'class_id' : 'course_id'
      data[type] = this.$route.query.id
      service
        .studentList({
          ...data,
          type: this.index && this.index.split('/wms/')[1],
        })
        .then(res => {
          this.tableData = res.data
          this.total = res.page.total
        })
    },
    send(item) {
      log(item)
      this.currentDetail = item
      this.text = null
      this.messageVisible = true
    },
    sendMessage() {
      save({
        to_user_id: this.currentDetail.student_id,
        content: this.currentDetail.text,
        type: 'private_message',
      }).then(res => {
        this.$message.success('消息发送成功')
        this.messageVisible = false
      })
    },
    tabs() {
      this.active = !this.active
    },
    messageClose() {
      this.messageVisible = false
    },
    openDetail(item) {
      this.currentItem = item
      this.$refs.child.dialogVisible = true
    },
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" ref="child")
  .tab-nav(slot="content")
    el-button-group.header
      el-button(type="primary") 学生列表
      el-button(@click="$router.push({name:'CourseBill',query:{id:$route.query.id,course_id:$route.query.course_id,index}})") {{index!='/wms/course'?'班级报表':'课程报表'}}
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="学生姓名"  clearable v-model="query.name")
    el-select(v-model="query.status" clearable placeholder="今日学习时长")
      el-option(
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value")
    .right
      el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"  
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column(prop="student_name" label="学生姓名")
      el-table-column(prop="phone" label="电话" )
      el-table-column(prop="join_time" label="加入日期")
      el-table-column(prop="total_length_of_time" label="学习时长")
      el-table-column(prop="today_length_of_time" label="今日学习时长")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-detail" title="报表详细" @click="openDetail(row)")
          Icon(type="icon-menu-private-letter" title="私信" @click="send(row)")
    el-dialog.dialog(:visible.sync="messageVisible" width="1000px" :before-close="messageClose")
      .title(slot="title") 发送私信
      .all
        .msgBack
          .head
            span.name {{currentDetail.student_name}}:
            el-button(type="primary"  @click="$router.push({path:'/wms/message',query:{id:currentDetail.student_id}})" size="mini" ) 查看私信
          el-input(type="textarea" :rows="7" placeholder="请输入回复内容" v-model="currentDetail.text")
      div(slot="footer" class="dialog-footer")
        el-button( @click="messageClose" size="small") 取消
        el-button(type="primary" @click="sendMessage" size="small" ) 发送
  .detail(slot="detail")
    Info(v-if="$refs.child&&$refs.child.dialogVisible" :item="currentItem")
</template>



<style lang="stylus" scoped>
.list
  .item
    padding 10px 0
    border-bottom 1px dashed #ccc
    color #555
    .title
      line-height 30px
      b
        font-weight bold
        margin 0 40px 0 0
      .m
        color #44c3aa
    .msg
      line-height 20px
      padding 10px 10px 25px
      text-indent 2em
    .handle
      display flex
      justify-content flex-end
      font-size 15px
      color #666
      span
        padding 0 8px
        border-right 1px solid #999
        cursor pointer
        &:last-child
          border none
        &:hover
          color #44c3aa
      .danger:hover
        color #f00
.msgBack
  padding-top 5px
  .head
    margin-bottom 10px
    height 32px
    line-height 32px
    .name
      margin-right 20px
    button
      float right
  textarea
    resize none
</style>

