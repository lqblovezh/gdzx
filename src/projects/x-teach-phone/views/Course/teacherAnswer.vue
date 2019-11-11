<template lang="pug">
v-wrapper(title="教师答疑" :main-type="3")
	.answers
		cube-scroll(
			ref="scroll"
			:options="options"
			@pulling-up="onPullUp"
		)
			.ta-item(v-for="i in list")
				.ta-question
					.ta-question__title
						p {{i.title}}
						span.icon-trash__a(@click="delMyQuestion(i)")
					.ta-question__detail {{i.content}}
					.time {{i.create_time}}
				section.ta-answer(v-for="j in i.reply")
					img(:src="j.from_user_picture")
					.ta-content
						.ta-content__bar {{j.from_user_name}}
							span.icon-teacher__label
						.ta-content__txt {{j.content}}
						.time {{j.create_time}}
						a 查看全部
		message-textarea(
			ref="message"
			field-type="teacher"
			@send="sendQuestion"
		)
</template>
<script>
import { mapGetters } from 'vuex'
import loadmore from '@/mixins/loadmore'
export default {
	mixins: [loadmore],
	data () {
		return {
			list: []
		}
	},
	mounted () {
		this.getList()
	},
	computed: {
		...mapGetters('course', ['teacher_info'])
	},
	methods: {
		async onPullUp () {
      if (!this.loaded) {
        await this.getList()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
		getList (flag) {
			if (flag) [
				this.page.pageStart = 0
			]
			const { course_id } = this.$route.params
			const { id: to_user_id } = this.teacher_info
			this.$service.message.getTeacherAnswer({
				to_user_id,
				course_id,
				...this.page
			}).then(res => {
				const {data, page} = res
				if (data && data.length) {
					this.list = flag ? data:[...this.list, ...data]
					this.page.pageStart = this.list.length
					if (page.totle <= this.list.length) {
						this.loaded = true
					}
				}
			}).catch(console.error)
		},
		sendQuestion ({ title, content } = {}) {
			if (!title || !content) {
				this.$Toast('提问和内容不能为空')
				return
			}
			const { course_id } = this.$route.params
			const { id: to_user_id } = this.teacher_info
			this.$service.message.sendMsg({
				course_id,
				to_user_id,
				title,
				content,
				type: 'answering_question'
			}).then(res => {
				this.$refs.message.handleClose()
				this.getList(true)
			}).catch(console.error)
		},
		delMyQuestion (item) {
			this.$MessageBox.confirm('确认删除？').then(action => {
				this.$service.message.delMsg({
					id: item.id
				}).then(res => {
					this.getList(true)
				}).catch(console.warn)
			}).catch(e => {})
		}
	}
}
</script>
<style lang="stylus" scoped>
.icon-trash__a
	position absolute
	right 0
	top 0.1rem
.container
	font-size 14px
	.time
		font-size 12px
		color #999
.ta-item
	padding 0.4rem 0.3rem
	line-height 0.45rem
	border-bottom 1px solid #e9eef0
	.ta-question__title
		position relative
		color #333
		p
			padding-right 0.4rem
		span
			position absolute
			top 0rem
	.ta-question__detail
		color #666
	.ta-answer
		img
			float left
			width 0.74rem
			height 0.74rem
			border-radius 50%
			border 1px solid #CCC
		.ta-content
			padding-left 0.17rem
			overflow hidden
			.ta-content__bar
				padding-top 0.1rem
				color #333
				span
					padding-top 0.15rem
					margin-left 0.1rem
			.ta-content__txt
				color #666
			a
				color #3496e1
</style>
