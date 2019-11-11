<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/marketing'
import Detail from '../showList/detail'

import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Detail,
  },
  mixins: [main],
  data() {
    return {
      services,
      detailVisible: false, //详情框
      detailDialoaType: 'info', //详情tabs类型
      detailData: {}, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      parameter: {
        type: 'retransmission',
      },
    }
  },
  methods: {
    setList(data) {
      //设置列表
      this.setSerieslist(data)
    },
    setPage(data) {
      //设置页码
      this.setSerieslistPage(data)
    },
    saveok() {
      this.detailVisible = false
      this.getList()
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
							span.group-inline
								TimePick(:inputsName="['start_time','end_time']")
							span.group-inline
								select.form-control.width-small( placeholder="标签" name="status")
									option(value="") 全部
									option(value="true") 使用中
									option(value="false") 未使用
							span.group-inline.float-right
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
								el-button(size="mediu" type="primary" plain @click='opneDetailDialog("info")') 新建
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
						table.table
							thead
								tr
									th.table-check
										input(type="checkbox" @click="$checkAll($event)")
									th 名称
									th 创建时间
									th 使用状态
									th(width=180) 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids")
									th
										img.cover-photo(:src="item.img_src")
										.th-name.bookName(:title="item.name") {{item.name}}
									th
										.th-name {{item.create_time}}
									th
										.th-name {{item.status_name}}
									th
										.btns
											//- Icon(type="icon-detail" title="详情" @click="opneDetailDialog('info',item.id)")
											span(type="icon-detail" title="详情" @click="opneDetailDialog('info',item.id)") 详情&nbsp;&nbsp;
											//- Icon(type="icon-preview" title="记录" @click="opneDetailDialog('record',item.id)")
											span(type="icon-preview" title="记录" @click="opneDetailDialog('record',item.id)") 记录&nbsp;&nbsp;
											//- Icon(type="icon-delete" title="删除" @click="delChoosen(item.id)")
											span(type="icon-delete" title="删除" @click="delChoosen(item.id)")
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
								append-to-body
								to="50px"
								width="1200px"
								)
								.content(slot="title")
									Detail(
										v-if="detailVisible"
										:detailVisible.sync="detailVisible"
										:type="detailDialoaType"
										:detailData="detailData"
										:por_type="parameter.type"
										@saveok="saveok"
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
