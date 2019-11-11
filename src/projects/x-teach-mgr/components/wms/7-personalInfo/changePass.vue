<script>
export default {
  data() {
    return {
			data:{},
			result:'',
    }
  },
  methods: {
		send(){

		},
		
  },
}
</script>
<template lang="pug">
.box
	.frame
		<el-form status-icon :rules="rules2" label-width="100px" class="demo-ruleForm">
			<el-form-item label="原密码" prop="pass">
				<el-input type="password" autocomplete="off">
				</el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="pass">
				<el-input type="password" autocomplete="off">
				</el-input>
			</el-form-item>
			<el-form-item label="确认新密码">
				<el-input type="password" autocomplete="off">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')" @click.native='send'>确定
				</el-button>
			</el-form-item>
		</el-form>
</template>
<style lang="stylus" scoped>

</style>
