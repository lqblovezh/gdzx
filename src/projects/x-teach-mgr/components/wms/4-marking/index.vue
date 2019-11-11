<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/marking"
// import GroupList from "@/components/common/GroupList"

export default {
  mixins: [main],
  // components:{GroupList},
  data(){
    return {
      service,
      query:{
         course_name:'',
         name:'',
         time_start:'',
         time_end:'',
      },
      currGroup:'',
      groupList:'',
      ids:[],
      options:[
        {label:'全部',value:'0'},
        {label:'未阅卷',value:'1'},
        {label:'已阅卷',value:'2'}
      ]
    }
  },
  methods:{
    getTime(time){
       this.query.time_start = time[0];
       this.query.time_end = time[1]
    },
    handleSelectionChange(val) {
      this.ids = val.map(el=>{
          return el.id
      })
      this.multipleSelection = val;
    },
    sendMessage(){
      log("发送信息")
      this.dialogVisible= false
    },
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="课程名称"  clearable v-model="query.course_name")
    el-input.dy_inputWidth(placeholder="试卷名称" clearable v-model="query.name")
    el-select(v-model="query.type" clearable placeholder="选择状态")
      el-option(
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      )
      </el-option>
    </el-select>
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
      el-table-column( prop="course_name" label="课程名称")
      el-table-column( prop="name" label="试卷名称" )
      el-table-column( prop="paper_status" label="状态")
      el-table-column( prop="user_name" label="答题人")
      el-table-column( prop="is_auto_name" label="自动阅卷" show-overflow-tooltip)
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-menu-marking" title="阅卷" @click="$router.push({path:'/wms/marking/exe',query:{id:row.id,index:'/wms/marking'}})")
          Icon(type="icon-delete" title="删除" @click="del([row.id])")
</template>



<style lang="stylus" scoped>
.el-select
  width 145px
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

