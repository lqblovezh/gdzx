<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import { mapMutations, mapState } from 'vuex'
import Resource from '@/components/common/Resource'
import Grounding from '../grounding'
// import Use from '@/components/common/Use'

export default {
  components: {
    Resource,
    Grounding,
    // Use,
  },
  props: ['detailData', 'services', 'cateList'],
  mixins: [main],
  data() {
    return {
      useDialog: false, // 应用框
      resourceDialog: false, //资源弹框
      cateVis: false, //分类弹框
      columnList: [],
      id: '',
      currentItem: {},
      resourcesType: '1',
    }
  },
  created() {},
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10
    ) {
      if (!this.detailData.id) {
        this.setList([])
        this.setPage({})
        return
      }
      this.services
        .getContList({
          pageNum,
          pageOffset,
          special_id: this.detailData.id,
        })
        .then(res => {
          this.setList(res.data)
          this.setPage(res.page)
        })
    },
    del(id, item) {
      this.$confirm('你确定删除吗').then(_ => {
        this.services
          .delContent({
            id,
          })
          .then(res => {
            this.getList()
          })
          .catch(({ payload }) => {
            for (let i in payload.messages) {
              this.$message.error(payload.messages[i])
              break
            }
          })
      })
    },
    addSelect(data, array) {
      //添加选中
      this.services
        .addContent({
          special_id: this.detailData.id,
          type: this.resourcesType == '1' ? 'resource' : 'app',
          resource_id: array.map(item => item.id),
        })
        .then(res => {
          this.getList()
          this.resourceDialog = false
        })
    },
    mofdifyCate(item) {
      this.id = item.id
      this.currentItem = item
      if (!item) {
        return
      }
      this.services
        .getCateList({
          special_id: this.detailData.id,
        })
        .then(res => {
          this.columnList = res.data
          this.cateVis = true
        })
    },
    submitCate() {
      this.services
        .mofdifyCate({
          id: this.id,
          category_id: this.currentItem.category_id,
        })
        .then(res => {
          this.$message.success('成功')
          this.cateVis = false
          this.getList()
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
    addRelation(type) {
      if (!this.detailData.id) {
        return this.$message.warning('请先保存专题详情!')
      }
      this.resourcesType = type
      this.resourceDialog = true
    },
    isChecked(id) {
      //选中状态
      if (id == this.currentItem.category_id) {
        return true
      }
      return false
		},
		uncheckedAll(e, item) {
      let node = Array.from(
        document.querySelectorAll("input[name='cateList_ids']")
      )
      node.forEach(item => (item.checked = false))
      e.target.checked = true
      this.currentItem.category_id = item.id
    },
    ...mapMutations(['setQrcodelist', 'setQrcodelistPage']),
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
	.maindata
		.tableWrap
			.tableTop
				.title.vel-line
					el-button(size="mini" type="primary" @click="addRelation('1')" plain) 新增资源
					el-button(size="mini" type="primary" @click="addRelation('7')" plain) 新增应用
			table.table
				thead
					tr
						th.table-check
							input(type="checkbox" @click="$checkAll($event)")
						th 名称
						th 价格
						th 创建时间
						th(width=100) 分类
						th(width=100) 操作
				tbody(v-if="list")
					tr(v-for="item in list")
						th
							input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
						th
							img.cover-photo(:src="item.img_src")
							.th-name.bookName(:title="item.name") {{item.name}}
						th
							.th-name {{item.price}}
						th
							.th-name {{item.create_time}}
						th
							.th-name {{item.category_name}}
						th
							.btns
								Icon(type='icon-delete' title="删除" @click="del(item.id,item)")
								Icon(type='el-icon-setting' title="修改所属分类" @click="mofdifyCate(item)")
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
		el-dialog(
			:center="false"
			:visible.sync="cateVis"
			v-if="cateVis"
			:close-on-click-modal="false"
			width="410px"
			title='设置'
			append-to-body
		)
			el-tree.classfiyList#classfiyList(
				:data="cateList"
				node-key ="id"
				ref="cateList"
				default-expand-all
				:expand-on-click-node="false"
			)
				.list(class="custom-tree-node" slot-scope="{node,data}")
					span {{data.name}}
					span.checkbox(v-if="data.pid!='0'")
						input(type="checkbox"  @click="uncheckedAll($event,data)" :value="data.id" ref="cateList_ids" :checked="isChecked(data.id)" name="cateList_ids")
			.content(slot="footer")
				el-button(type="primary" plain @click="submitCate" size="small") 确定
		//- Grounding(
		//- 	v-if="cateVis"
		//- 	:cateVis.sync="cateVis"
		//- 	:columnList="columnList"
		//- 	:detailData="detailData"
		//- 	@back="cateVis=false"
		//- 	@submit="submitCate"
		//- )
		//- 选择已上架资源
		Resource(
			:detailData="detailData"
			:resourceDialog.sync="resourceDialog"
			v-if="resourceDialog"
			:curSoucesList="[]"
			@select="addSelect"
			:isShowType="true"
			:type="resourcesType"
		)
</template>


<style lang="stylus" scoped>
.classfiyList
  >>> .el-tree-node
    line-height 40px
  .checkbox
    float right
  .list
    width 100%
.tableWrap
  width 97.5%
</style>
