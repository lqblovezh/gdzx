<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/statics'
import { mapMutations, mapState } from 'vuex'
import Detail from './Detail'

export default {
  // mixins: [main],
  components: { Detail },
  data() {
    return {
      services,
      detailVisible: false, //详情框
      detailDialoaType: 'info', //详情tabs类型
      detailDate: {}, //详情数据
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
        .userList({
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
        .userExport({
          type: this.$route.query.index,
          id: this.$route.query.id,
          ids,
        })
        .then(res => {
          window.location.href = res.data
        })
    },
    setList(data) {
      this.setQrcodelist(data)
    },
    setPage(data) {
      //设置页码
      this.setQrcodelistPage(data)
    },
    openDetail(item) {
      this.detailDate = item
      this.detailVisible = true
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
							el-button(type="primary") 扫码用户列表
							el-button(type="primary" plain @click="$router.push({path:'/wms/analys',query:{index:$route.query.index,id:$route.query.id}})") 数据分析
							el-button(type="primary" plain @click="$router.push({path:'/wms/scanRecord',query:{index:$route.query.index,id:$route.query.id}})") 扫码记录
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
									th 累计时长
									th(width=80) 操作
							tbody(v-if="list")
								tr(v-for="item in list")
									th
										input(type="checkbox" :value="item.user_id" name="ids" ref="ids")
									th {{item.nick_name}}
									th {{item.sex}}
									th {{item.pro}}
									th {{item.phone}}
									th {{item.total}}
									th
										//- Icon(type="icon-detail" title="用户统计" @click="$router.push({path:'/wms/userStatic',query:{index:$route.query.index,user_id:item.user_id}})")
										Icon(type="icon-detail" title="用户统计" @click="openDetail(item)")
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
					Detail(:detailVisible.sync="detailVisible" v-if="detailVisible" :detailDate="detailDate")
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
