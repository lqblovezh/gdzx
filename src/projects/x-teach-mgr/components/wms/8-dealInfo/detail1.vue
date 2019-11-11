<script>
export default {
	props:['infoData'],
	data(){
		return{
       
		}
	},
}
</script>

<template lang="pug">
.detail(slot="detail" )
	.top()
		.cover
			img(:src="infoData.goods_img" v-if="infoData.goods_img" alt="图片加载失败")
		.right
			.textLeft
				p
					span 名称：
					span {{infoData.goods_name}}
				p
					span 课程价格：
					span {{infoData.price}}
			.textRight
				p
					span 单号：
					span {{infoData.id}}
				p
					span 时间：
					span {{infoData.pay_time}}
	.center
		p.title
			span 购买用户
		p.text
			span {{infoData.user_name}}
	.bottom
		.title
			span 资金结算
		.authorize
			.item(v-if="infoData.authorization_course")
				p 使用授权课程
				p {{infoData.authorization_course.goods_name}}
				p {{infoData.authorization_course.authorize_price}}元
			//- .item(v-for=" vo in infoData.authorization_resources") 
			//- 	p 使用授权资源
			//- 	p {{vo.resources_name}}
			//- 	p {{vo.resources_price}}元
			.item 
				p 教师提成比列 
				p {{infoData.profit_ratio}}%
			.item 
				p 最终金额 
				p {{infoData.finally_money_str}}
</template>

<style lang="stylus" scoped>
.detail
	width 100%
	height auto
	.top
		width 100%
		height 100px
		padding 5px 0 5px 5px
		border-bottom 1px solid #333
		.cover
			width 100px
			height 100px
			float left
			background #e8e8e8
			margin-right 10px
			img
				width 100px
				max-height 100px
		.right
			width 80%
			height 90px
			float left
			.textLeft,.textRight
				width 40%
				height 100%
				line-height 50px
				font-size 16px
				/* color #666 */
				float left
				.name
					font-weight bold
	.center
		width 100%
		height 80px
		padding 20px 0 5px 5px
		border-bottom 1px solid #333
		.title
			font-weight bold
			font-size 16px
			/* color #333 */
		.text
			font-size 16px
			color #333
			line-height 50px
			span
				margin-right 15px
	.bottom
		width 100%
		height 200px
		border-bottom 1px solid #333
		padding 20px 0 5px 5px
		.item 
			display flex 
			p 
				padding 20px 10px 0
</style>
