<script>
import GroupList from "@/components/common/GroupList";
import formSerialize from "form-serialize";
import { main } from "@/util/mixins";
import Detail from "../detail";
import MoveGroup from "../moveGroup";
import putSetPage from "../pustSet";
import * as services from "services/x-read/mediaPPT";
import * as cServices from "services/x-publish/common";
import { mapMutations, mapState } from "vuex";

export default {
  components: { GroupList, Detail, MoveGroup, putSetPage },
  mixins: [main],
  data() {
    return {
      services,
      detailDialog: false, // 详情框
      detailDialoaType: "xq", //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      putDetailData: {}, //上架数据
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      toId: null, //移动到那一组
      pustSetDialog: false // 上架dialog
    };
  },
  methods: {
    setList(data) {
      this.setMediaBooklist(data);
    },
    setGroupList(data) {
      this.setMediaBookGrouplist(data);
    },
    setPage(data) {
      this.setMediaBooklistPage(data);
    },
    ...mapMutations([
      "setMediaBooklist",
      "setMediaBookGrouplist",
      "setMediaBooklistPage"
    ]),
    putSet(id) {
      //上架设置详情
      this.services.courseSetInfo({id}).then(res => {
        this.currentPut = {
          book_id: id,
          data: res.data
        }
        this.pustSetDialog = true
      })
    },
    pustSetSave() {//上架设置
      this.services.putSave(
        this.currentPut
      ).then(res => {
        this.pustSetDialog = false
        this.getList()
      })
    },
  },
  computed: {
    ...mapState({
      list: state => state.mediaBook.list,
      groupList: state => state.mediaBook.groupList,
      page: state => state.mediaBook.page
    })
  }
};
</script>


<template lang="pug">
.index.clearfix
  .dialogs
    MoveGroup( v-if="moveToOtherDiaolog" 
      @back="moveToOtherDiaolog=false" 
      @submit="moveToSubmit"
      :currGroup="currGroup" :groupList="groupList" )
    Grounding( v-if="upShelfDiaolog" 
      @back="upShelfDiaolog=false" 
      @upShelf="upShelf"
    )
    //- 详情
    el-dialog(
      :center="false"
      :visible.sync="detailDialog"
      v-if="detailDialog"
      :close-on-click-modal="false"
      top="50px"
      width="1000px"
      )
      .content(slot="title")
        Detail(typeDetail='课件' :type="detailDialoaType" :detailData="detailData" @back="detailDialog=false" @change="change" @delete="delVersion" :services="services")
      .dialog-footer.btns( slot="footer" class="" )
        el-button(type="info" @click="detailDialog = false" ) 取消
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
                el-input(placeholder="标签" name="tag" clearable v-model="searchQuery.tag")
              span.group-inline
                TimePick(:inputsName="['start_time','end_time']")
              span.group-inline
                select.form-control.width-small( placeholder="标签" name="status")
                  option(value="") 选择状态
                  option(value="1") 已上架
                  option(value="0") 未上架
              span.group-inline.right
                el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
          .tableWrap
            .tableTop
              .title.vel-line
                span 全部 <span v-if="page" class="totalNum">({{page.total}})</span> 
                .btns
                  el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
                  el-button(size="mini" type="primary"  @click="showUpShelf()" plain) 上架
                  el-button(size="mini" type="primary" @click="downShelf()"  plain ) 下架
                  el-button(size="mini" type="primary" @click="delChoosen()" plain) 删除
            table.table
              thead
                tr
                  th.table-check
                    input(type="checkbox" @click="$checkAll($event )")
                  th 名称
                  th 视频数量
                  th 标签
                  th(width=150) 创建时间
                  th(width=70) 上架状态
                  //- th(width=70) 上架设置
                  th(width=70) 使用版本
                  th(width=80) 操作
              tbody(v-if="list")
                tr(v-for="item in list" v-if="item.books_info")
                  th
                    input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
                  th
                    img.cover-photo(:src="item.books_info.img_src")
                    .th-name.bookName(:title="item.books_info.name") {{item.books_info.name}}
                  th
                    .th-name {{item.count}}
                  th
                    .th-name(:title="item.books_info.tag") {{item.books_info.tag}}
                  th
                    .th-name {{item.create_time}}
                  th
                    .th-name {{item.status_name}}
                  //- th
                  //-   el-button(type="text" @click="putSet(item)" v-text="item.price||item.set_name")
                  th 
                    .th-name(v-if="item.status!='0'") {{item.version_id}}
                    .th-name(v-if="item.status=='0'")
                      select(@change="versionChage($event,item)")
                        option(v-for="items,key in item.version_list" :value="items" :selected="item.version_id==key") {{key}}
                  th
                    .btns
                      Icon(type="icon-wms_msgComment" @click="putSet(item.id)"  v-if="item.status!='1'" title="设置")
                      //- span.icon(class="el-icon-news" v-if="item.status=='0'" style="color:#44c3aa" title="版本")
                      Icon(type="icon-reject" v-if="item.status!='0'" size="mini" title="下架"  @click="downShelf(item.id)")
                      Icon(type="icon-upload" v-if="item.status=='0'" title="上架" @click="showUpShelf(item)")
                      Icon(type="icon-detail" title="详情" @click="opneDetailDialog('xq' , item.id)")
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
            //- 上架设置
            el-dialog(
              title="价格设置"
              :visible.sync="pustSetDialog"
              v-if="pustSetDialog"
              width="500px"
            )
              .formWrap
                VaForm(ref="pustSetForm")
                  form#pustSetForm
                    .group
                      span.left 组名称
                      span.right 价格
                    .group(v-for="item,index in currentPut.data")
                      span.left(v-text="item.group_name")
                      span.right
                        input.form-control.info(name="prices" v-model="item.price")
                        input.hide(name="ids" :value="item.price")
              span.dialog-footer( slot="footer" class="")
                el-button(size="small" type="info" @click="pustSetDialog = false" ) 取消
                el-button(size="small" type="primary" @click="pustSetSave") 确定
          //- 分组
          .gruopList()
            GroupList(
              :groupList="groupList"
              :currGroup="currGroup"
              @addGroup="addGroup"
              @updateGroup="updateGroup"
              @delGroup="delGroup"
              @groupChange="groupChange"
            )
</template>

<style lang="stylus" scoped>
#pustSetForm
  span
    display inline-block
    input 
      max-width 100%
    &.left
      width 40%
    &.right
      text-align left
      width 50%

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
</style>