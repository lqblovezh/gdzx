<script>
import {
  main
} from '@/util/mixins'
import * as service from "services/x-teach/intearal/record"
export default {
  mixins: [main],
  data() {
    return {
      query: {
        name: '',
				phone: '',
				coupon_name:'',
        time_start: '',
        time_end: '',
      },
      service,
      ids: [],
    }
  },
  methods: {
    getTime(time) {
      this.query.time_start = time[0];
      this.query.time_end = time[1]
    },
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
		el-input.dy_inputWidth(placeholder="用户"  clearable v-model="query.name")
		el-input.dy_inputWidth(placeholder="电话" clearable v-model="query.phone")
		el-input.dy_inputWidth(placeholder="商品"  clearable  v-model="query.coupon_name")
		TimePick(@getTime="getTime")
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
			el-table-column(prop="user_name" label="兑换用户")
			el-table-column(prop="user_phone" label="电话" )
			el-table-column(prop="coupon_name" label="兑换商品")
			el-table-column(prop="integral" label="积分花费")
			el-table-column(prop="create_time" label="创建时间")
</template>

<style lang="stylus" scoped>


</style>
