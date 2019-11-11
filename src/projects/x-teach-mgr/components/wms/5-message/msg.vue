<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
	.search(slot="search")
		TimePick(@getTime="getTime" :placeholder="['创建时间','结束时间']")
		el-button(type="primary" class="el-icon-search"  @click="seareHandeler(query)" ) 搜索
		el-button(type="primary" @click="open" v-if="!$config.isTeacher") 新建 
	.list(slot="list")
		.item(v-for="item in tableData")
			.title.dy_primary
				b 系统消息
				b {{item.create_time}}
				span.dy_danger(@click="del(item.id)") 删除
			.msg
				pre {{item.content}}
		.noMsg(v-if="!tableData.length") 暂无数据
		el-dialog.dialog(:visible.sync="dialogVisible" width="600px" :before-close="handleClose")
			el-form.head(:model="form" :rules="rules" ref="form" label-width="60px")
				el-form-item(label="标题" prop="title")
					el-input(v-model='form.title')
				el-form-item(label="内容" prop="content")
					el-input(type="textarea" v-model="form.content" :rows="7" placeholder="请输入内容")
			div(slot="footer" class="dialog-footer")
				el-button(type="primary" @click="send" size="small" ) 发送
</template>

<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/msg"
export default {
	mixins: [main],
	data(){
		return {
			service,
			isUse:'',
			query:{
        type:"system_message",
				time_start:'',
				time_end:'',
			},
			dialogVisible:false,
			form:{
				type:'system_message',
			},
			rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
					],
					content: [
            { required: true, message: '请输入消息内容', trigger: 'blur' },
					],
			},
		}
	},
  methods:{
    open(){
			log(111)
      this.dialogVisible = true
		},
		send(){
				this.$refs.form.validate((valid) => {
          if (valid) {
            this.save();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
		}
  }
}
</script>

<style lang="stylus" scoped>
.noMsg
  margin-top 20px
  color #999
  font-size 15px
  text-align center
.list
	color #444
	.item 
		padding 10px
		border-bottom 1px dashed #ccc
		b 
			font-weight bold
			margin-right 30px
		.msg 
			padding 20px

.dy_danger
	cursor pointer
.dialog .head 
	margin-top 20px
</style>
