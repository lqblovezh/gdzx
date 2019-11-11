<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/class"

export default {
  mixins: [main],
  data(){
    return {
      service,
      query:{
         class_name:'',
         phone:'',
         time_start:'',
         time_end:'',
      },
      applyVisible:false,
      num: null,
    }
  },
  methods:{
    sendMessage(){
      log("发送信息")
      this.applyVisible= false
    },
    close() {
      this.applyVisible= false
    },
    apply(data) {
      this.currentDate = data
      this.applyVisible = true
    },
    save() {
      this.service.applyAgain({
        class_id: this.currentDate.id,
        code_count: this.num,
      }).then(res => {
        this.applyVisible = false
        this.$message.success('申请成功')
        this.getList()
      }) 
    }
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :closed="{del:true}" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="班级名称"  clearable v-model="query.class_name")
    el-input.dy_inputWidth(placeholder="教师名称"  clearable v-model="query.teacher_name" v-if="!$config.isTeacher")
    TimePick(@getTime="getTime" :placeholder="['创建时间','创建时间']" v-if="!$config.isTeacher")
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
      el-table-column( prop="teacher_name" label="创建教师" v-if="!$config.isTeacher")
      el-table-column( prop="course_name" label="课程名称")
      el-table-column( prop="code_count" label="授权码数量")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-essence" title="授权码" @click="$router.push({path:'/wms/class/code',query:{id:row.id,index:'/wms/class'}})")
          Icon(type="icon-bcircle-end" title="再次申请授权码" @click="apply(row)" v-if="$config.isTeacher")
          Icon(type="icon-export" title="导出授权码" @click="educe(row.id)" v-if="$config.isTeacher")
          Icon(type="icon-ml" title="报表" @click="$router.push({path:'/wms/course/bill',query:{id:row.id,course_id:row.course_id,index:'/wms/class'}})")
          Icon(type="icon-delete" title="删除" @click="del([row.id])")
    el-dialog(:visible.sync="applyVisible" width="500px" :before-close="close")
      .container
        .group
          label 授权码数量：
          input.form-control(type="input" v-model="num")
      div(slot="footer" class="dialog-footer")
        el-button(type="info" @click="close" size="small") 取消
        el-button(type="primary" @click="save()" size="small") 确定
  .detail(slot="detail")
    .group
      .item
</template>



<style lang="stylus" scoped>
.container
  text-align center
  .group
    line-height 38px
    margin 10px 0
  p
    line-height 40px
  label 
    min-width 100px
    display inline-block
    text-align left 
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

