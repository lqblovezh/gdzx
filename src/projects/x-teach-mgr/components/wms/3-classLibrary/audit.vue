<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/class"
import {getTask} from "services/common"

export default {
  mixins: [main],
  data(){
    return {
      service,
      query:{
         name:'',
         phone:'',
         time_start:'',
         time_end:'',
      },
      options2:[
        {value: '30',label: '30'},
        {value: '60',label: '60'},
        {value: '90',label: '90'},
        {value: '120',label: '120'},
        {value: '180',label: '180'},
        {value: '360',label: '360'},
        {value: '永久',label: '永久'},
      ],
      currentDetail: {},
      file: null,
      currentId: null,
    }
  },
  methods:{
    getList() {
      this.service.getAuditList({...this.query,...this.page}).then( res => {
        this.tableData = res.data
        this.total = res.page.total
      })
    },
    sendMessage(){
      log("发送信息")
      this.dialogVisible= false
    },
    fileChange(e) {
      var node = e.target
      var file = node.files[0]
      this.file = file
    },
    async save() { // 通过
      if (this.file) {
        let progress = this.$progress()
        await getTask(this.file, {
            is_chunk: true,
            size: 1024 * 1024
          },
          (num) => {
            progress.percentage = num
          }).then(res => {
          this.currentDetail.url = res.data.path
        })
        progress.close();
      }
      this.service.upload({
        id: this.currentDetail.id,
        url: this.currentDetail.url,
      }).then(res => {
        this.getList()
        this.$refs.child.dialogVisible = false
      },err => {
        this.$message.error(err.message)
      })
    },
    refuse(id) { // 拒绝
      this.service.refuse({id}).then(res => {
        this.getList()
      })
    },
    open(data) {
      this.file = null
      this.currentDetail = data
      this.$refs.child.dialogVisible = true
    }
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="名称"  clearable v-model="query.name")
    el-input.dy_inputWidth(placeholder="教师名称" clearable v-model="query.phone")
    TimePick(@getTime="getTime")
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
      el-table-column( prop="class_name" label="班级名称")
      el-table-column( prop="teacher_name" label="班级创建人")
      el-table-column( prop="course_name" label="使用课程")
      el-table-column( prop="price" label="课程价格")
      el-table-column( prop="code_count" label="授权码数量" show-overflow-tooltip)
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-sync" title="通过并发放授权码" @click="open(row)")
          Icon(type="icon-reject" title="拒绝" @click="refuse(row.id)")
  .detail(slot="detail")
    .group
      label 授权数量：
      span {{currentDetail.code_count||'没填'}}
    //- .group
    //-   label 时效：
    //-   el-select.select(v-model="query.audit_time" placeholder="时效")
    //-     el-option(
    //-       v-for="item in options2"
    //-       :key="item.value"
    //-       :label="item.label"
    //-       :value="item.value")
    //-     //- span {{currentDetail.audit_time}}
    .group
      label 授权码文件：
      span(v-text="file.name" v-if="file")
      el-button(size="mini " type="primary"  @click="$refs.tushu.click()" ) 选择文件
      input.hide( @change="fileChange" type="file"  ref="tushu" accept=".xls,.xlsx")

</template>



<style lang="stylus" scoped>
.detail .group
  display flex
  flex-wrap wrap
  line-height 40px
  margin-bottom 20px
  .select
    width 100px
  label 
    min-width 100px
    display inline-block
    text-align right  
  .item 
    margin 20px  10px
  .width
    width 180px
  .num 
    width 50px

</style>

