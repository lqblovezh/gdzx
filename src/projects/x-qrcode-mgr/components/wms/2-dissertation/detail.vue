<script>
import { getTask } from 'services/common'
// import * as services from 'services/x-qrcode/dissertation'
import Tree from './setting/tree'
import Using from './setting/using'
import ResAndUse from './setting/resAndUse'
import Advertising from './setting/advertising'
import { recursionTree } from '@/util/math.js'

export default {
  props: ['detailData', 'readOnly', 'detailDialog', 'resAndUseVis', 'services'],
  data() {
    return {
      // list: [], //一级
      cateList: [],
      secondList: [], //二级
      information: {}, //详情
      previewImgUrl: null, //图片预览
      file: null, // 图书文件 //主文件用file
      imgFile: null,
      type: 'info',
    }
  },
  components: {
    Tree,
    ResAndUse,
    Using,
    Advertising,
  },
  created() {
    console.log(this.services)
    if (this.detailData.id) {
      this.getDetail()
    }
  },
  methods: {
    handleClick(tab, event) {
      this.type = tab.name
    },
    getDetail() {
      this.services
        .detail({
          id: this.detailData.id,
        })
        .then(res => {
          this.information = res.data
          this.cateList = res.data.category_list
          this.$refs.tree.data = res.data.category_list
        })
    },
    preview(e) {
      var node = e.target
      var file = node.files[0]
      this.imgFile = file
      this.previewImgUrl = URL.createObjectURL(file)
    },
    async submitInfo() {
      // 保存扩展信息
      const fenmian = this.$refs.cover.files[0]
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let data = {
        ...this.information,
      }
      if (fenmian) {
        await getTask(fenmian).then(res => {
          this.information.img = res.data.path
        })
      }
      // this.list = this.$refs.tree.data
      await this.services
        .save(this.information)
        .then(res => {
          //上传信息
          if (!this.detailData.id) {
            this.information = res.data
          }
          this.$message.success('操作成功!')
          this.$emit('saveok', res.data)
          loading.close()
        })
        .catch(err => {
          this.$message({
            message: err.message || '错误!',
            type: 'error',
          })
        })
      loading.close()
    },
  },
}
</script>

<template lang="pug">
.div
	el-tabs(:value="type" @tab-click="handleClick")
		el-tab-pane(label="详情" name='info')
			VaForm(ref="detailForm")
				form.detailForm
					fieldset(:disabled="readOnly")
						.group
							.label *名称:
							input.form-control( v-va="{ type:'required'}" v-model="information.name" type="text" :disabled="readOnly")
						.group
							.label *简介:
							input.form-control( v-va="{ type:'required'}" v-model="information.abs" type="text" :disabled="readOnly")
						.group
							.label *封面:
							img.cover(:src="previewImgUrl||information.img_src")
							el-button(type="primary" plain @click="$refs.cover.click()" size="mini") 选择
							input.hide(type="file" accept="image/jpeg,image/jpg,image/png" ref="cover" @change="preview($event)")
			Tree(
				:dataList="cateList"
				ref="tree"
				:services="services"
				:detailData="detailData"
				:getDetail="getDetail"
			)
			.btns
				el-button(type="priamry" plain @click="$emit('close')") 取消
				el-button(type="primary" @click="submitInfo('detailForm')" ) 确定
		el-tab-pane(label="资源与应用" name="resource")
			ResAndUse(
				:detailData="detailData"
				:cateList="cateList"
				:services="services"
				:readOnly="readOnly"
				)
		el-tab-pane(label="广告位" name="ad")
			Advertising(
				:detailData="detailData"
				:services="services"
				:cateList="cateList"
			)
		el-tab-pane(label="使用中产品" name="using")
			Using(
			:detailData="detailData"
			:services="services"
			:readOnly="readOnly")
</template>

<style lang="stylus" scoped>
.fenmian
  margin-bottom 30px
.cover
  max-width 250px
  max-height 100px
.border
  padding-bottom 15px
  border-bottom 1px solid #ccc
.btns
  text-align right
.div
  margin-top 20px
  background #fff
  .top, .bottom
    height auto
    margin-top 20px
    .left, .right, .box
      display inline-block
      margin-right 40px
    .list
      border-bottom 1px solid #ddd
      padding-top 20px
      &:first-child
        padding 0
      &:last-child
        border none
    .img
      max-width 250px
      max-height 100px
      margin-right 40px
    .el-input
      width 200px
      margin 0
      margin-bottom 20px
      display block
    span
      font-size 18px
      color 333
      line-height 30px
</style>
