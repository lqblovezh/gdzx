<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/resource"
import Detail from 'projects/common/readOnlyDetail'

export default {
  mixins: [main],
  components: {
    Detail
  },
  data(){
    return {
      query:{
         name:'',
         teach_name:'',
         status: '',
      },
      service,
    }
  },
  methods:{
    use(id) {
      this.service.use({id}).then(res => {
        this.$message.success('你可以在x-publish课程制作中使用该资源，课程产生的收入将首先支付授权价格')
      },err => {
				this.$message.error(err.message)
			})
    },
    enable(id) {
      this.service.enable({id}).then(res => {
        this.getList()
      })
    }
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange" :closed="{del:true}" :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="课件资源名称"  clearable v-model="query.name")
    el-input.dy_inputWidth(placeholder="教师名称" clearable v-model="query.teach_name")
    el-select.dy_inputWidth(v-model="query.status" v-if="!$config.isTeacher")
      el-option(label="全部" value="")
      el-option(label="暂停" value="0")
      el-option(label="启用" value="1")
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
      el-table-column( label="名称")
        template(slot-scope="{row}")
          img.cover-photo(:src="row.img_src")
          .th-name.bookName(:title="row.name") {{row.name}}
      el-table-column( prop="teach_name" :label="$config.isTeacher?'所属人':'教师'")
      el-table-column( prop="status_name" label="状态" v-if="!$config.isTeacher")
      el-table-column( prop="price" label="授权价格")
      el-table-column(label="操作" fixed="right")
        template(slot-scope="{row}")
          Icon(type="icon-sync" title="使用" @click="use(row.id)" v-if="row.status===1&&$config.isTeacher")
          Icon(type="icon-essence" v-if="row.status===0&&!$config.isTeacher" title="启用" @click="enable(row.id)" )
          Icon(type="icon-un-essence" v-if="row.status===1&&!$config.isTeacher" title="停用" @click="enable(row.id)" )
          Icon(type="icon-detail" title="详情" @click="showDetail(row.id,8)")
          Icon(type="icon-delete" title="删除" @click="del([row.id])" v-if="!$config.isTeacher")
    //- 详情dialog
    Detail(
      :detailVisible.sync="detailVisible"
      v-if="detailVisible"
      :defaultData="detailData"
      :type="productType"
    )
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
