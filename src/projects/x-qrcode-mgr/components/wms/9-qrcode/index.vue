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
  mixins: [main],
  data() {
    return {
      services,
      detailDialog: false, // 详情框
      detailDialoaType: 'info', //详情tabs类型
      detailData: {}, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      readOnly: false,
    }
  },
  created() {},
  methods: {
    close() {
      this.detailDialog = false
    },
    educe(id) {
      let ids = null
      if (!id) {
        ids = this.$getChecked()
      } else {
        ids = id
      }
      if (!ids) return
      services
        .educe({ id: ids })
        .then(res => {
          this.$message.success(
            "任务创建成功，请前往'导入导出列表'页查看进度！"
          )
        })
        .catch(err => {
          this.$message.error('导出失败')
        })
    },
    opneDetailDialog(type, item) {
      this.detailDialog = true
      this.detailData = item
    },
    addQrcode() {
      //创建二维码
      this.detailDialog = true
      this.detailData = {}
    },
    getusedList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = {},
      product_status = 'true'
    ) {
      this.services
        .getList({
          pageNum,
          pageOffset,
          ...query,
          product_status,
        })
        .then(res => {
          this.setList(res.data)
          this.setPage(res.page)
        })
    }, //已使用
    getnoUseList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = {},
      product_status = 'false'
    ) {
      this.services
        .getList({
          pageNum,
          pageOffset,
          ...query,
          product_status,
        })
        .then(res => {
          this.setList(res.data)
          this.setPage(res.page)
        })
    }, //未使用
    setList(data) {
      //设置列表
      this.setSerieslist(data)
    },
    setPage(data) {
      //设置页码
      this.setSerieslistPage(data)
    },
    saveok(data) {
      if (!this.detailData.id) {
        this.detailData = data
      }
      this.getList()
      this.detailDialog = false
    },
    download(url){
      window.open(url)
    },
    ...mapMutations(['setSerieslist', 'setSerieslistPage']),
  },
  computed: {
    ...mapState({
      list: state => state.series.list,
      page: state => state.series.page,
    }),
  },
}
</script>

<template lang="pug">
.box
  .mainRight
    .contentWrap
      .contentLeft
        .maindata
          .serachWrap
            .title
            form#mainForm.clearfix
              span.group-inline
                el-input(placeholder="名称" name="name" clearable v-model="searchQuery.name")
              span.group-inline
                TimePick(:inputsName="['start_time','end_time']")
              span.group-inline.float-right
                el-button(size="mediu" type="primary" icon="el-icon-plus" plain @click="addQrcode") 创建
                el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
          .btn
            el-button-group()
              el-button(type="primary" plain @click="getList") 全部
              el-button(type="primary" plain @click="getusedList") 已使用
              el-button(type="primary" plain @click="getnoUseList") 未使用
          .tableWrap
            .tableTop
              .title.vel-line
                span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
                .btns
                  el-button(size="mini" type="primary" @click="educe('')" plain) 导出
                  el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
            table.table
              thead
                tr
                  th.table-check
                    input(type="checkbox" @click="$checkAll($event)")
                  th 名称
                  th 简介
                  th 所属图书
                  th(width=150) 使用状态
                  th 创建时间
                  th(width=250) 操作
              tbody(v-if="list")
                tr(v-for="item in list")
                  th
                    input(type="checkbox" :value="item.id" name="ids" ref="ids")
                  th
                    img.cover-photo(:src="item.img_src")
                    .th-name.bookName(:title="item.name") {{item.name}}
                  th
                    .th-name {{item.abs}}
                  th
                    .th-name {{item.book_name}}
                  th
                    .th-name {{item.product_status_name}}
                  th
                    .th-name {{item.create_time}}
                  th
                    .btns
                      //- Icon(type="icon-detail" title="详情" @click="opneDetailDialog('info',item)")
                      span(@click="opneDetailDialog('info',item)") 详情&nbsp;&nbsp;
                      //- Icon(type="icon-delete" title="删除" @click="delChoosen(item.id,item)" v-if="item.product_status!='true'")
                      span(@click="delChoosen(item.id,item)" v-if="item.product_status!='true'") 删除&nbsp;&nbsp;
                      //- Icon(type="icon-export" title="导出二维码" @click="educe([item.id])")
                      span(@click="educe([item.id])") 导出二维码&nbsp;&nbsp;
                      //- Icon(type="icon-export" title="下载二维码" @click="download(item.img_src)")
                      span(@click="download(item.img_src)") 下载二维码
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
  .dialogs
    //- 详情
    el-dialog(
      :center="false"
      :visible.sync="detailDialog"
      :close-on-click-modal="false"
      top="50px"
      width="1000px"
      title="详情"
      )
      .content(slot="title")
        Detail(
          v-if="detailDialog"
          :detailDialog.sync="detailDialog"
          :readOnly="readOnly"
          @close="close"
          :detailData="detailData"
          @saveok="saveok"
        )
</template>

<style lang="stylus" scoped>
.btn
  background #fff
  width 100%
  padding 15px
  margin-bottom 10px
.box
  background #ececec
  min-height 650px
  min-width 1660px
  .top
    margin-bottom 20px
    .group-inline
      .form-control
        width 100%
        height 40px
    .list
      border 15px solid #fff
      background #fff
      width 100%
      line-height 30px
      margin-bottom 50px
      thead
        background #ececec
        tr
          background #ececec
          th
            text-align center
            padding 18px 10px
      tbody
        tr
          &:nth-child(2n)
            background #eee
          td
            padding 10px
            text-align center
            vertical-align middle
    .page
      text-align center
      padding-bottom 50px
  .imgList
    margin-bottom 20px
    height 200px
    .item
      float left
      width 150px
      text-align center
      margin-right 5px
      .img
        height 190px
        margin-bottom 10px
        background no-repeat
        background-size 100%
</style>
