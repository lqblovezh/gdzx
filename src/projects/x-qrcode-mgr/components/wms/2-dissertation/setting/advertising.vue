<script>
import { main } from '@/util/mixins'
import qs from 'qs'
import formSerialize from 'form-serialize'
import { mapMutations, mapState } from 'vuex'
import { getTask } from 'services/common'
import { clearTimeout, setTimeout } from 'timers'
export default {
  mixins: [main],
  props: ['detailData', 'services', 'cateList'],
  created() {},
  data() {
    return {
      dialogVisible: false,
      previewImgUrl: null, //预览图片
      currentItem: {
        status: false,
      },
    }
  },
  mounted() {
    setTimeout(() => {
      console.log('----', this.cateList)
    }, 1000)
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10
    ) {
      //广告位列表
      if (!this.detailData.id) {
        this.setList([])
        this.setPage({})
        return
      }
      this.services
        .getAdList({
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
      //删除广告位
      this.$confirm('你确定删除吗').then(_ => {
        this.services
          .delAd({
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
    detail(
      item = {
        status: false,
      }
    ) {
      if (!this.detailData.id) {
        return this.$message.warning('请先保存专题详情!')
      }
      console.log(this.currentItem)
      this.currentItem = item
      this.dialogVisible = true
    },
    async save() {
      const ad = this.$refs.updateImg.files[0]
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      if (ad) {
        let data = await this.$globalUpdateFile(ad)
        this.currentItem.img_src = data.url
        this.currentItem.img = data.path
      }
      await this.services
        .saveAdver({ special_id: this.detailData.id, ...this.currentItem })
        .then(
          res => {
            this.getList()
            this.$message.success('操作成功')
          },
          err => {
            loading.close()
            this.$message.error(err.message)
          }
        )
    },
    update(e) {
      var node = e.target
      var file = node.files[0]
      this.imgFile = file
      this.previewImgUrl = URL.createObjectURL(file)
      console.log(this.previewImgUrl)
    },
    setList(data) {
      //设置列表
      this.setAdlist(data)
    },
    setPage(data) {
      //设置页码
      this.setAdlistPage(data)
    },
    uncheckedAll(e, item) {
      let node = Array.from(
        document.querySelectorAll("input[name='cateList_ids']")
      )
      node.forEach(item => (item.checked = false))
      e.target.checked = true
      this.currentItem.category_id = item.id
    },
    isChecked(id) {
      //选中状态
      if (id == this.currentItem.category_id) {
        return true
      }
      return false
    },
    ...mapMutations(['setAdlist', 'setAdlistPage']),
  },
  computed: {
    ...mapState({
      list: state => state.ad.list,
      page: state => state.ad.page,
    }),
  },
}
</script>

<template lang="pug">
.setting
	.content
		.info
			span 5个广告位对应不同的位置,关闭后不显示
		.list
			.item(v-for="(item,index) in list")
				.leftSide
					span {{item.name}}
					img.thumb(:src="item.img_src")
				.rightSide
					el-form(:inline="true")
						.operation
							.form-item
								el-input.input(placeholder="请输入新的URL地址" v-model="item.preview")
								el-button(type="danger" @click="del(item.id)" size="mini" plain) 删除
								el-button(type="primary" @click="detail(item)" size="mini" plain) 修改
			el-button(type="primary" @click="detail()") 添加广告
		el-dialog.dialog(title="请填写广告相关消息" width="500px" :visible.sync="dialogVisible" append-to-body)
			el-form(ref="form")
				el-form-item(label="是否启用弹出式广告位:")
					el-checkbox(v-model="currentItem.status") 启用弹出式广告位
				el-form-item(label="链接地址:")
					el-input(placeholder="请输入全路径" v-model="currentItem.preview")
				el-form-item(label="选择分类：" v-if="!currentItem.status")
					div(style="display: inline-block;width:450px;")
						el-tree.classfiyList#classfiyList(
							:data="cateList"
							node-key ="id"
							ref="cateList"
							default-expand-all
							:expand-on-click-node="false"
						)
							.list(class="custom-tree-node" slot-scope="{node,data}")
								span {{data.name}}
								span.checkbox
									input(type="checkbox"  @click="uncheckedAll($event,data)" :value="data.id" ref="cateList_ids" :checked="isChecked(data.id)" name="cateList_ids")
				el-form-item
					img.banner(:src="previewImgUrl||currentItem.img_src" ref="img")
					input.updateImg(type="file" @change="update($event,'img')" ref="updateImg" accept="image/jpeg,image/png,image/jpg")
					el-button(type="primary" size="small" @click="$refs.updateImg.click()" plain) 上传广告图
			span(slot="footer" class="dialog-footer")
				el-button(@click="dialogVisible= false") 取消
				el-button(type="primary" @click="save('updateImg')") 确定
</template>

<style lang="stylus" scoped>
.classfiyList
  >>> .el-tree-node
    line-height 40px
  .checkbox
    float right
  .list
    width 100%
.dialog
  >>> .el-checkbox__label
    line-height inherit
.setting
  padding 20px
    color #444
    min-width 1060px
    .head
      background #fff
      padding 15px
      border-radius 5px
      box-shadow 3px 3px 8px #dfdfdf
      margin-bottom 20px
      .flat
        padding 20px 0 10px 0
.content
  background #fff
  padding 15px
  border-radius 5px
  .info
    line-height 28px
    display table
    span
      line-height 32px
      color #999999
      font-size 13px
    img
      margin-right 10px
      display table-cell
      vertical-align middle
  .list
    margin-bottom 20px
    .item
      display flex
      padding 10px
      justify-content flex-start
      align-items center
    .leftSide
      padding-right 20px
      width 380px
      span
        line-height 120px
        margin-right 10px
        font-size 16px
        font-weight bold
    .thumb
      width 284px
      height 120px
      object-fit contain
    .operation
      line-height 30px
      >span
        padding-right 10px
      .icon
        cursor pointer
        padding 8px
      .up
        transform rotate(90deg)
      .down
        transform rotate(-90deg)
      .category
        margin-top 15px
        span
          margin 0 15px 0 10px
          line-height 30px
      .form-item
        display inline-block
        .el-checkbox
          margin-right 10px
          line-height 30px
          .el-checkbox-label
            line-height 20px
        .input
          width 300px
          margin 0 20px
.add
  display flex
  span
    display inline-block
    padding 5px 20px
.updateImg
  display none
.banner
  max-width 300px
  margin-right 20px
</style>
