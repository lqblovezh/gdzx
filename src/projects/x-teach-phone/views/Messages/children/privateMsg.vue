<script>
import msgMixin from '@/mixins/msg'
export default {
	mixins: [msgMixin],
	data () {
		return {
			msg_type: 'private_message'
		}
	}
}
</script>

<template lang="pug">
cube-scroll(
	ref="scroll"
	:options="options"
	class="private-message"
	@pulling-up="onPullUp"
)
	.private-message-item.clearfix(
		v-for="(item,index) in list"
		:key="item.id"
	)
		.private-message-img
			img(v-lazy="item.from_user_picture")
			span.dot(v-show="false")
		.private-message-body
			.private-message-title.f14
				.ib.name.c-3 {{ item.from_user_name }}
				span 私信
				.i-msg-trash(@click="del(item)")
			.private-message-content.ell {{item.content}}
			.private-message-time.f12.c-9 {{item.create_time}}
				span(@click="$goWithName('chat', {id: item.from_user_id},{name: item.from_user_name })") 查看对话
</template>
<style lang="stylus" scoped>
.private-message
	padding 0.2rem 0
	&-item
		padding 0.3rem 0.3rem 0.24rem
		border-bottom 1px solid #e9eef0
	&-img
		position relative
		float left
		margin-right 0.17rem
		img
			width 0.74rem
			height 0.74rem
			border-radius 50%
		.dot
			display inline-block
			position absolute
			top 0.05rem
			right 0.05rem
			width 0.18rem
			height 0.18rem
			border-radius 50%
			background-color red
	&-body
		overflow hidden
	&-title
		line-height 0.48rem
		.i-msg-trash
			margin-top 0.1rem
			float right
		.name
			font-weight bold
			margin-right 0.3rem
		span
			color #808080
	&-content
		margin-top 0.27rem
		margin-bottom 0.34rem
	&-time
		span
			display inline-block
			margin-left 0.5rem
</style>
