<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/member'
import { mapMutations, mapState } from 'vuex'
import Detail from './detail'

export default {
  mixins: [main],
  data() {
    return {
      services,
      detailVisible: false, //详情框
      detailDialoaType: 'info', //详情tabs类型
      detailData: {}, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
    }
  },
  components: { Detail },
  methods: {
    setList(data) {
      //设置列表
      this.setSerieslist(data)
    },
    setPage(data) {
      //设置页码
      this.setSerieslistPage(data)
    },
    opneDetailDialog(type, item) {
      this.services.detail({ id: item.user_id, ...item }).then(res => {
        this.detailData = res
        this.detailDialoaType = type
        this.detailVisible = true
      })
    },
    ...mapMutations(['setSerieslist', 'setSerieslistPage']),
  },
  computed: {
    ...mapState({
      list: state => state.series.list,
      page: state => state.series.page,
    }),
  },
}
</script>

<template lang="pug">
.index.clearfix
	.mainRight
		.contentWrap
			.contentLeft
				.maindata
					.serachWrap
						.title
						form#mainForm.clearfix
							span.group-inline
								el-input(placeholder="名称" name="name" clearable v-model="searchQuery.name")
							//- span.group-inline
							//- 	TimePick(:inputsName="['start_time','end_time']")
							span.group-inline.float-right
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								//- .btns
								//- 	el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.table-check
										input(type="checkbox" @click="$checkAll($event)")
									th 昵称
									th 地区
									th 消费总额
									th 扫码数量
									th 扫码产品
									th 资源购买数量
									th 关注公众号
									th() 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids")
									th
										img.cover-photo()
										.th-name.bookName(:title="item.name") {{item.nick_name}}
									th
										.th-name {{item.pro}}
									th
										.th-name {{item.total_consumption}}
									th
										.th-name {{item.scan_qrcode_count}}
									th
										.th-name {{item.scan_product_count}}
									th
										.th-name {{item.buy}}
									th
										.th-name {{item.follow}}
									th
										.btns
											//- Icon(type="icon-detail" title="详情" @click="opneDetailDialog('info',item)")
											span(type="icon-detail" title="详情" @click="opneDetailDialog('info',item)") 详情&nbsp;&nbsp;
											//- Icon(type="icon-delete" title="删除" @click="delChoosen(item.user_id)")
											span(type="icon-delete" title="删除" @click="delChoosen(item.user_id)") 删除
						//- 分页
						.pageWrap(v-if="page")
							el-pagination(
								:small="false" background
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="page.num"
								:page-sizes="[10, 50, 100]"
								:page-size="page.offset"
								layout="total, sizes,prev, pager, next, jumper"
								:total="page.total"
							)
						.dialogs
							//- 详情
							el-dialog(
								:center="false"
								:visible.sync="detailVisible"
								:type="detailDialoaType"
								append-to-body
								to="50px"
								width="1200px"
								title="详情"
								)
								.content(slot="title")
									Detail(
										v-if="detailVisible"
										:detailData="detailData"
										:detailVisible.sync="detailVisible"
									)
</template>


<style lang="stylus" scoped>
.tableWrap
  width 97%
.form-control
  width 170px
.width-small
  width 100px
.el-dialog__wrapper
  .form-control
    margin-right 10px
    width 100px
    min-width @width
.contList
  li
    display inline-block
    padding-right 10px
  .disabled
    color #bdbdbd
</style>
