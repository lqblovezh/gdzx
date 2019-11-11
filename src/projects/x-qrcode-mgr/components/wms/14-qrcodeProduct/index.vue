<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/qrcodePro'
import Detail from './detail'

import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Detail,
  },
  mixins: [main],
  data() {
    return {
      services,
      // detailVisible: false, // 详情框
      detailDialog: false, //详情框
      detailDialoaType: 'info', //详情tabs类型
      detailData: {}, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
    }
  },
  methods: {
    opneDetailDialog(type, item) {
      this.detailDialog = true
      this.detailData = item
    },
    addQrcodePro() {
      //创建二维码产品
      this.detailDialog = true
      this.detailData = {}
    },
    modifyStatus(item, status) {
      //修改使用状态
      this.services
        .modifyStatus({
          status,
          id: item.id,
        })
        .then(res => {
          item.status = res.data.status
          item.status_name = res.data.status_name
        })
    },
    getusedList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = {},
      status = 'true'
    ) {
      this.services
        .getList({
          pageNum,
          pageOffset,
          ...query,
          status,
        })
        .then(res => {
          this.setList(res.data)
          this.setPage(res.page)
        })
    }, //已使用
    getnoUseList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = {},
      status = 'false'
    ) {
      this.services
        .getList({
          pageNum,
          pageOffset,
          ...query,
          status,
        })
        .then(res => {
          this.setList(res.data)
          this.setPage(res.page)
        })
    }, //未使用
    setList(data) {
      //设置列表
      this.setSerieslist(data)
    },
    setPage(data) {
      //设置页码
      this.setSerieslistPage(data)
    },
    saveok(data) {
      if (!this.detailData.id) {
        this.detailData = data
      }
      this.getList()
      this.detailDialog = false
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
.box
	el-dialog(
		:center="false"
		:visible.sync="detailDialog"
		append-to-body
		to="50px"
		width="1200px"
		)
		.content(slot="title")
			Detail(
				v-if="detailDialog"
				:detailDialog.sync="detailDialog"
				:detailData="detailData"
				:type="detailDialoaType"
				:readOnly="false"
				@saveok="saveok"
			)
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
								el-button(size="mediu" type="primary"   icon="el-icon-plus"  @click="addQrcodePro" plain ) 新建
								el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
					.btn
						el-button-group()
							el-button(type="primary" plain @click="getList") 全部
							el-button(type="primary" plain @click="getusedList") 已使用
							el-button(type="primary" plain @click="getnoUseList") 暂停中
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
									th 产品名称
									th 使用二维码名称
									th(width=150) 资源消息个数
									th(width=150) 创建时间
									th(width=150) 状态
									th(width=250) 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th 
										input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
									th 
										img.cover-photo(:src="item.img_src")
										.th-name.bookName(:title="item.name") {{item.name}}
									th
										.th-name(:title="item.qrcode_name") {{item.qrcode_name}} 
									th
										.th-name {{item.msg_num}}
									th
										.th-name {{item.create_time}}
									th
										.th-name {{item.status_name}}
									th
										.btns
											//- Icon(type="icon-detail" title="详情" @click="opneDetailDialog('info',item)")
											span(@click="opneDetailDialog('info',item)") 详情&nbsp;&nbsp;
											//- Icon(type="icon-preview" title="使用" @click="modifyStatus(item,'true')" v-if="item.status!='true'")
											span(type="icon-preview" title="使用" @click="modifyStatus(item,'true')" v-if="item.status!='true'") 使用&nbsp;&nbsp;
											//- Icon(type="icon-Shield" title="停用" @click="modifyStatus(item,'false')" v-if="item.status!='false'")
											span(type="icon-Shield" title="停用" @click="modifyStatus(item,'false')" v-if="item.status!='false'") 停用&nbsp;&nbsp;
											//- Icon(type="icon-delete" title="删除" @click="delChoosen(item.id)" v-if="item.status!='true'")
											span(type="icon-delete" title="删除" @click="delChoosen(item.id)" v-if="item.status!='true'") 删除
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
.btn
  background #fff
  width 100%
  padding 15px
  margin-bottom 10px
.box
  background #ececec
  min-height 650px
  min-width 1660px
  .top
    margin-bottom 20px
    .group-inline
      .form-control
        width 100%
        height 40px
    .list
      border 15px solid #fff
      background #fff
      width 100%
      line-height 30px
      margin-bottom 50px
      thead
        background #ececec
        tr
          background #ececec
          th
            text-align center
            padding 18px 10px
      tbody
        tr
          &:nth-child(2n)
            background #eee
          td
            padding 10px
            text-align center
            vertical-align middle
    .page
      text-align center
      padding-bottom 50px
  .imgList
    margin-bottom 20px
    height 200px
    .item
      float left
      width 150px
      text-align center
      margin-right 5px
      .img
        height 190px
        margin-bottom 10px
        background no-repeat
        background-size 100%
</style>
