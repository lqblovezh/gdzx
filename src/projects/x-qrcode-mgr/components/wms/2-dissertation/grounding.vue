<script>
import * as services from 'services/x-qrcode/dissertation'

export default {
  props: {
    columnList: Array,
    detailData: Object,
  },
  created() {
    this.getTypes()
    // if (this.columnList[0]) {
    //   this.getTypes(this.columnList[0].id)
    // }
  },
  data() {
    return {
      cateVis: true,
      types: {
        list: [],
        value: this.columnList[0] ? this.columnList[0] : null,
      },
      options: {
        list: [],
        value: this.columnList[1] ? this.columnList[1] : null,
      },
    }
  },
  methods: {
    submit() {
      if (!this.options.value) {
        return this.$message.error('请选择二级分类')
      } else if (!this.types.value) {
        return this.$message.error('请选择一级分类')
      }
      this.$emit('submit', {
        class_id: this.options.value ? this.options.value : this.types.value,
      })
    },
    getTypes(pid = 'root', clear) {
      services
        .getCateList({ pid, special_id: this.detailData.id })
        .then(res => {
          if (pid != 'root') {
            for (const i in res.data) this.options.list = res.data[i].children
            if (clear) {
              this.options.value = null
            }
          } else {
            this.types.list = res.data
          }
        })
    },
    back() {
      this.$emit('back')
    },
  },
  watch: {
    types() {
      if (!this.cateVis) {
        this.$emit('back')
      }
    },
    'types.value'(newDate, oldDate) {
      this.getTypes(newDate, true)
    },
  },
}
</script>


<template lang="pug">
.div
	el-dialog(
		:center="false"
		:visible.sync="cateVis"
		v-if="cateVis"
		:close-on-click-modal="false"
		:before-close="back"
		width="410px"
		title='设置'
		append-to-body
	)
		VaForm()
		.content
			span 一级分类
			el-select(v-model="types.value")
				el-option(v-for="item in types.list"
				:label="item.name"
				:key="item.id"
				:value="item.id")
		.content()
			span 二级分类：
			el-select(v-model="options.value")
				el-option(v-for="item in options.list"
				:label="item.name"
				:key="item.id"
				:value="item.id")
		.content
			el-button(type="primary" plain @click="submit") 确定
</template>


<style lang="stylus" scoped>
.classfiyList
  margin-top 20px
  >>> .el-tree-node
    line-height 40px
  .checkbox
    float right
  .list
    width 100%
.content
  text-align center
  padding 10px
  span
    line-height 40px
    margin-right 15px
    font-size 16px
    color #333
</style>
