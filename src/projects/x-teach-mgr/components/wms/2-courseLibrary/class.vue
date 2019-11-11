<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/class"

export default {
  mixins: [main],
  data(){
    return {
      service,
      query:{
         class_name:null,
         teach_name:'',
         time_start:'',
         time_end:'',
         status:'',
      },
      options:[
        {value: '1',label: '上架中'},
        {value: '0',label: '未上架'},
      ],
      ids:[],
    }
  },
  created () {
    if(!this.$route.query.id){
      this.$router.back()
      return
    }
  },
  methods:{
    getList() {
      this.service.getList({course_id:this.$route.query.id,...this.query}).then(res=> {
        this.tableData = res.data
        this.total = res.page.total
      })
    },
    sendMessage(){
      log("发送信息")
      this.dialogVisible= false
    },
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="班级名称"  clearable v-model="query.teach_name")
    el-input.dy_inputWidth(placeholder="教师名称" clearable v-model="query.belong")
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
      el-table-column(prop="class_name" label="班级名称")
      el-table-column(prop="teacher_name" label="所属教师" )
      el-table-column(prop="code_count" label="授权码数量")
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
    margin 20px  10px
  .width
    width 180px
  .num 
    width 50px

</style>

