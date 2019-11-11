<script>
import Star from '@/components/common/star'
export default {
	data () {
		return {
			list: []
		}
	},
	components: {
		Star,
	},
	methods: {
		goToCourse (info) {
			if (info) {
				this.$goByName('course', {
					params: {course_id: info.id}
				})
			}
		},
		fetch() {
			const {userId} = this.$route.query
			this.$service.teacher.getClassByTid({id: userId}).then(res => {
				this.list = res.data
			})
		}
	},
}
</script>
<template lang="pug">
.class-list.container
	p.course-tips(v-show="!list || list.length == 0") 暂无数据
	.class-item(v-for="item in list" @click="goToCourse(item.course_info)")
		img(:src="item.course_info.img")
		.class-item__info
			.class-item__info-name {{item.class_name}}
			.class-item__info-intro {{item.introduce}}
</template>
<style lang="stylus" scoped>
.class-list
	display flex
	justify-content space-between
	flex-wrap wrap
	padding .3rem 0
.class-item
	width 3.3rem
	box-sizing border-box
	img
		width 100%
		height 2.06rem
		border-radius 5px
		box-shadow 2px 3px 5px rgba(0,0,0,.3)
	.class-item__info
		padding 0.2rem 0
		color #666
		font-size 12px
	.class-item__info-name
		color #454545
		font-size 14px
	.class-item__info-intro
		margin-top 0.1rem
		margin-bottom 0.2rem
	.class-item__info-score
		span
			display inline-block
			padding-top 0.13rem
	.class-item__info-price
		font-size 0.13rem
		color #666
		span
			font-size 0.15rem
			color #ff5d16
</style>
