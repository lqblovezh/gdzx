<script>

import {recursionTree} from '@/util/math.js'
import formSerialize from 'form-serialize'
import * as commonServices from "services/x-publish/common"
import * as services from "services/x-publish/video"
export default {
  props:['type' , 'infoData' , 'infoDialog','typeDetail'],
  data() {
    return {

    };
  },
  computed:{
    detailType(){
      return this.infoData.img_status
    },
    hassVideo() {
      if(this.infoData.type == 6 || this.infoData.type == 5 || this.infoData.type == 8){
        return true
      }
      return false
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$emit('infoClick',tab)
    },
  },
};
</script>

<template lang="pug">
.div
  el-tabs( :value="type" @tab-click="handleClick")
    //- 详情
    el-tab-pane( label="详情" name="xq")
      .div
        form.infoForm( ref="infoForm"  )
          .group
            .label 名称:
            input.form-control( v-model="infoData.name"   type="text" disabled)
          .group
            .label 类型:
            span.types
              span  {{infoData.type_name}}
              span  创建时间: {{infoData.create_time}}

          .group
            .label 作者:
            input.form-control( v-model="infoData.author" type="text" disabled)
          .group
            .label 标签:
            input.form-control( v-model="infoData.tag"   type="text" disabled)
          .group
            .label 简介:
            textarea.textarea(  v-model="infoData.abs"   type="text" disabled)
          .group
            .label 详情:
          //- 外链输入
          .group.wailianinput(v-if="detailType && infoData.type != 3" )
            .label
            span
              input.form-control( :value="infoData.preview" ref="otherImgInput" disabled)
          //- 外链
          .group.detailmain.wailian(v-if="hassVideo||infoData.type==4 ")
            .label
            span.wrap
              video( :src="infoData.preview" controls v-if="hassVideo")
              audio( :src="infoData.preview" controls v-if="infoData.type==4")
              span.msg
                .type 格式:
                  span.val(v-text="infoData.format")
                .size 大小:
                  span.val(v-text="(infoData.size / 1024).toFixed(2) +'KB' ")
          //- 封面预览
          .group.detailmain
            .label
            span.wrap
              img.coverImg(:src="infoData.img_src||infoData.img")
              img.coverImg(:src="infoData.preview_path" v-if="infoData.type == 3")
          .group(v-if="infoData.type==10")
            table.table.border(width="100%")
              thead
                tr
                  th 名称
                  th 标签
                  th 作者
                  th 发布时间
              tbody
                tr(v-for="item,index in infoData.constitute")
                  td(v-text="item.name")
                  td(v-text="item.tag")
                  td(v-text="item.author")
                  td(v-text="item.create_time")
    //- 元数据
    el-tab-pane( label="元数据"  name="data" v-if="typeDetail!='视读'&&typeDetail!='听读'")
      .meta
        .group.rowWrap( v-if="infoData"  v-for="(item, index) in infoData.attributes")
          .label( v-text="index+1")
          span.form-control.left( v-text="item.key" )
          span.form-control.right( v-text="item.value" )
</template>


<style lang="stylus" scoped>
.btns
  text-align right
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  width 250px
.rowWrap
  .left
    width 150px
    min-width 150px
  .right
    width 350px
    margin-left 10px
  .btn
    margin-left 20px
.meta
  .btns
    margin 50px 50px 0 0
.metaadd
  text-align right
  margin 50px 50px
.muluWrap
  .left
    width 300px
    background red
    display inline-block
    overflow auto
  .right
    width calc( 100% - 300px)
    display inline-block
    min-height 500px
.form-control
  line-height 35px
</style>


