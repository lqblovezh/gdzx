<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/statics'
import { mapMutations, mapState } from 'vuex'

export default {
  // mixins: [main],
  data() {
    return {
      services,
      detailDialog: false, //详情框
      detailDialoaType: 'info', //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
    }
  },
  created() {
    this.resetPage()
    this.getList()
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = {}
    ) {
      this.services
        .scanList({
          type: this.$route.query.index,
          id: this.$route.query.id,
          pageNum,
          pageOffset,
          ...this.parameter,
          ...query,
        })
        .then(res => {
          this.setList(res.data)
          this.setPage(res.page)
        })
    },
    handleSizeChange(val) {
      //处理size变化
      this.page.num = 1
      this.getList(1, val, this.query)
    },
    handleCurrentChange(val) {
      //处理页码变化
      if (val === this.page.nun) return
      this.getList(val, this.page.offset, this.query)
    },
    scanExport() {
      let ids = []
      ids = this.$getChecked({ isShowMessage: false })
      services
        .scanExport({
          type: this.$route.query.index,
          ids,
        })
        .then(res => {
          window.location.href = res.data
        })
    },
    setList(data) {
      //设置列表
      this.setQrcodelist(data)
    },
    setPage(data) {
      //设置页码
      this.setQrcodelistPage(data)
    },
    ...mapMutations(['setQrcodelist', 'setQrcodelistPage', 'resetPage']),
  },
  computed: {
    ...mapState({
      list: state => state.qrcode.list,
      page: state => state.qrcode.page,
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
					.btnGroup
						el-button-group
							el-button(type="primary" plain @click="$router.push({path:'/wms/userList',query:{index:$route.query.index,id:$route.query.id}})") 扫码用户列表
							el-button(type="primary" plain @click="$router.push({path:'/wms/analys',query:{index:$route.query.index,id:$route.query.id}})") 数据分析
							el-button(type="primary" ) 扫码记录
					.tableWrap
						.tableTop
							.title.vel-line
								span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
								.btns
									el-button(size="mini" type="primary" plain @click="scanExport") 导出
						table.table
							thead
								tr
									th(width=70)
										input(type="checkbox" @click="$checkAll($event)")
										span 选择
									th 昵称
									th 性别
									th 地域
									th 电话
									th 扫码时间
									th 停留时间
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.id" name="ids" ref="ids")
									th
										img.cover-photo()
										.th-name.bookName(:title="item.name") {{item.nick_name}}
									th {{item.sex}}
									th {{item.pro}}
									th {{item.phone}}
									th {{item.create_time}}
									th {{item.duration}}
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
.btnGroup
  background #fff
  padding 10px
  margin-bottom 10px
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
