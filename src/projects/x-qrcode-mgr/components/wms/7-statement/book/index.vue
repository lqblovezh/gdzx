<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/statics'
import { mapMutations, mapState } from 'vuex'

export default {
  mixins: [main],
  data() {
    return {
      services,
      // detailVisible: false, // 详情框
      detailDialog: false, //详情框
      detailDialoaType: 'info', //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
    }
  },
  methods: {
		getList( pageNum=this.page&&this.page.num||1 , pageOffset=this.page&&this.page.offset||10, query ={} ){
			this.services.getBookList({pageNum , pageOffset , ...query} ).then( res => {
				this.setList(res.data)
				this.setPage(res.page)
			})
		},
    opneDetailDialog() {
      this.detailDialog = true
    },
    setList(data) {
      //设置列表
      this.setSerieslist(data)
    },
    setPage(data) {
      //设置页码
      this.setSerieslistPage(data)
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
									th 名称
									th 二维码数量
									th 创建时间
									th 扫码次数
									th 用户总数
									th() 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids")
									th
										img.cover-photo()
										.th-name.bookName(:title="item.name") {{item.name}}
									th {{item.qrcode_count}}
									th {{item.create_time}}
									th {{item.scan_count}}
									th {{item.user_count}}
									th
										.btns
											el-button(type="primary" plain size="mini" @click="$router.push({path:'/wms/userList',query:{index:'/wms/bookStatics',id:item.id}})") 报表数据
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
</template>

<style lang="stylus" scoped>
body .tableWrap
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
