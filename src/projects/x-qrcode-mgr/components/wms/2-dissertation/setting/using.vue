<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'

import { mapMutations, mapState } from 'vuex'

export default {
  mixins: [main],
  props: ['detailData', 'services', 'readOnly'],
  data() {
    return {
      type: 'info',
    }
  },
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
        .getUseList({ pageNum, pageOffset, special_id: this.detailData.id })
        .then(res => {
          this.setList(res.data)
          this.setPage(res.page)
        })
    },
    setList(data) {
      //设置列表
      this.setUselist(data)
    },
    setPage(data) {
      //设置页码
      this.setUselistPage(data)
    },
    ...mapMutations(['setUselist', 'setUselistPage']),
  },
  computed: {
    ...mapState({
      list: state => state.using.list,
      page: state => state.using.page,
    }),
  },
}
</script>

<template lang="pug">
.box
	.maindata
		table.table
			thead
				tr
					th 名称
					th(width=150) 产品简介
					th 创建时间
			tbody(v-if="list")
				tr(v-for="item in list")
					th
						img.cover-photo(:src="item.img_src")
						.th-name.bookName(:title="item.name") {{item.name}}
					th
						.th-name {{item.abs}}
					th
						.th-name {{item.create_time}}
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
.tableWrap
  width 97.5%
.btn
  background #fff
  width 100%
  padding 15px
  margin-bottom 10px
</style>
