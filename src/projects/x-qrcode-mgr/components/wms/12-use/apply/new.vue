<script>
import {main} from '@/util/transfer'
import * as services from 'services/x-qrcode/registration'
import { constants } from 'crypto';
import previewImg from './imgConfig';
import Detail from './detail';


export default {
  mixins: [main],
  data() {
    return {
			services,
			previewImg,
			modelList: [
				{ name: '模板一', value: 'model1'},
				{ name: '模板二', value: 'model2'},
			],
			form: {
				name: '',    //模板名称
				checkModel: 'model1' //选择的模板 
			},
			labelPosition: 'right',
			previewDialog: false,       //预览模态框
    }
	},
	components: {
		Detail,
	},
  methods: {
		jumpToList(){
			this.$router.push('/wms/apply')
		},
		save(){
			services.add({
				name:  this.form.name,
				style: this.form.checkModel
			})
			.then(res =>{
				this.$message.success('保存成功')
			}).catch(({message}) => {
				this.$message.error(message)
			})
		}
	}
}
</script>
<template lang="pug">
.newIndex
	.top      
		el-button.returnList(type="primary" @click="jumpToList") 返回列表
		el-button(type="primary" @click='save') 保存
	.form
		el-form(:label-position="labelPosition" label-width="80px" :model="form")
			el-form-item(label="表单名称")
				el-input(v-model="form.name")
			el-form-item(label="选择模板")
				el-select(v-model="form.checkModel")
					el-option(v-for="item in modelList"
					:key="item.value"
					:label="item.name"
					:value="item.value"
					)
				span.previewBtn(@click="previewDialog = true")  预览模板

	//- 详情
	.dialogs
		el-dialog(
			title="详情"
			:center="false"
			:visible.sync="previewDialog"
			top="50px"
			width="550px"
			)
			.content(slot="title") 预览
			Detail(
				v-if="previewDialog"
				:previewDialog.sync="previewDialog"
				:detailData="previewImg[form.checkModel]"
			)
			.content(slot="footer")  
</template>


<style lang="stylus" scoped>
.newIndex
	padding 20px 0px 0px 60px
	.top
		margin-bottom 30px
		.returnList
			margin-right  40px
	.form
		width: 40vw
		.previewBtn
			display inline-block
			margin-left 40px
	.dialog
		.content 
			width 
</style>
