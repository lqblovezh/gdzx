<script>
// import * as services from 'services/x-library/columnSetting'
import { recursionTree } from '@/util/math.js'

export default {
  props: ['dataList', 'type', 'services', 'detailData', 'getDetail'],
  data() {
    return {
      data: this.dataList,
      currMulu: [],
      detailDialog: false,
    }
  },
  components: {},
  created() {},
  methods: {
    append(data) {
      const newChild = {
        children: [],
        name: '',
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      if (data.id) {
        this.services.delCate({ id: data.id }).then(
          res => {
            this.getDetail()
          },
          err => {
            this.$message.error(err.message)
          }
        )
      } else {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }
    },
    getList() {
      if (!this.detailData.id) {
        return
      }
      this.services.detail({ id: this.detailData.id }).then(res => {
        this.data = recursionTree(res.data.category_list)
      })
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.name === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.name.indexOf('三级 3-2-2') === -1
    },
    add() {
      if (!this.detailData.id) {
        return this.$message.warning('请先保存专题详情!')
      }
      this.data.push({
        children: [],
        pid: '0',
        name: '',
      })
    },
    // 上传
    uploadTreeFile(data, node) {
      this.currTreeData = data
      this.currNode = node
      this.$refs.treeImgInp.click()
    },
    // 上传
    async treeImgInpChange(e) {
      let file = this.$isFileBig(e, 1)
      if (!file) return
      let data = await this.$globalUpdateFile(file)
      console.log(this.currTreeData)
      this.$set(this.currTreeData, 'img_src', data.url)
      this.$set(this.currTreeData, 'img', data.path)
      // this.currTreeData.img_src = data.url
      // this.currTreeData.img = data.path
    },
    save(data, node) {
      let parent = node.parent ? node.parent.data : {}
      this.services
        .addCate({
          ...data,
          pid: parent.id,
          special_id: this.detailData.id,
        })
        .then(
          res => {
            this.$message.success('保存成功')
            this.getDetail()
            // console.log(this.$parent.getDetail)
          },
          err => {
            this.$message.error(err.message)
          }
        )
    },
    selectCurrent(node, data) {
      // this.currMulu = data.chapters
    },
    muluSort(item, sort) {
      this.services.sort({ id: item.id, sort }).then(res => {
        this.getList()
      })
    },
  },
}
</script>

<template lang="pug">
.tree
	el-dialog(
		width="1000px"
		title="详情"
		:visible.sync="detailDialog"
		v-if="detailDialog"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		append-to-body
	)
		VaForm( ref="detailForm")
			form.detailForm( ref="detailForm")
				.group
					textarea.textarea( v-model="currentDetail.abs"   type="text" maxlength="300")
		.btns(slot="footer")
			el-button( type="info" @click="detailDialog=false") 取消
			el-button(@click="detailDialog=false" type="primary") 确定
	.btn
		el-button(class="el-icon-plus" type="primary" plain @click="add()") 添加顶级
	table.table.table1(ref="table")
		thead
			tr
				th(style="padding-left:80px")  名称
				th(width=200)  一级分类图
				th.options  操作
	el-tree(
		:data="data"
		ref="tree"
		node-key="id"
		default-expand-all
		draggable
		:allow-drop="allowDrop"
		:allow-drag="allowDrag"
	)
		span(class="custom-tree-node" slot-scope="{ node, data }")
			input.form-control(v-model="data.name")
			span.options(style="float:right")
				//- .icon.up.el-icon-back( @click="muluSort(data,'up')" v-if="data.id")
				//- .icon.down.el-icon-back( @click="muluSort(data, 'down')" v-if="data.id")
				.icon.el-icon-upload2(@click.stop="save(data,node)" title="保存")
				.icon.el-icon-plus(@click.stop="append(data)" v-if="data.id" title="添加")
				.icon.icon-delete(@click.stop="remove(node, data)" title="删除")
			div.time(v-if='data.pid==="0"')
				el-button(size="small" type="primary" @click.stop="uploadTreeFile(data, node)") 上传
				img.tree-img( :src="data.img_src" )
	input.hide(type="file" @change="treeImgInpChange" ref="treeImgInp")
</template>


<style lang="stylus" scoped>
>>>.el-tree-node > .el-tree-node__children > div:first-child
  background-color #ddd
.tree-img
  height 40px
  margin-left 50px
  .icon
    color #44c3aa
.icon.up
  transform rotate(90deg)
  display inline-block
.icon.down
  transform rotate(-90deg)
  display inline-block
.custom-tree-node:nth-child(2n+1){
  background red
}
.textarea
  width 100%
  resize none
.icon
  color #44c3aa
.tree
  position relative
  min-width 1000px
  max-width 1200px
  .options
    width 150px
    text-align center
  .time, .keyword, .code
    float right
    width 230px
    line-height 40px
  padding 20px
  .btn
    margin 20px 0
  >>> .el-tree-node__content
    height 40px
    line-height 40px
    .custom-tree-node
      width 100%
      .form-control
        width 150px
</style>
