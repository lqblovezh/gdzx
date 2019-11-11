<script>
import { main } from "@/util/mixins";
import formSerialize from "form-serialize";
import * as services from "services/x-qrcode/books";
// import Detail from 'projects/common/readOnlyDetail'
import Detail from "./detail";

import { mapMutations, mapState } from "vuex";

export default {
  components: {
    Detail
  },
  mixins: [main],
  data() {
    return {
      services,
      detailSrc: '',       //图片原图
      detailDialog: false, // 详情框
      detailDialoaType: "info", //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      detailImgDialog: false,   //图片详情模态框
      readOnly: false,
      searchQuery: {},
      mode: "listMode" //默认为列表模式， 可切换为大图模式(imgMode)
    };
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = {}
    ) {
      // query.group_id = this.currGroup;
      this.services.booksList({ pageNum, pageOffset, ...query }).then(res => {
        this.setList(res.data);
        this.setPage(res.page);
      });
    },
    openDetailImgDialog(item) {
      //图片放大预览
      this.detailSrc = item.img_src
      this.detailImgDialog = true
    },    
    opneDetailDialog(type, item) {
      this.detailDialog = true;
      this.detailData = item;
    },
    educe(id) {
      let ids = null;
      if (!id) {
        ids = this.$getChecked();
      } else {
        ids = id;
      }
      if (!ids) return;
      services
        .educe({ id: ids })
        .then(res => {
          this.$message.success(
            "任务创建成功，请前往'导入导出列表'页查看进度！"
          );
        })
        .catch(err => {
          this.$message.error("导出失败");
        });
    },
    addBooks() {
      //新增图书
      this.detailDialog = true;
      this.detailData = {};
    },
    close() {
      this.detailDialog = false;
    },
    setList(data) {
      //设置列表
      this.setSerieslist(data);
    },
    setPage(data) {
      //设置页码
      this.setSerieslistPage(data);
    },
    saveok(data) {
      if (!this.detailData.id) {
        this.detailData = data;
      }
      this.getList();
      this.detailDialog = false;
    },
    ...mapMutations(["setSerieslist", "setSerieslistPage"])
  },
  computed: {
    ...mapState({
      list: state => state.series.list,
      page: state => state.series.page
    })
  }
};
</script>
<template lang="pug">
.index.clearfix
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
                el-input(placeholder="作者" name="author" clearable v-model="searchQuery.author")                
              span.group-inline
                el-input(placeholder="isbn" name="isbn" clearable v-model="searchQuery.isbn")                
              span.group-inline
                TimePick(:inputsName="['start_time','end_time']")
              span.group-inline.float-right
                el-button(size="mediu" type="primary" icon="el-icon-plus" plain @click="addBooks") 新建
                el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
          .tableWrap
            .tableTop
              .title.vel-line
                span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
                .btns
                  el-button(v-if="mode == 'imgMode'" size="mini" type="primary" icon="el-icon-tickets" @click="mode ='listMode'" plain) 列表模式
                  el-button(v-else size="mini" type="primary"  icon="el-icon-menu" @click="mode ='imgMode'" plain) 大图模式
                  el-button(size="mini" type="primary" @click="educe('')" plain) 导出
                  el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
            table.table(v-if="mode == 'listMode'")
              thead
                tr
                  th.table-check
                    input(type="checkbox" @click="$checkAll($event)")
                  th 名称
                  th 简介
                  th 作者
                  th ISBN
                  th 创建时间
                  th(width=150) 二维码数量
                  th(width=150) 操作
              tbody(v-if="list")
                tr(v-for="item in list")
                  th
                    input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
                  th
                    img.cover-photo(:src="item.img_src")
                    .th-name.bookName(:title="item.name") {{item.name}}
                  th
                    .th-name(:title="item.name") {{item.abs}}
                  th
                    .th-name(:title="item.name") {{item.author}}
                  th
                    .th-name(:title="item.name") {{item.isbn}}
                  th
                    .th-name {{item.create_time}}
                  th
                    .th-name {{item.qrcode_num}}
                  th
                    .btns
                      //-Icon(type="icon-detail" title="详情" @click="opneDetailDialog('info',item)")
                      span(@click="opneDetailDialog('info',item)") 详情&nbsp;&nbsp;
                      //- Icon(type="icon-preview" title="查看" @click="opneDetailDialog(10, item.id)")
                      //- Icon(type="icon-delete" title="删除" @click="delChoosen(item.id,item)")
                      span(@click="delChoosen(item.id,item)") 删除&nbsp;&nbsp;
                      //- Icon(type="icon-export" title="导出" @click="educe([item.id])")
                      span( @click="educe([item.id])") 导出
            .mediaList(v-else)          
              ul
                li.itemWrap(v-for="item in list" :key='item.id')
                  .imgWrap
                    .name
                      span
                        input(type="checkbox" :value="item.id" name="ids"  ref="ids")
                      span(v-text="item.name" :title="item.name")
                    .imgcontent(@click="openDetailImgDialog(item)")
                      img(:src="item.img_src")
                      .cover()
                        .time {{item.create_time}}
                  .btns
                    include ../../common/pug/videoBtns.pug     
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
  //-图片显示框
  .myDialogWrap(v-if="detailImgDialog")
    .content
      .imgWrap
        img(:src="detailSrc")
        span.closeBtn(@click="detailImgDialog = false")      

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
          :detailData="detailData"
          @close="close"
          @saveok="saveok"
        )
</template>


<style lang="stylus" scoped>
.mediaList .imgWrap:hover {
    box-shadow:0;
    transform: translateY(0);
    transition: all 0.3s ease-in-out;
}
.tableWrap {
  width: 97%;
}

.form-control {
  width: 170px;
}

.width-small {
  width: 100px;
}

.el-dialog__wrapper {
  .form-control {
    margin-right: 10px;
    width: 100px;
    min-width: @width;
  }
}

.contList {
  li {
    display: inline-block;
    padding-right: 10px;
  }

  .disabled {
    color: #bdbdbd;
  }
}
.mediaList .itemWrap {
    display: inline-block;
    width: 23%;
    padding: 10px;
    height: 300px;
    box-sizing: border-box;
}
.mediaList .imgWrap .imgcontent {
    text-align: center;
    position: relative;
    width: 280px;
    height: 200px;
    display: table-cell;
    vertical-align: middle;
}
.mediaList .imgWrap .imgcontent img {
    max-height: 100%;
    max-width: 100%;
}
</style>
