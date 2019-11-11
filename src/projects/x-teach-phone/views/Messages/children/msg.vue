<script>
import msgMixin from '@/mixins/msg'
export default {
	mixins: [msgMixin],
	data () {
		return {
			msg_type: 'system_message'
		}
	}
}
</script>

<template lang="pug">
cube-scroll(
	ref="scroll"
	:options="options"
	class="system-message"
	@pulling-up="onPullUp"
)
	.system-message-item.clearfix(
		v-for="(item, index) in list"
		:key="item.id"
	)
		.i-system-avatar
		.system-message-body
			.system-message-title.clearfix
				.ib.name.f15.c-3 {{item.from_user_name}}
				.i-msg-trash(@click="del(item)")
			.system-message-content.f14.c-6 {{ item.content }}
			.system-message-time.f12.c-9 {{ item.create_time }}
</template>
<style lang="stylus" scoped>
.system-message
	padding 0.2rem 0
	&-item
		padding 0.3rem 0.3rem 0.25rem
		.i-system-avatar
			float left
			margin-right 0.17rem
	&-body
		overflow hidden
	&-title
		line-height 0.48rem
		.i-msg-trash
			margin-top 0.1rem
			float right
	&-content
		line-height 1.5
	&-time
		margin-top 0.3rem
</style>

