<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/course"
import Detail from 'projects/common/readOnlyDetail'

export default {
  mixins: [main],
  components: {
    Detail
  },
  data(){
    return {
      service,
      query:{
        course_name:'',
        phone:'',
        time_start:'',
        start_time:'',
        end_time:'',
      },
      options:[
        {value: '1',label: '上架中'},
        {value: '0',label: '未上架'},
      ],
      classVisible:false,
      currentId:null,
      classfiyList:[],
      ids:[],
    }
  },
  created () {
  },
  methods:{
    close() {
      this.ids = []
      this.classVisible = false
    },
    save(){
      this.shelf(this.currentId,'up')
    },
    showClass(item) {
      this.currentId = item.id
      this.ids = []
      this.service.classfiy().then(res => {
        this.classfiyList = res.data
        this.classVisible = true
      })
    },
    accredit(id,type) { //授权
      this.service.accredit({id,type}).then(res => {
        this.$message.success('成功')
        this.getList()
      })
    },
    shelf(id,status) {// 上下架
      let  type = status=='up'?'上架':'下架'
      this.service.shelf({id,status,class_id:this.ids}).then(res => {
        this.getList()
        this.$message.success(`${type}成功!`)
        this.close()
      })
    },
    set(id) {
      let index = this.ids.findIndex( item => item == id)
      if(index > -1){
        this.ids.splice(index,1)
      }else{
        this.ids.push(id)
      }
    }
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :closed="{del:true}" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="课程名称"  clearable v-model="query.course_name")
    el-input.dy_inputWidth(placeholder="所属人" clearable v-model="query.belong" v-if="!$config.isTeacher")
    el-select(v-model="query.status" clearable placeholder="请选择" v-if="!$config.isTeacher")
      el-option(
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value")
    TimePick(@getTime="getTime" :placeholder="['创建时间','创建时间']")
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
      el-table-column(label="课程名称")
        template(slot-scope="{row}")
          img.cover-photo(:src="row.img")
          .th-name.bookName(:title="row.course_name") {{row.course_name}}
      el-table-column(prop="teacher_name" label="所属教师" v-if="!$config.isTeacher")
      el-table-column(prop="create_time" label="创建时间")
      el-table-column(prop="price" label="价格" v-if="$config.isTeacher")
      el-table-column(prop="status_name" label="上架状态" v-if="!$config.isTeacher")
      el-table-column(prop="classify_name" label="分类" v-if="!$config.isTeacher")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-comment" title="讨论区" @click="$router.push({path:'/wms/course/discuss',query:{id:row.id,index:'/wms/course'}})")
          Icon(type="icon-detail" title="详情" @click="showDetail(row.id,7)")
          Icon(type="icon-menu-class-management" title="班级" @click="$router.push({path:'/wms/course/class',query:{id:row.id,index:'/wms/course'}})")
          Icon(type="icon-ml" title="报表" @click="$router.push({path:'/wms/course/bill',query:{id:row.id,index:'/wms/course'}})")
          Icon(type="icon-essence" title="启用授权" v-if="row.enable_authorization!=='true'&&$config.isTeacher"  @click="accredit(row.id,'acc')")
          Icon(type="icon-un-essence" title="停用授权" v-if="row.enable_authorization==='true'&&$config.isTeacher" @click="accredit(row.id,'acc')")
          Icon(type="icon-bcircle-end" title="启用班级" v-if="row.enable_class!=='true'&&$config.isTeacher" @click="accredit(row.id,'class')")
          Icon(type="icon-bcircle-shield" title="停用班级" v-if="row.enable_class==='true'&&$config.isTeacher" @click="accredit(row.id,'class')")
          Icon(type="el-icon-sort" title="上架" v-if="row.status=='0'&&!$config.isTeacher" @click="showClass(row)")
          Icon(type="el-icon-sort" title="下架" v-if="row.status=='1'&&!$config.isTeacher" @click="shelf(row.id,'down')")
          Icon(type="icon-delete" title="删除" @click="del([row.id])" v-if="row.status=='0'&&!$config.isTeacher")
    el-dialog(:visible.sync="classVisible" width="500px" :before-close="close" title="选择分类")
      el-tree.classfiyList#classfiyList(
        :data="classfiyList"
        node-key ="id"
        ref="classfiyList"
        :expand-on-click-node="false"
      )
        .list(class="custom-tree-node" slot-scope="{node,data}")
          span {{data.name}}
          span.checkbox(v-if="data.name")
            el-checkbox(type="text" size="mini" name="ids" ref="ids" v-model="data.checked" @change="set(data.id)")
      div(slot="footer" class="dialog-footer")
        el-button(type="info" @click="close" size="small") 取消
        el-button(type="primary" @click="save()" size="small") 确定
    //- 详情dialog
    Detail(
      :detailVisible.sync="detailVisible"
      v-if="detailVisible"
      :defaultData="detailData"
      :type="productType"
    )
  .detail(slot="detail")
    .group
      .item
</template>



<style lang="stylus" scoped>
.classfiyList 
  >>> .el-tree-node
    line-height 40px
  .checkbox
    float right 
  .list
    width 100%
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

