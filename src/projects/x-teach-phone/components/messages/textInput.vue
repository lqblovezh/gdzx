<script>
export default {
	props: ['myProps'],
	data () {
		return {
			isShowTextField: false,
			word: '',
		}
	},
	methods: {
		showTextField () {
			this.isShowTextField = true
			this.$nextTick(() => {
				this.$refs.myInput.focus()
			})
		},
		hideTextField (evt) {
			// let isTrue = typeof evt == 'symbol' || (evt.target.classList.contains('layer')||evt.target.classList.contains('icon-close'))
			if (isTrue) {
				this.isShowTextField = false
				this.word = ''
				this.myProps && this.myProps.init && this.myProps.init()
			}
		},
		send () {
			this.$emit('sendMethod', this.word)
			this.hideTextField(Symbol('close'))
		}
	}
}
</script>
<template lang="pug">
.full-layer__fixed(v-if="isShowTextField" @click="hideTextField($event)")
	.fixed-bottom.ui-textarea.c-bg-f
		.ui-textarea__body
			p.text-right
				span.icon-close(@click="hideTextField($event)")
			textarea(ref="myInput" v-model="word" :placeholder="(myProps && myProps.placeholder)||'发表评论'" rows="5")
		.ui-textarea__bottom.flex.flex-sb
			button
				span.icon-img
			a(@click="send") 发布
</template>
<style lang="stylus" scoped>
.ui-textarea__body
	textarea
		height 2.65rem
</style>
