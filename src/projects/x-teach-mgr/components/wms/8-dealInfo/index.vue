<script>
import {
  main
} from '@/util/mixins'
import * as service from "services/x-teach/lession_order"
import Detail1 from './detail1'
export default {
  mixins: [main],
	components:{Detail1},
  data() {
    return {
      query: {
        course_name: '',
        order_number: '',
      },
			ids: [],
			service,
			dialogVisible: false,
			infoData:{},
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
		el-input.dy_inputWidth(placeholder="交易编号"  clearable v-model="query.order_number")
		el-input.dy_inputWidth(placeholder="课程名称" clearable v-model="query.course_name")
		el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)" ) 搜索
	.list(slot="list")
		el-table(ref="table"
			stripe
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		)
			el-table-column( prop="id" label="交易单号" )
			el-table-column( prop="pay_time" label="交易时间")
			el-table-column( prop="goods_name" label="课程名称")
			el-table-column( prop="user_name" label="购买用户")
			el-table-column( prop="price" label="交易金额")
			el-table-column( prop="authorization_course_price" label="使用授权课程(元)")
			//- el-table-column( prop="authorization_resources_price" label="使用授权资源(元)")
			el-table-column(label="操作" fixed="right")
				template(slot-scope="scope")
					Icon(title="详情" @click="show(scope.row)")
		el-dialog(:visible.sync="dialogVisible" width="500px" :before-close="handleClose")
	Detail1(slot="detail" :infoData="infoData")
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
