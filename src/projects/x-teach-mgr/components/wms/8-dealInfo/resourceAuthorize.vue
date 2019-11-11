<script>
import {
  main
} from '@/util/mixins'
import * as service from 'services/x-teach/resources_order'
export default {
  mixins: [main],
  data() {
    return {
      query: {
        goods_name: '',
        order_number: '',
				type:'resources'
      },
      service,
      ids: [],
      dialogVisible: false,
    }
  },
  methods: {
		
	},
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
	.search(slot="search")
		el-input.dy_inputWidth(placeholder="交易编号" clearable v-model="query.order_number")
		el-input.dy_inputWidth(placeholder="授权名称"  clearable v-model="query.goods_name")
		el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)" ) 搜索
	.list(slot="list")
		el-table(ref="table"
			stripe
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		)
			el-table-column( prop="order_number" label="交易单号")
			//- el-table-column( prop="goods_name" label="资源名称")
			el-table-column( prop="use_goods_name" label="使用课程")
			el-table-column( prop="use_teacher_name" label="使用教师")
			el-table-column( prop="sell_count" label="出售数量")
			el-table-column( prop="authorize_price" label="授权价格(元)")
			el-table-column( prop="finally_money" label="实际获利(元)")
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

</style>
