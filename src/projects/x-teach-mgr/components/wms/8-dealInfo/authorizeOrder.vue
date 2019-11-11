<script>
import {
  main
} from '@/util/mixins'
import Detail2 from './detail2'
import * as service from 'services/x-teach/resources_order'
export default {
  mixins: [main],
	components:{ Detail2, },
  data() {
    return {
      query: {
        goods_name: '',
        order_number: '',
				type:'course',
      },
			ids: [],
			infoData:{},
			service,
      dialogVisible: false,
    }
  },
  methods: {
    show(data){
			this.infoData = data
			this.$refs.child.dialogVisible= true
		},
		save(){
			this.$refs.child.dialogVisible= false
		}
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
	.search(slot="search")
		el-input.dy_inputWidth(placeholder="交易编号" clearable v-model="query.order_number")
		el-input.dy_inputWidth(placeholder="授权名称"  clearable v-model="query.goods_name")
		el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)") 搜索
	.list(slot="list")
		el-table(ref="table"
			stripe
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		)
			el-table-column( prop="order_number" label="交易单号")
			el-table-column( prop="goods_name" label="授权课程名称")
			el-table-column( prop="use_goods_name" label="使用课程名称")
			el-table-column( prop="use_teacher_name" label="使用教师" )
			el-table-column( prop="authorize_price" label="授权价格" show-overflow-tooltip)
			el-table-column( prop="sell_count" label="销售数量")
			el-table-column( prop="finally_money" label="实际获利")
			el-table-column(label="操作" fixed="right")
				template(slot-scope="scope")
					Icon(title="详情" @click="show(scope.row)")
		el-dialog(:visible.sync="dialogVisible" width="500px" :before-close="handleClose")
	Detail2(slot="detail" :infoData="infoData")
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
