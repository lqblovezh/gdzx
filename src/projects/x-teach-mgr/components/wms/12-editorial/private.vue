<script>
export default {
  props: {},
  data() {
    return {
			privateDialog:false, //私信框
    }
  },
  methods: {
    sendPrivate() {
			this.privateDialog=false
    },
		showPrivaDialog(){
			this.privateDialog=true
		},
		lookRecord(){
			this.$router.push({
				path:'/message'
			})
		},
  },
}
</script>

<template lang="pug">
el-dialog(
	:visible.sync="privateDialog"
	:before-close="handleClose"
	width="500px"
	:center="true"
	)
	.private()
		.div
			.person
				span.name 吴念真
				span.look(@click="lookRecord") 查看私信记录
			.message
				textarea(type="text" placeholder="请输入私信内容")
			el-button(type="primary" plain) 发送
</template>

<style lang="stylus" scoped>
.private .div
	padding 10px 10px 0 10px
	margin 0 auto
	.person
		height 50px
		line-height 50px
		font-size 16px
		color #333
		span
			float left
		.look
			float right
			color blue
			cursor pointer
	.message
		margin-bottom 15px
		textarea
			width 100%
			height 100px
</style>
