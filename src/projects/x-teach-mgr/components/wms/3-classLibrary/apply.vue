<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/course"
import Detail from 'projects/common/readOnlyDetail'

export default {
  mixins: [main],
  components: { Detail },
  data(){
    return {
      service,
      query:{
         course_name:'',
         teach_name:'',
         start_time:'',
         end_time:'',
         enable_class: true,
      },
      ids:[],
      currentId: null,
      applyVisible: false,
      detailDate:{},
    }
  },
  methods:{
    getList(){
      this.service.getList({...this.query,...this.page}).then(res=>{
        this.total = res.page.total
        this.tableData = res.data
      })
    },
    close() {
      this.applyVisible= false
    },
    apply(id) {
      this.currentId = id
      this.applyVisible = true
    },
    save() {
      this.service.apply({...this.detailDate,course_id:this.currentId}).then(res => {
        this.applyVisible = false
      })
    }
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="课程名称"  clearable v-model="query.course_name")
    el-input.dy_inputWidth(placeholder="所属教师" clearable v-model="query.teach_name")
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
      el-table-column( prop="create_time" label="创建时间" )
      el-table-column( prop="teacher_name" label="所属教师" )
      el-table-column( prop="price" label="价格")
      el-table-column( prop="price" label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-essence" title="申请班级" @click="apply(row.id)")
          Icon(type="icon-detail" title="详情" @click="showDetail(row.id,7)")
    el-dialog(:visible.sync="applyVisible" width="500px" :before-close="close")
      .container
        p 你可以在此课程下开始班级，班级将以授权码形式进入
        .group
          label 班级名称：
          input.form-control(type="input" v-model="detailDate.class_name")
        .group
          label 授权码数量：
          input.form-control(type="input" v-model="detailDate.code_count")
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

