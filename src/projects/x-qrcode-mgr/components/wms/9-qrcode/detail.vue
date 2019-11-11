<script>
import formSerialize from 'form-serialize'
import Resource from '@/components/common/Resource'
import * as commonServices from 'services/common/index'
import * as services from 'services/x-qrcode/qrcode'
import { constants } from 'crypto';
export default {
  props: ['detailData', 'readOnly', 'detailDialog'],
  created() {
    this.codePosition()
    if (this.detailData.id) {
      this.getDetail()
    } else {
      this.information.config = this.config
    }
  },
  components: { Resource },
  data() {
    return {
      information: {
        code_type: 'agility',
        config: null,
        msg_num: 8,
      },
      qrDialog: false, //二维码图片
      previewImgUrl: null, // 图片预览
      imgUrl: null, // 图片上传后的真实url
      file: null, // 图书文件 //主文件用file
      checkAll: false,
      content: 'view', //二维码内容
      resourceDialog: false,
      messages: [],
      //   { name: '8条', value: 8 },
      //   { value: '8条' }
      // ], //消息条数
      // officalAccount: [{
      // 	value: "0",
      // 	name: "name1",
      // }, {
      // 	value: "1",
      // 	name: "name2",
      // }, {
      // 	value: "2",
      // 	name: "name3",
      // }, ], //公众号名称
      localPrinting: [], //印刷位置
      codeType: [
        { label: '固定链接地址', value: 'fixed' },
        { label: '灵活配置', value: 'agility' },
      ],
      config: {
        background: '#fff',
        foreground: '#000',
        level: 'Q',
        padding: 0,
        size: 255,
        value: '',
      },
    }
  },
  methods: {
    codePosition() {
      services.codePosition().then(res => {
        this.localPrinting = res.data
      })
    },
    addRes(i) {
      this.resourceDialog = true
    },
    getDetail() {
      services
        .detail({
          id: this.detailData.id,
        })
        .then(res => {
          this.information = res.data
          if (res.data.config) {
            this.config = res.data.config
            this.config.size = 255
            delete this.config.logo
            this.config.size = Number(res.data.config.size)
          } else {
            this.information.config = this.config
          }
          if (!this.information.code_type) {
            this.$set(this.information, 'code_type', 'agility')
          }
        })
    },
    getQrcode() {
      //生成二维码
      commonServices
        .generate({
          logo: this.information.img_logo,
          color: this.config.foreground,
          bg_color: this.config.background,
          size: 600,          //生成二维码样式大小
          content: this.config.value,
        })
        .then(res => {
          console.log(res.data)
          this.$set(this.information, 'img_src', res.data.url)
          this.$set(this.information, 'img', res.data.path)
        })
    },
    addSelect(data, arr) {
      console.log(data, arr)
      this.information.constitute_id = data[0]
      this.$set(this.information, 'books_info', arr[0].name)
      this.resourceDialog = false
    },
    async treeImgInpChange(e) {
      let file = e.target.files[0]
      if (!file) return
      let data = await this.$globalUpdateFile(file)
      this.$set(this.information, 'img_src_logo', data.url)
      this.$set(this.information, 'img_logo', data.path)
    },
    async submitInfo() {
      // 保存扩展信息
      let data = {
        id: this.detailData.id,
        ...this.information,
        config: {
          ...this.config,
          size:600,
          logo: this.information.img_logo,
        },
        content:
          this.information.code_type != 'agility' ? this.config.value : null,
      }
      if (!data.books_info) {
        data.books_info = ''
      }
      await services
        .save(data)
        .then(res => {
          this.$message.success('操作成功!')
          this.$emit('saveok', res.data)
        })
        .catch(err => {
          this.$message({
            message: err.message || '错误!',
            type: 'error',
          })
        })
    },
    showQrImg(){
      this.qrDialog = true
    }
  },
}
</script>

<template lang="pug">
.div
  Resource(
    v-if="resourceDialog"
    :resourceDialog.sync="resourceDialog"
    :curSoucesList="[]"
    @select="addSelect"
    :singleElection="false"
    type='9'
  )
  VaForm( ref="detailForm" )
    form.detailForm( ref="detailForm")
      fieldset()
        .group
          .label *二维码名称:
          input.form-control( v-va="{ type:'required' }" type="text" maxlength="30"  v-model="information.name")
        .group
          .label *描述:
          input.form-control( v-va="{ type:'required' }" type="text" maxlength="20"  v-model="information.abs")
        .group
          .label *二维码类型:
          el-select(v-model="information.code_type" )
            el-option(v-for="item in codeType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            )
        .group(v-if="information.code_type!='agility'")
          .label 固定链接地址:
          input.form-control(v-model="config.value" style='width:300px;' v-va="{ type:'required' }" placeholder="输入链接地址")
        .group(v-if="information.code_type=='agility'")
          .label *最多消息条数:
          el-select(v-model="information.msg_num")
            el-option(v-for="item in messages"
            :key="item.value"
            :label="item.name"
            :value="item.value")
        //- .group
        //- 	.label *公众号:
        //- 	el-select(v-model="officalAccount.value" )
        //- 		el-option(v-for="item in officalAccount"
        //- 		:key="item.value"
        //- 		:label="item.name"
        //- 		:value="item.value")
        .group
          .label 所属图书(不必填):
          input.form-control( type="text" maxlength="20"  v-model='information.books_info' disabled)
          el-button.modify(type="primary" size="mini"   @click="resourceDialog=true") 修改
        .group
          .label 二维码样式:
          .left
            vueQriousjs( :config="config" v-if="information.config")
            .div(style="margin:0 auto;")
              //-el-slider(v-model="config.size" :max="300" :min="200")
              img.img_logo(:src="information.img_src_logo")
              el-button(type="primary" size="small" plain @click="$refs.treeImgInp.click()") 上传logo
              input.hide(type="file" @change="treeImgInpChange" ref="treeImgInp")
              el-color-picker(v-model="config.background")
              el-color-picker(v-model="config.foreground")
          el-button.generate(type="primary" plain @click="getQrcode()" size="mini") 生成
          .right
            img.qrImg(:src="information.img_src" @click="showQrImg")
        .group
          .label *印刷位置:
          el-radio-group(v-model="information.position")
            el-radio(v-for="item in localPrinting" :label="item.position" :key="item.position") {{item.position_name}}
        .btn(v-if="!readOnly")
          el-button(type="info" @click="$emit('close')") 取消
          el-button(@click="submitInfo('detailForm')" type="primary" v-if="information.product_status!='true'") 确定
  .dialogs
    //- 详情
    el-dialog(
      append-to-body 
      :center="false"
      :visible.sync="qrDialog"
      :close-on-click-modal="false"
      top="40px"
      width="700px"
      )
      .two_content(v-if="qrDialog")
        img.qrImgContent(:src="information.img_src" )
</template>

<style lang="stylus" scoped>
.img_logo
  max-width 100px
  max-height 100px
  margin-right 20px
.qrImgContent
  width 600px
  height 600px
.form-control
  max-width 300px
.generate
  margin-left 15px
.modify
  margin-left 10px
.qrImg
  max-width 255px
  max-height 255px
.group
  .left, .right
    text-align center
    width 300px
    display inline-block
>>> .el-checkbox-group
  display inline-block
>>> .el-checkbox__label
  line-height 35px
.btn
  float right
.group>.label>.typeId
  margin 0 15px
.btns
  text-align right
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  max-width 250px
.rowWrap
  .left
    width 150px
    min-width 150px
  .right
    width 350px
    margin-left 10px
  .btn
    margin-left 20px
.th-name
  height initial
.imgSizeWrap
  height 30px
  margin-top 30px
  .imgSize
    display inline-block
    line-height 20px
    margin-left 130px
    font-size 14px
    color #333
.group>.label>span
  margin 0 15px
.group>.label>.types
  margin-left 38px
</style>
