<script>
const COMPONENT_NAME = 'ui-dialog'
export default {
	name: COMPONENT_NAME,
	data () {
		return {
			message: '',
			status: false,
			promiseStatus: null,
			timer: null, // 定时器
			updateTimeTimer: null, // 用于更新message的定时器
		}
	},
	methods: {
		toggleStatus(status) {
			this.status = status
		},
		showDialog({
			duration = 0,
			...myPromise
		}) {
			if (duration > 0) {
				this.timer = setTimeout(() => {
					this.comfirmDialog()
				}, duration)
				this.message.match(/\d{1,}/g) && this.updateTime(duration)
			}
			this.promiseStatus = myPromise
			this.toggleStatus(true)
		},
		updateTime (duration) {
			this.updateTimeTimer = setTimeout(() => {
				duration -= 1000
				this.message = this.message.replace(/\d{1,}/g, duration/1000)
				duration > 0 && this.updateTime(duration)
			}, 1000)
		},
		hideDialog() {
			this.clearTimer()
			this.toggleStatus(false)
		},
		comfirmDialog () {
			this.hideDialog()
			this.promiseStatus && this.promiseStatus.resolve()
		},
		closeDialog() {
			this.hideDialog()
			this.promiseStatus && this.promiseStatus.reject()
		},
		clearTimer () {
			if (this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}
			if (this.updateTimeTimer) {
				clearTimeout(this.updateTimeTimer)
				this.updateTimeTimer = null
			}
		}
	}
}
</script>
<template lang="pug">
.ui-mask(v-if="status" @click="closeDialog")
	.ui-dialog(@click.stop="")
		.ui-dialog-title
			.icon-close_d(@click="closeDialog")
		.ui-dialog-body
			p {{ message }}
		.ui-dialog-foot
			button(@click="closeDialog") 取消
			button.btn-primary(@click="comfirmDialog") 确定
</template>
<style lang="stylus">
.ui-mask
	position fixed
	top 0
	left 0
	right 0
	bottom 0
	background-color rgba(0, 0, 0, .3)
	color #000
	z-index 100
	.ui-dialog
		width 400px
		position absolute
		left 50%
		top 50%
		transform translate(-50%, -50%)
		background-color #fff
		border-radius 5px
		padding 10px 15px
		&-title
			text-align right
			.icon-close_d
				background-size cover
				display inline-block
				cursor pointer
		&-body
			padding 10px 0
		&-foot
			text-align right
			button
				background-color transparent
				padding 0.75em 1.5em
				border 1px solid #DDD
				border-radius 3px
				cursor pointer
				&:not(:last-child)
					margin-right 10px
				&.btn-primary
					color #FFF
					background-color #3496e1
</style>
