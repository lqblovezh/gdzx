<script>
import Head from '@/components/common/head'
import loading from '@/mixins/loading'
import LiveItem from './LiveItem'
export default {
	mixins: [loading],
	data () {
		return {
			list: [],
			page: {
				pageStart: 0,
				pageOffset: 20
			},
			pullup: false,
			isLoaded: false
		}
	},
	components: { Head, LiveItem },
	mounted () {
		this.getList().then(() => {
			this.TOGGLE_LOADING(false)
		})
	},
	methods: {
		async getList () {
			if (this.isLoaded) {
				return
			}
			try {
				const res = await this.$service.lives.getList(this.page)
				if (res.data) {
					this.list = [...this.list, ...res.data]
					this.page.pageStart = this.list.length
					this.isLoaded = this.list.length === res.page.total
				} else {
					throw new Error('返回数据格式不正确!')
				}
			} catch(e) {
				console.error(`[live getList] ${e.toString()}`)
			}
		}
	}
}
</script>

<template lang="pug">
div
	Head(type="search")
		p(slot="center") 直播教学
	//- ui-scroll(class="scroll-wrapper" :data="list" :pullup="pullup" @pullup="getList")
		.live-wrapper
			LiveItem(v-for="(i, index) in list" :item="i" :key="index")
</template>

<style lang="stylus" scoped>
.live-wrapper
	padding 0.5rem 0.3rem 0
	display flex
	justify-content space-between
	flex-wrap wrap
</style>
