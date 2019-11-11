<script>
export default {
  props:['infoData'],
	data(){
		return{

		}
	}
}
</script>

<template lang="pug">
.detail(slot="detail")
	.top
		.cover
			img(src="./img/1.jpg")
		.right
			.textLeft
				p
					span.name 名称：
					span {{infoData.goods_name}}
				p
					span 课程价格：
					span {{infoData.authorize_price}}
			.textRight
				p
					span 单号：
					span {{infoData.id}}
	.center
		.left
			.title
				span 使用用户
			.name
				span {{infoData.use_teacher_name}}
		.right
			.title
				span 使用课程名称
			.name
				span {{infoData.use_goods_name}}
	.bottom
		.title
			span 资金结算
		.authorize
			.item
				p 使用授权课程
				p {{infoData.use_goods_name}}
				p {{infoData.authorize_price}}元
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
			width 10%
			height 90px
			float left
			img
				width 76px
				height 100%
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
		height 70px
		padding 20px 0 5px 5px
		border-bottom 1px solid #333
		.left,.right
			width 15%
			height 100%
			float left
			padding-left 5px
			.title,.name
				font-size 16px
				/* color #333 */
				line-height 30px
			.title
				font-weight bold

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
