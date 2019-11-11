<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/lives"
import {
  getTask
} from 'services/common'
export default {
  mixins: [main],
  data(){
    return {
      query:{
        title:'',
        time_start:'',
        time_end:'',
      },
      service,
      ids:[],
      dialogVisible:false,
      form:{
        id:'',
        message:'',
        state:'fail'
      },
    }
  },
  methods:{
    getList(obj){
        this.service.getListPrimery(obj).then(res=>{
          if(res && res.status){
            this.total = res.page.total
            this.tableData= res.data
          }
        })
    },
    handleClose(){
      this.dialogVisible = false
    },
    detail(id){
      this.form.id = id
      this.dialogVisible = true
    },
    approve(id,state){
      service.approve({id,state}).then(res=>{
         res.status?this.getList():null

      })
    },
    send(){
       service.approve({...this.form}).then(res=>{
          this.dialogVisible=false
          this.getList()
       })
    }
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="直播名称"  clearable v-model="query.title")
    el-input.dy_inputWidth(placeholder="教师名称")
    TimePick(@getTime="getTime")
    el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)" ) 搜索
  .list(slot="list")
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column( prop="title" label="直播标题")
      el-table-column( prop= "state" label="教师")
      el-table-column( prop="introduce" label="简介")
      el-table-column( prop="start_time" label="直播时间" )
      el-table-column( prop="audit_time" label="提交审核时间" )
      el-table-column(label="操作" fixed="right")
        template(slot-scope="scope")
          el-button(type="primary" size="small" @click="approve(scope.row.id,'success')") 通过
          el-button(type="info" size="small" @click="detail(scope.row.id,'fail')") 驳回
    el-dialog.detail(:visible.sync="dialogVisible" width="600px" :before-close="handleClose")
      .title.dy_primary(slot="title") 驳回理由
        el-input.form(type="textarea" :rows="6" v-model="form.message")
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="send" size="small") 确定
</template>



<style lang="stylus" scoped>
.form
  margin-top 30px
</style>
