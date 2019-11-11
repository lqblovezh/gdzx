<script>
import {
  main
} from '@/util/mixins'
export default {
  mixins: [main],
  data() {
    return {
			query:{
				name:'',
				phone:'',
				organization:'',
			},
      dialogVisible: false, //详情框
      passVisible: false, //通过模态框
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.ids = val.map(el => {
        return el.id
      })
      this.multipleSelection = val;
    },
    pass() {
      this.passVisible = true
    },
		reject() {
    },
    openPrivateDialog() {
      alert(111)
      this.privateDialog = true
    },
  },
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
	.search(slot="search")
		el-input.dy_inputWidth(placeholder="姓名"  clearable v-model="query.name")
		el-input.dy_inputWidth(placeholder="电话" clearable v-model="query.phone")
		el-input.dy_inputWidth(placeholder="单位" clearable v-model="query.organization")
		.right
			el-button(type="primary" class="el-icon-search" @click="seareHandeler(query)" plain) 搜索
			el-button(type="primary" @click="pass()" plain) 111
	.list(slot="list")
		el-table(ref="table"
			stripe
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		)
			el-table-column(type="selection" width="55" fixed)
			el-table-column( prop="name" label="姓名")
			el-table-column( prop="phone" label="电话" )
			el-table-column( prop="organization" label="单位")
			el-table-column( prop="duty" label="职务")
			el-table-column( prop="deductMoney" label="提现金额")
			el-table-column(label="操作" fixed="right")
				template(slot-scope="scope")
					Icon(title="详细信息" @click="$refs.child.dialogVisible= true")
					Icon(title="发放" @click="pass")
					Icon(title="拒绝" @click="reject")
		.dialogs
			el-dialog(:visible.sync="passVisible" width="30%" center :lock-scroll="false")
				.ticheng
					span x-teach课程设置销售比例提成
					input()
					span %
				.btns(slot="footer")
					el-button(type="primary" plain) 取消
					el-button(type="primary" plain) 确定
</template>

<style lang="stylus" scoped>
el-input
	width 300px
.btns
	margin-left 220px
.ticheng
	width 100%
	height 50px
	padding-top 80px
	line-height 30px
	font-size 16px
	input
		width 50px
	span:nth-child(1),input
		margin-right 10px

</style>
