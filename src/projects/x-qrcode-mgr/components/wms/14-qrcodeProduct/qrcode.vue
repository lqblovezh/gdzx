<script>
import { main } from '@/util/mixins'
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/qrcode'
// import Detail from 'projects/common/readOnlyDetail'
import Detail from './detail'

import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Detail,
  },
  props: ['qrcodeDetailVis'],
  mixins: [main],
  data() {
    return {
      services,
      detailDialoaType: 'info', //详情tabs类型
      detailData: {}, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      readOnly: false,
      parameter: {
        code_type: 'agility',
      },
    }
  },
  created() {
    log(123456, this.qrcodeDetailVis)
  },
  methods: {
    close() {
      this.$emit('update:qrcodeDetailVis', false)
      this.isShow = false
    },
    setList(data) {
      //设置列表
      this.setQrcodelist(data)
    },
    setPage(data) {
      //设置页码
      this.setQrcodelistPage(data)
    },
    ...mapMutations(['setQrcodelist', 'setQrcodelistPage']),
    chooseQrcode(item) {
      this.$emit('chooseQrcode', item)
    },
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
div 
	el-dialog(
		:visible.sync="qrcodeDetailVis"
		top="50px"
		width="800px"
		append-to-body
		title="二维码列表"
    :before-close="close"
	)
		.content
			table.table
				thead
					tr
						th 名称
						th 描述
						th(width=150) 使用状态
						th 创建时间
						th(width=80) 操作
				tbody(v-if="list")
					tr(v-for="item in list")
						th
							img.cover-photo(:src="item.img_src")
							.th-name.bookName(:title="item.name") {{item.name}}
						th
							.th-name {{item.abs}}
						th
							.th-name {{item.product_status_name}}
						th
							.th-name {{item.create_time}}
						th
							.btns
								el-button(type="primary" size="mini" @click="chooseQrcode(item)" :disabled="item.product_status=='true'") 选择
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

