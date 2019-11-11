<script>
import msgMixin from '@/mixins/msg'
export default {
	mixins: [msgMixin],
	data () {
		return {
			msg_type: 'answering_question'
		}
	}
}
</script>

<template lang="pug">
cube-scroll(
	ref="scroll"
	:options="options"
	class="answer"
	@pulling-up="onPullUp"
)
	.my-question(
		v-for="(item, index) in list"
		:key="item.id"
	)
		.my-question-parent
			.my-question-header.clearfix
				.i-msg-trash(@click="del(item)")
				.my-question-text.c-3
					.title.f15 {{ item.title }}
					.course.f14 {{ item.course_name }}
			.my-question-content.c-6.f14 {{ item.content }}
			.my-question-time.f12.c-9 {{ item.create_time }}
		.my-question-child
			leave-message-item(
				v-for="(item,index) in item.reply"
				:key="item.id"
				:item="item"
				:is-teacher="true"
			)
</template>
<style lang="stylus" scoped>
.answer
	margin 0.2rem 0.3rem
	white-space normal
	.my-question
		padding-top 0.3rem
		&-parent
			border-bottom 1px solid #e9eef0
		&-header
			.i-msg-trash
				margin-top 0.08rem
				float right
		&-text
			line-height 0.46rem
		&-content
			line-height 1.5
		&-time
			margin 0.3rem 0 0.24rem
</style>
