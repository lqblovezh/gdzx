<script>
import * as service from "services/x-teach/lives"
// 编辑详情
export default {
	props:['detail','disabled'],
	data(){
		return{
			dialogVisible: false, //详情框
		}
	},
	created(){
	},
	methods:{
	},
}
</script>
<template lang="pug">
	.bottom(v-if="detail.user_info")
		.left
			.picture
				img(:src="detail.user_info.picture_absolute")
			el-form(style="width:200px;float:left") 
				el-form-item(label="姓名:" lable-width="40px" style="margin-bottom:5px;float:left;" )
					el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detail.user_info.name" :disabled="disabled")
				el-form-item(label="性别:" lable-width="40px" style="margin-bottom:5px" )
					el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detail.user_info.sex"  :disabled="disabled")
				el-form-item(label="出生日:" lable-width="40px" style="margin-bottom:5px")
					el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detail.user_info.date_of_birth" :disabled="disabled")
				el-form-item(label="x-teach销售分成比例:" lable-width="40px" style="margin-bottom:5px")
					el-input(autocomplete="off" input-width="60px" style="float:left;margin-bottom:10px" :disabled="disabled" v-model="detail.user_info.app_setting.profit_ratio")
				el-button(type="primary" plain  v-if="!disabled") 修改分成比例
				el-form-item(label="可提现金额:" lable-width="40px" style="margin-bottom:5px")
					el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detail.user_info.balance" :disabled="disabled")
		.center
			el-form(style="width:150px;float:left")
				el-form-item(label="学历:" lable-width="40px" style="margin-bottom:5px")
					el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detail.user_info.education" :disabled="disabled")
				el-form-item(label="电话:" lable-width="40px" style="margin-bottom:5px")
					el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detail.user_info.phone" :disabled="disabled")
				el-form-item(label="邮箱:" lable-width="40px" style="margin-bottom:5px")
					el-input(autocomplete="off" input-width="60px" v-model="detail.user_info.email" :disabled="disabled")
				el-form-item(label="单位:" lable-width="40px" style="margin-bottom:5px")
					el-input(autocomplete="off" input-width="60px" v-model="detail.user_info.company" :disabled="disabled")
		.right
			el-form(style="width:150px;float:left")
				el-form-item(label="职务:" lable-width="40px" style="margin-bottom:5px")
					el-input(autocomplete="off" input-width="60px" style="float:left" v-model="detail.user_info.duties" :disabled="disabled")
				el-form-item(label="简介:" lable-width="40px" style="margin-bottom:5px")
					el-input(autocomplete="off"   type="textarea" style="float:left; width:300px" rows="5" v-model="detail.user_info.summary" :disabled="disabled")
				el-button(type="primary" plain @click="resetPass()" v-if="!disabled") 重置登录密码
</template>
<style lang="stylus" scoped>
.bottom
	width 100%
	height 500px
	.left,.center,.right
		height 100%
		float left
		margin-right 10px
	.left
		width 39%
		margin-left 20px
		.picture
			width 100px
			height 100px
			margin 10px 20px 0 5px
			float left
			img
				height 100px
				width 100px
				background url('./img/1.jpg')
				background-size 100px 100px
				border-radius: 50%;
	.center
		width 22%
	.right
		width 32%
</style>
