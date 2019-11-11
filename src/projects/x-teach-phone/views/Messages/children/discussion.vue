<script>
import msgMixin from '@/mixins/msg'
export default {
	mixins: [msgMixin],
	data () {
		return {
			msg_type: 'comment'
		}
	}
}
</script>

<template lang="pug">
cube-scroll(
	ref="scroll"
	:options="options"
	class="discussion"
	@pulling-up="onPullUp"
)
	.discussion-item.clearfix(
		v-for="(item,index) in list"
		:key="`${item.id}_index`"
	)
		img(:src="item.from_user_picture")
		.discussion-body
			.discussion-title.f14.clearfix
				.ib.name.c-3 {{ item.from_user_name }}
				span.c-6 {{ item.course_name }}
				.i-msg-trash
			.discussion-content.f14.ell {{ item.content }}
			.discussion-time.f12.c-9 {{item.create_time}}
</template>
<style lang="stylus" scoped>
.discussion
	padding 0.2rem 0
	&-item
		padding 0.3rem
		border-bottom 1px solid #e9eef0
		img
			float left
			margin-right 0.17rem
			width 0.74rem
			height 0.74rem
			border-radius 50%
	&-body
		overflow hidden
		.name
			font-weight bold
			margin-right 0.5rem
		.i-msg-trash
			margin-top 0.1rem
			float right
	&-title
		line-height 0.48rem
	&-content
		margin-top 0.1rem
		line-height 1
	&-time
		margin-top 0.3rem
</style>

