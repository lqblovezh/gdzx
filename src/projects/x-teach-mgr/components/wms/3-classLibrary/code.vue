<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/class"

export default {
  mixins: [main],
  data(){
    return {
      service,
      query:{
         code:'',
         phone:'',
         time_start:'',
         time_end:'',
         status:'',
         tiem:'',
      },
      options:[
        {value: '1',label: '正常'},
        {value: '0',label: '禁用'},
      ],
      options2:[
        {value: '30',label: '30'},
        {value: '60',label: '60'},
        {value: '90',label: '90'},
        {value: '120',label: '120'},
        {value: '180',label: '180'},
        {value: '360',label: '360'},
      ],
    }
  },
  created () {
    if(!this.$route.query.id){
      this.$router.back()
      return
    }
  },
  methods:{
    sendMessage(){
      log("发送信息")
      this.dialogVisible= false
    },
    getList() {
      this.service.codeList({class_id:this.$route.query.id,...this.query,...this.page}).then( res => {
        this.total = res.page.total
        this.tableData = res.data
      })
    },
    back(id) {
      this.$confirm("是否要收回该授权码", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          this.service.back({id}).then(res=>{
            if(res && res.status){
              this.getList({...this.page,...this.query})
            }
          })
          
        }).catch(() => {
        });
    },
    del(ids){
      this.$confirm("你真的要删除该授权码吗？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          this.service.delCode({id:ids}).then(res=>{
            if(res && res.status){
              this.getList({...this.page,...this.query})
              this.$message.success('删除成功');
            }
          },({payload}) => {
            this.$message.error(payload.message)
          })
        }).catch(() => {
        });
    },
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="授权码"  clearable v-model="query.code")
    //- el-input.dy_inputWidth(placeholder="电话" clearable v-model="query.phone")
    TimePick(@getTime="getTime")
    el-select(v-model="query.time" clearable placeholder="时效")
      el-option(
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value")
    el-select(v-model="query.status" clearable placeholder="状态")
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
      el-table-column( prop="authorization_code" label="授权码")
      el-table-column( prop="create_time" label="创建日期")
      el-table-column( prop="state" label="状态" )
      el-table-column( prop="student_name" label="使用者")
      el-table-column( prop="prescription" label="时效")
      el-table-column( prop="create_time" label="启用时间")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-delete" title="删除" @click="del(row.id)" v-if="!$config.isTeacher")
          Icon(type="icon-reject" title="收回" @click="back(row.id)" v-if="$config.isTeacher")
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

