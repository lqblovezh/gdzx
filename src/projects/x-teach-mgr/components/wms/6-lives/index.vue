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
        state:'',
        online:'',
        teacher_name:'',
        time_start:'',
        time_end:'',
      },
      service,
      ids:[],
      dialogVisible:false,
      form:{
        url:'',
        title:'',
        img:'',
        message:'',
        introduce:'',
        start_time:'',
      },
    }
  },
  methods:{
    handleClose(){
      this.dialogVisible = false
    },
    detail(info = {
      url:'',
      title:'',
      img:'',
      message:'',
      introduce:'',
      start_time:'',
    }){
      for(let key in info){
        this.form[key] = info[key]
      }
      this.dialogVisible = true
    },
   async sendInfo(el){
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      })
      if(this.$refs[el].files[0]){
       await getTask(this.$refs[el].files[0]).then(res => {
         let data = {...this.form};
             data.img = res.data.path;
             this.save(data);
             loading.close()
       })
      }else{
          this.save(this.form);
          loading.close()
      }
      this.$refs[el].value = ''
    },
    approve(id){
      service.approve({id,state:"approveing"}).then(res=>{
         if(res && res.status){
           this.$message.success("已经提交管理员审核")
           this.getList(this.query)
         }
      })
    },
    online(id){
      service.isOnLine({id}).then(res=>{
        if(res && res.status){
           this.$message.success("已上架")
           this.getList(this.query)
         }
      },err=>{
        this.$message.error("请先审核再上架")
      })
    }
  },
  filters: {
    formateText(val) {
      if(val.length>20) {
        return val.substr(0,20) + '...'
      }
      return val
    }
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :closed="{del:true}" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="直播名称"  clearable v-model="query.title")
    el-input.dy_inputWidth(placeholder="教师名称"  clearable v-model="query.teacher_name")
    TimePick(@getTime="getTime")
    el-select.width(v-model="query.online"  placeholder="选择上架状态")
      el-option.hidden(label=""  value="")
      el-option(label="全部"  value=" ")
      el-option(label="已上架" value="true")
      el-option(label="未上架" value="false")
    el-select.width(v-model="query.state" placeholder="选择审核状态")
      el-option.hidden(label="" value="")
      el-option(label="全部" value=" ")
      el-option(label="未审核" value="not_approve")
      el-option(label="审核中" value="approveing")
      el-option(label="审核未通过" value="fail")
      el-option(label="审核已通过" value="success")
    el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)" plain ) 搜索
    el-button(type="primary" @click="detail()" v-if="$config.isTeacher") 新建
    el-button(type="danger" @click="del(ids)") 批量删除
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
      el-table-column( prop="start_time" label="直播时间" )
      el-table-column( prop="teacher_name" label="所属老师" )
      el-table-column( prop="state" label="审核状态" )
      el-table-column( prop="online" label="上架状态")
      el-table-column( label="简介")
        template(slot-scope="{row}")
          div(:title="row.introduce") {{row.introduce|formateText}}
      el-table-column( prop="create_time" label="创建时间" show-overflow-tooltip)
      el-table-column(label="操作" fixed="right")
        template(slot-scope="scope")
          Icon(title="详情" @click="detail(scope.row)")
          Icon(title="提交审核" @click="approve(scope.row.id)" v-if="isTeacher")
          Icon(:title="scope.row.online=='已上架'?'下架':'上架'" v-if="!$config.isTeacher" @click="online(scope.row.id)" )
          Icon(title="删除" @click="del([scope.row.id])")
    el-dialog.detail(:visible.sync="dialogVisible" v-if="dialogVisible" width="800px" :before-close="handleClose")
      fieldset(:disabled="!$config.isTeacher")
        .title.dy_primary(slot="title") 直播信息
        .info
          .cover
            .img
              img(:src="form.img" ref="img")
            input.updateImg(type="file" @change="update($event,'img')" ref="updateImg")
            el-button(type="primary" size="small" @click="$refs.updateImg.click()") 上传封面
          .box
            el-form.form(ref="form" :model="form" label-width="120px")
              el-form-item(label="直播名称")
                el-input(v-model="form.title")
              el-form-item(label="直播地址")
                el-input(v-model="form.url")
              el-form-item(label="直播简介")
                el-input(type="textarea" :rows="4" v-model="form.introduce")
              el-form-item(label="直播时间")
                el-date-picker(
                  v-model="form.start_time"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder = "选择日期时间"
                  )
        span.dy_danger(v-if="form.message") 驳回理由：{{form.message}}
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="sendInfo('updateImg')" size="small" v-if="$config.isTeacher") 确定
</template>



<style lang="stylus" scoped>
.detail .info
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
.updateImg
  display none
.form
  width 500px
.hidden
  display none
.width 
	width 150px
</style>
