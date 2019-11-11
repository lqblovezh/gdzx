<script>
import formSerialize from 'form-serialize'
import * as services from 'services/x-qrcode/qrcodePro'
import { getList as marketingList } from 'services/x-qrcode/marketing'
import Resource from '@/components/common/Resource'
import Qrcode from './qrcode'
import { getTask } from 'services/common'

export default {
  props: ['type', 'detailData', 'detailDialog', 'readOnly'],
  components: {
    Resource,
    Qrcode,
  },
  created() {
    this.getMarketing()
    if (this.detailData && this.detailData.id) {
      this.getDetail()
      // this.getResConf()
    }
  },
  data() {
    return {
      information: [], //详情
      resourceData: this.detailData,
      resourceDialog: false, //添加弹框
      resList: {
        constitute: [],
      }, //资源
      messages: [
        { name: '1条', value: '0' },
        { name: '2条', value: '1' },
        { name: '3条', value: '2' },
        { name: '4条', value: '3' },
        { name: '5条', value: '4' },
        { name: '6条', value: '5' },
        { name: '7条', value: '6' },
        { name: '8条', value: '7' },
      ], //消息条数
      selResourDialog: false, //资源选择弹框
      rersourceBtn: false, //资源配置提交按钮
      useDialog: false, //应用库弹框
      qrcodeDetailVis: false, //二维码列表弹框
      dryingList: [], //晒单列表
      forwardList: [], //转发列表
      currentItem: {}, //当前选中资源
      currentRef: null,
      id: 10000,
      resourcesType: '1',
      parameter: {
        code_type: 'agility',
      },
    }
	},
  methods: {
    getMarketing() {
      marketingList({
        type: 'retransmission',
      }).then(res => {
        this.forwardList = res.data
      })
      marketingList({
        type: 'show_order',
      }).then(res => {
        this.dryingList = res.data
      })
    },
    handleClick(tab, event) {
      if (tab.name == 'resource') {
        this.rersourceBtn = true
      } else {
        this.rersourceBtn = false
      }
    },
    getResConf() {
			console.log(123456789)
      //资源配置
      services
        .getResConf({
          id: this.detailData.id,
        })
        .then(res => {
          this.resList = res.data
					this.resList.constitute = res.data.constitute
        })
    },
    addSelcet(data, array) {
      if (array[0]) {
        this.currentItem.resource_id = array[0].id
        this.currentItem.resource_name = array[0].name
      }
      this.resourceDialog = false
      this.selResourDialog = false
    },
    getDetail() {
      services
        .detail({
          id: this.detailData.id,
        })
        .then(res => {
          this.information = res.data
					this.resList = res.data
        })
    },
    selResource(type, sType) {
      this.currentItem.resource_type = type
      this.resourcesType = sType
      this.resourceDialog = true
    },
    async submitInfo() {
      //详情提交
      await services
        .save(this.information)
        .then(res => {
          //上传信息
          if (!this.detailData.id) {
            this.information = res.data
          }
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
    async submitResource() {
      //资源提交
      if (!this.detailData.id) {
        this.$message.warning('请先保存产品!')
      }
      await services
        .saveProduct({
          product_id: this.detailData.id,
          constitute: this.resList.constitute.map(item => {
            if (item.preview) {
              item.resource_id = null
            }
            if (item.act == 'add') {
              item.id = null
            }
            return item
          }),
        })
        .then(res => {
          this.getDetail()
          this.$message.success('保存成功')
        })
        .catch(err => {
          this.$message({
            message: err.message || '错误!',
            type: 'error',
          })
        })
    },
    chooseQrcode(item) {
      this.information.img_src = item.img_src
      this.information.msg_num = item.msg_num
      this.information.qrcode_id = item.id
      this.qrcodeDetailVis = false
    },
    detailRes(item) {
      this.currentItem = item
      this.selResourDialog = true
    },
    addResour() {
      this.id += 1
      if(!this.information.msg_num){
        this.$message.error(`请先保存`)
        return 
      }
			if(this.information.msg_num>this.resList.constitute.length){
				this.resList.constitute.push({
					act: 'add',
					name: '',
					id: this.id,
				})
			}else{
				this.$message.error(`资源数量不能超过${this.information.msg_num}条`)
			} 
    },
    updateImg(ref) {
      this.currentRef = ref
      this.$refs.updateImg.click()
    },
    update(e) {
      getTask(e.target.files[0]).then(res => {
        if (this.currentRef) {
          let index = this.resList.constitute.findIndex(
            item => item.id === this.currentRef
          )
          this.$set(this.resList.constitute[index], 'img_src', res.data.url)
          this.$set(this.resList.constitute[index], 'img', res.data.path)
        }
      })
    },
    del(item) {
      let index = this.resList.constitute.findIndex(i => item.id == i.id)
      this.resList.constitute.splice(index, 1)
    },
  },
}
</script>

<template lang="pug">
.div
	el-dialog(
		v-if="selResourDialog"
		:visible.sync="selResourDialog"
		top="50px"
		width="800px"
		append-to-body
		title="资源选择"
	)
		.content(slot="title")
			ul.selResour
				li(@click="selResource('resource','1')")
					span 资源库
				li(@click="selResource('app','7')")
					span 应用库
				li(@click="selResource('special','8')")
					span 专题库
	el-tabs( :value="type" @tab-click="handleClick")
		//- 详情
		el-tab-pane( label="详情" name='info' )
			//二维码选择,二维码库弹框
			Qrcode(v-if="qrcodeDetailVis" :qrcodeDetailVis.sync="qrcodeDetailVis" @chooseQrcode="chooseQrcode")
			VaForm( ref="detailForm" )
				form.detailForm( ref="detailForm")
					fieldset(:disabled="readOnly")
						.group
							.label *二维码:
							img.img(:src="information.img_src" v-if="information.img_src")
							el-button.select(type="primary" size="mini" plain @click="qrcodeDetailVis=true") {{information.img_src?'修改':'添加'}}
						.group
							.label *产品名称:
							input.form-control( v-va="{ type:'required' }" type="text" maxlength="20" :disabled="readOnly" v-model="information.name")
						.group
							.label *描述:
							input.form-control( v-va="{ type:'required' }"  type="text" maxlength="20" :disabled="readOnly" v-model="information.abs")
						.group
							.label *消息最多条数:
							span {{information.msg_num}}条
							//- el-select(v-model="information.msg_num" :disabled="!!information.id")
							//- 	el-option(v-for="item in messages"
							//- 	:key="item.value"
							//- 	:label="item.name"
							//- 	:value="item.value")
						.group
							.label *营销:
							.box1
								el-checkbox(v-model="information.is_show_order") 晒单营销
								el-select(v-model="information.show_order_id")
									el-option(
										v-for="item in dryingList"
										:key="item.id"
										:label="item.name"
										:value="item.id"
									)
							.box2
								el-checkbox(v-model="information.is_retransmission") 转发营销
								el-select(v-model="information.retransmission_id")
									el-option(
										v-for="item in forwardList"
										:key="item.id"
										:label="item.name"
										:value="item.id"
									)
			.btns(v-if="!readOnly")
				el-button(type="info" @click="$emit('update:detailDialog',false)") 取消
				el-button(@click="submitInfo('detailForm')" type="primary") 确定
		//- 资源
		el-tab-pane( label="资源配置" name="resource")
			Resource(
				v-if="resourceDialog"
				:resourceDialog.sync="resourceDialog"
				:curSoucesList="resList.constitute||[]"
				:type="resourcesType"
				:singleElection="false"
				@select="addSelcet"
				:isShowType="true"
			)
			VaForm( ref="detailForm" )
				form.detailForm( ref="detailForm")
					fieldset(:disabled="readOnly")
						//默认8条数据 不再需要添加按钮
						.group
							.btnRight(v-if="!readOnly")
								i(class="el-icon-info") 资源配置数量不能超过 {{information.msg_num}} 条
								el-button(type="primary" plain size="mini" @click="addResour") 添加
						.group
							table.table.border(width="100%")
								thead
									tr
										th(width=55)
											span 序号
										th 名称
										th 关联图片
										th 自定义地址
										th 关联资源名称
										th(width=100) 操作
								tbody
									tr(v-for="(item,index) in resList.constitute")
										td
											span {{index+1}}
										td
											input.form-control(v-model='item.name')
										td
											img.img(:src="item.img_src" :ref="item.id")
											el-button(type="primary" plain size="mini" @click="updateImg(item.id)") 选择
										td
											el-input(placeholder="若自定义地址，关联资源将会被丢弃" v-model='item.preview' clearable)
										td
											span {{item.resource_name}}
										td
											span.icon.icon-data(title="关联资源" type="primary" size="mini" plain @click="detailRes(item)")
											span.icon.icon-delete(title="删除" type="primary" size="mini" plain @click="del(item)")
				.btns(v-if="rersourceBtn")
					input.hide(type="file" @change="update($event)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
					el-button(type="info" @click="$emit('update:detailDialog',false)") 取消
					el-button(@click="submitResource('detailForm')" type="primary") 确定
</template>

<style lang="stylus" scoped>
.btnRight
  text-align right
.box1, .box2
  padding-right 50px
  display inline-block
  .name1, .name2
    margin-left 15px
    font-size 14px
    color #666
input
  max-width 500px
.selResour
  padding 10px
  height auto
  li
    width 200px
    display inline-block
    border 1px solid #666
    margin 15px
    line-height 120px
    text-align center
    cursor pointer
.message
  line-height 35px
  font-size 16px
  color #333
.select
  margin-left 5px
>>> .el-checkbox__label
  line-height 35px
>>> .el-checkbox-group
  display inline-block
  width calc(100% - 150px)
>>>.el-checkbox+.el-checkbox
  line-height 35px
.btns
  text-align right
  margin-top 20px
.img
  max-width 150px
  max-height 150px
  vertical-align middle
.el-icon-info
	color #44c3aa
	margin-right 15px
</style>
