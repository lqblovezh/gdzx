<script>
import { mapState } from 'vuex'
import { extract } from '@/utils/algorithm'
import { CourseInfo } from '@/mixins'
import loadmore from '@/mixins/loadmore'
export default {
	mixins: [CourseInfo, loadmore],
	data () {
		return {
			list: [],
			placeholder: '发表评论',
			myReply: {},
			options: {
				click: true
			}
		}
	},
	mounted () {
		this.getList()
	},
	computed: {
		...mapState('user', ['userInfo']),
		courseId () {
			return this.$route.params.course_id
		},
	},
	methods: {
		async getList (flag) {
			if (flag) {
				this.page.pageStart = 0
			}
			try {
				const {
					data,
					page
				} = await this.$service.message.getComment({
					course_id: this.courseId,
					...this.page
				})
				if (data) {
					extract(data, 'reply')
					this.addProperty(data)
					this.list = flag ? data : [...this.list, ...data]
					this.page.pageStart = this.list.length
					if (this.list.length >= page.total) {
						this.loaded = true
					}
				} else {
					throw new Error('接口返回的数据类型错误！')
				}
			} catch(e) {
				console.error(`[discuss getlist] ${e.toString()}`)
			} finally {}
		},
		async onPullUp () {
      if (!this.loaded) {
        await this.getList()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
		reset () {
			this.list = []
			this.page.pageStart = 0
		},
		addProperty (arr) {
			arr.forEach(item => {
				item.expand = false
			})
		},
		initState () {
			this.placeholder = '发表评论'
			this.myReply = {}
		},
		replyUser (msg) {
			this.placeholder = `回复 ${msg.user_name}：`
			this.myReply = {
				pid: msg.id,
			}
			this.$refs.message.handleShow()
		},
		sendComment (content) {
			this.$service.message.sendComment({
				...this.myReply,
				course_id: this.courseId,
				content,
			}).then(res => {
				this.getList(true)
				this.$refs.message.handleClose()
			}).catch(console.error)
		},
		delComment (cid) {
			this.$MessageBox.confirm('确认删除？').then(action => {
				this.$service.message.delComment({id: cid}).then(res => {
					this.getList(true)
				}).catch(console.error)
			}).catch(e => {})
		},
		giveLike (comment) {
			this.$service.message.giveLike({
				comment_id: comment.id
			}).then(res => {
				if (res.data.state) {
					++comment.praise_count
					comment.praise_state = true
				} else {
					--comment.praise_count
					comment.praise_state = false
				}
			}).catch(console.error)
		},
		toggleRestComment (item) {
			item.expand = !item.expand
		}
	}
}
</script>
<template lang="pug">
v-wrapper(title="学习讨论" :main-type="3")
	.course-discuss
		cube-scroll(
			ref="scroll"
			:options="options"
			@pulling-up="onPullUp"
		)
			section(v-for="comment in list")
				img(:src="comment.picture")
				.dis-content
					.dis-content__bar.flex.clearfix
						p.fl {{comment.user_name}}
						span.icon-trash__a.fr(@click="delComment(comment.id)" v-show="comment.user_id===userInfo.id")
					.dis-content__detail
						p {{comment.content}}
						a(v-show="comment.reply.length > 0 && !comment.expand" @click="toggleRestComment(comment)") 查看全部{{comment.reply.length}}条回复
					.dis-content__actions.clearfix(:class="{bordered: comment.expand}")
						p.fl {{comment.create_time}}
						p.dis-content__right.fr
							span.icon-comment(@click="replyUser(comment)")
							span(:class="[comment.praise_state?'icon-good_active':'icon-good']" @click="giveLike(comment)")
							span.dis-content__num {{comment.praise_count}}
					section(v-for="reply in comment.reply" v-if="comment.expand")
						img(:src="reply.picture")
						.dis-content
							.dis-content__bar {{reply.user_name}}
								span.icon-right-rect
								|{{reply.to_user_name}}
							.dis-content__detail
								p {{reply.content}}
							.dis-content__actions.clearfix
								p.fl {{reply.create_time}}
								p.dis-content__right.fr
									span.icon-comment(@click="replyUser(reply)")
									span(:class="[reply.praise_state?'icon-good_active':'icon-good']" @click="giveLike(reply)")
									span.dis-content__num {{reply.praise_count}}
					a.btn-closed(v-show="comment.expand" @click="toggleRestComment(comment)") 收起
						.icon.icon-retract
		message-textarea(
			ref="message"
			:placeholder="placeholder"
			@send="sendComment"
			@close="initState"
		)
</template>
<style lang="stylus" scoped>
.course-discuss
	margin 0 0.3rem
	height 100%
.icon-right-rect
	margin 0.05rem 0.1rem
.icon-good_active
	margin-left 0.5rem
.btn-closed
	color #999
	font-size 12px
	line-height 1
	.icon
		margin-left 0.1rem
section
	padding 0.3rem 0.3rem 0.2rem
	overflow hidden
	border-bottom 1px solid #e9eef0
	>img
		float left
		width 0.74rem
		height 0.74rem
		border-radius 50%
		border 1px solid #CCC
	section
		padding 0.3rem 0
		border none
		>img
			width 0.4rem
			height 0.4rem
		.dis-content__actions
			border-bottom 1px solid #e9eef0
	.dis-content
		padding-left 0.17rem
		font-size 14px
		overflow hidden
		.dis-content__bar
			padding-top 0.1rem
			margin-bottom 0.25rem
			color #333
		.dis-content__detail
			margin-bottom 0.4rem
			line-height 0.45rem
			color #999
			a
				display inline-block
				margin-top 0.08rem
				color #3496e1
		.dis-content__actions
			color #999
			font-size 12px
			padding-bottom 0.2rem
			&.bordered
				border-bottom 1px solid #e9eef0
			.dis-content__right
				height 100%
				span
					display inline-block
					&.icon-good
						margin-left 0.5rem
					&.dis-content__num
						margin-top 0.03rem
						margin-left 0.2rem
</style>
