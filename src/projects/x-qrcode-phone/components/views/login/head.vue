<script>
export default {
	props: {
		text: {
			type:String,
			required: true
		},
		needBack: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		back() {
			this.$router.push({path: '/login'})
		}
	}
}
</script>
<template lang="pug">
.default-header.f16 {{text}}
	.icon.icon-back(@click="back" v-show="needBack")
</template>
<style lang="stylus">
.default-header
	position fixed
	top 0
	width 100%
	height 0.88rem
	line-height 0.88rem
	text-align center
	padding 0 0.2rem
	box-sizing border-box
	color #fff
	background-color #3496e1
	box-shadow 0 2px 3px rgba(0,0,0,.1)
	z-index 199
	.icon
		position absolute
		left 0.3rem
		margin-top 0.26rem
</style>
