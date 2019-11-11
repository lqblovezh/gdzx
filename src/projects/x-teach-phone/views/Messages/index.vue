<script>
import { mapState } from 'vuex'
import Answer from './children/answer'
import Discuss from './children/discussion'
import Msg from './children/msg'
import PrivateMsg from './children/privateMsg'
export default {
	components: { Answer,Discuss,Msg,PrivateMsg },
	computed: {
		...mapState('user', ['messageInfo']),
		tabs () {
			return [
				{ label: '教师答疑', component: Answer},
				{ label: '学习讨论', component: Discuss},
				{ label: '消息', component: Msg},
				{ label: '私信', component: PrivateMsg}
			]
		},
		msgNum () {
			let obj = {}
			this.messageInfo && this.messageInfo.forEach(item => {
				obj[item.type] = item.total
			})
			return obj
		}
	},
}
</script>

<template lang="pug">
v-wrapper(title="个人消息" class="messages" :main-type="1")
	tabs(:tabs="tabs")
</template>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
@import "~@/assets/css/mixin.styl";
.messages
	position absolute
	left 0
	top 0
	right 0
	bottom 0
	background-color #F0F0F0
	>>> .cube-tab-bar
		background-color $color-white
		border-1px(bottom, #F0F0F0)
		.cube-tab
			padding 0.31rem 0
	>>> .slide-wrapper
		margin-top 0.3rem
		background-color $color-white
</style>
