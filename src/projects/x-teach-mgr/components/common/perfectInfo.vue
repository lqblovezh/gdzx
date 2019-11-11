<script>
import {
  main
} from '@/util/mixins'
export default {
  mixins: [main],
  data() {
    return {

    }
  },
  methods: {
		next(){
			this.$router.push({
				path:'/perfectInfo'
			})
		},
		upload(){

		},
		login(){
			this.$router.push({
				path:'/login'
			})
		},
  },
}
</script>

<template lang="pug">
.div
	.top
		img(src="./img/1.jpg")
		span xxx大学在线教育培训系统
	.bottom
		.account
			.left
				.name 真实姓名：
					span
				form
					.group
						span 学历：
						el-select(placeholder="请输入")
							el-option
					.group
						span 性别：
						el-select(placeholder="请输入")
							el-option
					.group
						span 邮箱：
						input(placeholder="请输入" autocomplete="off" type="email")
					.group
						span 单位：
						input(placeholder="请输入" autocomplete="off")
					.group
						span 职务：
						input(placeholder="请输入" autocomplete="off")
					.group
						span 简介：
						textarea(placeholder="请输入" autocomplete="off" type="text")
			.right
				.picture
					img(src="./img/1.jpg")
				.select
					el-button(type="priamry" plain @click="upload") 选择文件
					input(type="hidden")
			.btn
				el-button(@click="login") 完成
</template>

<style lang="stylus" scoped>
.div
	width 100%
	height 1000px
	.top
		width 100%
		height 78px
		background #ccc
		line-height 78px
		font-size 18px
		img
			width 97px
			height 38px
			padding 20px 0 0 50px
		span
			padding-left 15px
	.bottom
		width 100%
		padding-top 100px
		.account
			width 1328px
			height 627px
			border 1px solid #666
			padding 10px 20px 0 50px
			margin 0 auto
			background #fff
			position relative
			.left
				width 60%
				height 80%
				float left
				.name
					line-height 30px
					padding 10px 0 30px 35px
					font-size 18px
				form
					padding 5px 0 0 35px
					.group
						font-size 18px
						line-height 50px
						span
							margin-right 10px
						input
							width 156px
							height 25px
						textarea
							width 487px
							height 170px
			.right
				width 40%
				height 80%
				float left
				.picture
					width 300px
					height 300px
					margin 10px 0 0 100px
					img
						width 100%
						height 100%
						border-radius 50%
						border 1px solid #ccc
				.select
					padding 20px 0 0 200px
					width 100%
					height 50px
			.btn
				height 15%
				position absolute
				bottom 5px
				right 50px
</style>
