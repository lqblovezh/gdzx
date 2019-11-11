<script>
import {
  main
} from '@/util/mixins'
import * as service from "services/x-teach/intearal/getRecord"
export default {
  mixins: [main],
  data() {
    return {
      query: {
        name: '',
        phone: '',
      },
      service,
      ids: [],
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.ids = val.map(el => {
        return el.id
      })
      this.multipleSelection = val;
    },
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
	.search(slot="search")
		el-input.dy_inputWidth(placeholder="用户" v-model="query.name" clearable )
		el-input.dy_inputWidth(placeholder="电话" v-model="query.phone" clearable )
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
			el-table-column( prop="user_name" label="用户")
			el-table-column( prop="user_phone" label="电话" )
			el-table-column(prop="note" label="获取渠道")
			el-table-column(prop="value" label="积分")
			el-table-column( prop="create_time" label="创建时间")
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
