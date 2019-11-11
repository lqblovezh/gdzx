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
  },
  methods:{
    getList() {
      service.getPubList({...this.query,...this.page}).then(res => {
        this.tableData= res.data
        this.total = res.page.total
      })
    },
    use(id) {
      this.service.use({id}).then(res => {
        this.$message.success('你可以在x-publish中修改该课程，产生的收益将首先支付原教师的课程价格')
      })
    }
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="课程名称"  clearable v-model="query.course_name")
    el-input.dy_inputWidth(placeholder="所属教师" clearable v-model="query.teach_name")
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
      el-table-column(prop="teach_name" label="所属教师" )
      el-table-column(prop="price" label="价格")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-detail" title="详情" @click="showDetail(row.id,7)")
          Icon(type="icon-essence" title="使用该课程" @click="use(row.id)")
    Detail(
      :detailVisible.sync="detailVisible"
      v-if="detailVisible"
      :defaultData="detailData"
      :type="productType"
    )
</template>



<style lang="stylus" scoped>
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

