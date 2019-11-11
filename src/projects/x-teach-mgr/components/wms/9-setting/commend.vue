<script>
import * as services from 'services/x-teach/columnSetting'
import { getTask } from 'services/common'
import Resource from '@/components/common/Resource'

export default {
  components: {
    Resource,
  },
  data() {
    return {
      list: [],
      underList: [
        {
          name: '轨道名师',
          value: 'teacher',
        },
        {
          name: '经典自学课程',
          value: 'class_course',
        },
        {
          name: '商城',
          value: 'shop',
        },
        {
          name: '精品课程',
          value: 'course',
        },
        {
          name: '纸质书',
          value: 'pod_book',
          type: 'shop',
        },
        {
          name: '资源',
          value: 'resources',
          type: 'shop',
        },
      ],
      value: '',
      page: null,
      name: '添加',
      dialogVisible: false,
      detailDialog: false,
      resourceDialog: false,
      settingDialog: false,
      curSoucesList: [],
      clumnsID: '',
      clumnsData: {},
      addlist: {},
      infoData: [],
      previewImgUrl: null,
      settingItem: {},
      parameter: {
        state: true,
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      services.getList({ pid: 'root' }).then(res => {
        this.list = res.data
      })
    },
    getInfoList() {
      services.getInfoList().then(res => {
        this.infoList = res
      })
    },
    up(data) {
      //向上移动一位
      services
        .sort({
          id: data.id,
          status: 'up',
          pid: data.pid,
        })
        .then(res => {
          this.getList()
          this.$message.success('上移成功')
        })
    },
    infoUp(item) {
      //向上移动一位
      services
        .infoSort({
          id: item.id,
          cate_id: item.category_id,
          status: 'up',
        })
        .then(res => {
          this.getInfoList()
          this.$message.success('上移成功')
        })
    },
    infoDown(item) {
      //元素向下移动一位
      services
        .infoSort({
          id: item.id,
          cate_id: item.category_id,
          status: 'down',
        })
        .then(res => {
          this.getInfoList()
          this.$message.success('下移成功')
        })
    },
    down(data) {
      //元素向下移动一位
      services
        .sort({
          id: data.id,
          status: 'down',
          pid: data.pid,
        })
        .then(res => {
          this.getList()
          this.$message.success('下移成功')
        })
    },
    async save() {
      let type = this.underList.find(item => item.value == this.addlist.type)
      let ptype = this.list.find(item => item.id === this.addlist.pid)
      if (type && type.type) {
        if (!ptype || (ptype && ptype.type != type.type)) {
          return this.$message.warning('纸质书和资源只能添加到商城')
        }
      }
      // return console.log(this.addlist)
      if (this.imgFile) {
        await getTask(this.imgFile).then(res => {
          this.addlist.img = res.data.path
        })
      }
      log({
        ...this.addlist,
      })
      services
        .save({
          ...this.addlist,
        })
        .then(res => {
          this.getList()
        })
    },
    reset() {
      this.addlist = {}
      this.previewImgUrl = null
      this.name = '添加'
      this.dialogVisible = true
    },
    update(data) {
      //向后台发送修改请求
      this.previewImgUrl = null
      this.addlist = JSON.parse(JSON.stringify(data))
      this.name = '修改'
      this.dialogVisible = true
      // this.save();
    },
    del(data) {
      this.$confirm('你真的要删除吗？').then(() => {
        services
          .del({
            id: data.id,
          })
          .then(res => {
            this.getList()
            this.$message.success('删除成功')
          })
      })
    },
    add() {
      this.dialogVisible = false
      this.save()
    },
    infoDel(id) {
      this.$confirm('是否确认删除?')
        .then(() => {
          services
            .infoDel({
              id,
            })
            .then(res => {
              this.getInfoList()
              this.$message.success('删除成功')
            })
        })
        .catch(() => {})
    },
    opneDetailDialog(data) {
      this.detailDialog = true
      this.clumnsData = data
      this.clumnsID = data.id
      this.page = {
        pageOffset: 10,
        pageStart: 0,
        total: 1,
      }
      this.getInfoList()
    },
    getInfoList() {
      services
        .getInfoList({
          id: this.clumnsID,
          type: this.clumnsData.type,
          ...this.page,
        })
        .then(res => {
          this.infoData = res.data
          this.page.total = res.page.total
        })
    },
    addInfo_send(arr) {
      services
        .infoAdd({
          type: this.clumnsData.type,
          cate_id: this.clumnsID,
          id: arr.map(item => item.id),
        })
        .then(res => {
          this.getInfoList()
          this.resourceDialog = false
          this.$message.success('添加成功')
        })
    },
    selectAll(e) {
      this.$refs.select.forEach(item => {
        item.checked = e.target.checked
      })
    },
    delAll() {
      let arr = []
      this.$refs.select.forEach(e => {
        if (e.checked) {
          arr.push(e.value)
        }
      })
      this.infoDel(arr)
    },
    selectChange(val) {
      log(this.list, val)
    },
    handleSizeChange(val) {
      this.page.pageOffset = val
      this.getInfoList()
    },
    handleCurrentChange(val) {
      this.page.pageStart = (val - 1) * this.page.pageOffset
      this.getInfoList()
    },
    changePreviewImg(e) {
      //预览图
      var node = e.target
      var file = node.files[0]
      this.imgFile = file
      this.previewImgUrl = URL.createObjectURL(file)
    },
    getIndex(data) {
      if (data.children) {
        return this.list.findIndex(d => d.id === data.id)
      }
      let children = this.list.find(d => d.id === data.pid).children
      return children.findIndex(d => d.id === data.id)
    },
    getListLength(data) {
      if (data.children) {
        return this.list.length - 1
      }
      let list = this.list.find(d => d.id === data.pid).children
      return list.length - 1
    },
    openResource() {
      this.curSoucesList = JSON.parse(JSON.stringify(this.infoData))
      this.resourceDialog = true
    },
    setTeacherTitle(item) {
      this.settingDialog = true
      this.settingItem = JSON.parse(JSON.stringify(item))
      this.settingItem.is_hide = this.settingItem.is_hide == 1
    },
    settingSave() {
      const { name, is_hide, id } = this.settingItem
      services
        .recommend({
          id,
          name,
          is_hide: is_hide ? '1' : '2',
        })
        .then(res => {
          this.getInfoList()
          this.settingDialog = false
          this.$message.success('设置成功')
        })
    },
  },
}
</script>


<template lang="pug">
div.setting
  .head
    el-button-group
      el-button(@click="$router.push({path:'/wms/setting/banner'})") banner设置
      el-button(@click="$router.push({path:'/wms/setting/ad'})") 广告位
      el-button(@click="$router.push({path:'/wms/setting/advert'})") 侧边广告
      el-button(type="primary" @click="$router.push({path:'/wms/setting/commend'})") 栏目设置
      //- el-button(@click="$router.push({path:'/wms/setting/teacher'})") 底部教师展示
      el-button(@click="$router.push({path:'/wms/setting/footer'})") 底部设置
  .content
    el-tree.columns-tree(
      :data="list"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    )
      span(class="custom-tree-node" slot-scope="{ node, data }")
        span.name(:title="data.name") {{ data.name }}
        span.modify
          a(href='javascript:' @click='update(data)') 修改
        span
          el-select(v-model='data.type' value-key='name' @change="selectChange" disabled)
            el-option(v-for="data in underList" :key='data.value' :label="data.name" :value='data.value')
        //- span
        //-   a(href="javascript:void(0)" @click='preview(data,getIndex(data))') 模板预览
        span 排序 : ( {{getIndex(data)+1}} )
        span.options(style="float:right")
          //- el-button(type="text" @click='up(data)' class="el-icon-sort-up" :disabled="getIndex(data)==0")
          //- el-button(type="text" @click='down(data)' class="el-icon-sort-down" :disabled="getIndex(data)==getListLength(data)")
          Icon(type="icon-detail" @click="opneDetailDialog(data)" title="详情")
          Icon(type="icon-delete" @click="del(data)" title="删除")
          //- .icon.icon-detail(@click="opneDetailDialog(data)" title="详情")
          //- .icon.icon-delete(@click="del(data)" title="删除")
    el-button.add(type="text" @click='reset')
      img(src="../../../static/images/settings/u2236.png" )
    el-dialog(title="设置" :visible.sync="settingDialog" width="450px")
      span
        el-form
          el-form-item(label='是否显示')
            el-switch(
              v-model="settingItem.is_hide"
              active-color="#13ce66"
              inactive-color="#ff4949"
            )
          el-form-item(label='教师职称' v-if="clumnsData.type=='teacher'")
            el-input( placeholder='名称' v-model='settingItem.name')
      span(slot="footer" class="dialog-footer")
        el-button(@click="settingDialog = false") 取消
        el-button(@click="settingSave") 保存
    el-dialog(:title="name" :visible.sync="dialogVisible" width="800px")
      span
        el-form
          el-form-item(label='模块')
            el-input( placeholder='名称' v-model='addlist.name')
          el-form-item(label='所属模板')
            el-select(v-model='addlist.type' ref='modelValue')
              el-option(v-for="item in underList" :value='item.value' :key='item.value' :label="item.name")
          el-form-item(label='所属顶级')
            el-select(v-model='addlist.pid' ref='')
              el-option(v-for="item in list" :value='item.id' :key='item.id' :label="item.name")
          el-form-item(label='简介')
              el-input(v-model='addlist.abs')
          el-form-item(label='上传图片')
            el-button(type="primary" size="small" @click="$refs.fenmian.click()") 上传
            img.previewImgUrl(:src="previewImgUrl||addlist.img_src")
            input.hide( @change="changePreviewImg" type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" )
      span(slot="footer" class="dialog-footer")
        el-button(@click="dialogVisible = false") 取消
        el-button(@click="add") {{name}}
    el-dialog(title="详情" :visible.sync="detailDialog" width="960px")
      .title
        el-button(type="danger" size="small" style='float:right' @click="delAll") 删除
        el-button(type='primary' size='small' style='float:right' @click="openResource") 添加
      table.infoData.table
        tr
          td(width='5%')
            input(type='checkbox' @click='selectAll')
          td 名称
          //- td 作者
          //- td 价格
          td(width='25%') 创建时间
          td 操作
        tr(v-for='item in infoData' v-if='infoData')
          td
            input(type='checkbox' ref="select" :value="item.id")
          td {{item.info&&(item.info.course_name||item.info.resources_name||item.info.book_name||item.info.name)}}
          //- td {{item.author}}
          //- td {{item.product_price}}
          td {{item.create_time}}
          td
            Icon(type="icon-delete" @click="infoDel(item.id)" title="删除")
            Icon(type="el-icon-setting" @click="setTeacherTitle(item)" title="设置")
            //- span(@click='infoDel(item.b_id)') 删除
            span
              img.icon.up(src='../../../static/images/settings/u1971.png' alt='icon' @click="infoUp(item)")
              img.icon.down(src='../../../static/images/settings/u1973.png' alt='icon'  @click="infoDown(item)")
        tr(v-if='!infoData.length')
          td.center(colspan='6') 暂无数据
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
      //- 选择已上架资源
      Resource(
        :resourceDialog.sync="resourceDialog" 
        :type="clumnsData.type"
        :isShowSearch="true"
        v-if="resourceDialog" 
        @select="addInfo_send"
        :parameter="parameter"
      )
</template>


<style lang="stylus" scoped>
.setting
  padding 20px
  color #444
  min-width 1100px
  .head
    background #fff
    padding 15px
    border-radius 5px
    box-shadow 3px 3px 8px #dfdfdf
    margin-bottom 20px
    .flat
      padding 20px 0 10px 0
.columns-tree >>>.el-tree-node .el-tree-node__content
  line-height 40px
  padding 5px 0
  height 40px !important
  .custom-tree-node
    >span
      padding 0 24px
  .name
    width 120px
    display inline-block
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
.columns-tree >>> .el-tree-node__children .custom-tree-node .modify
  padding-left 6px
.previewImgUrl
  max-width 100%
  max-height 200px
.el-icon-info
  color #44c3aa
  font-size 20px
.content
  min-width 1000px
  .info
    color #999999
    font-size 12px
    padding 20px 0
    span
      vertical-align sub
      padding-left 5px
  .list
    .item
      margin-bottom 10px
      line-height 44px
      .txtInput
        width 200px
      .icon
        margin 7px 0 0 10px
      .icon:hover
        cursor pointer
      .el-icon-more
        border 1px solid #48a2ff
        color #48a2ff
        margin-top 8px
        display inline-block
        line-height 18px
        width 18px
        font-size 13px
        text-align center
        border-radius 20px
    .nopadding
      padding-left 6px
    .txt
      font-size 14px
      line-height 44px
      padding 0 24px
    .disable
      color #999
      opacity 0.6
      a
        color #999
  .infoData
    margin 20px 0 30px 0
    width 100%
    tr
      line-height 35px
      border-bottom 1px solid #eee
      span
        margin-right 10px
      span:hover
        cursor pointer
  .center
    text-align center
  .up
    transform rotate(90deg)
  .down
    transform rotate(-90deg)
</style>
