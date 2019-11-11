<script>
import Star from '@/components/common/star'
export default {
	data () {
		return {
			list: null
		}
	},
	components: {
		Star,
	},
	methods: {
		fetch () {
			const {userId} = this.$route.query
			this.$service.lives.getList({
				teacher_id: userId
			}).then(res => {
				this.list = res.data
			})
		}
	},
}
</script>
<template lang="pug">
.rec
	p.course-tips.container(v-show="!list || list.length == 0") 暂无数据
	a.rec-item(v-for="i in list" :href="i.url")
		img(:src="i.img")
		.rec-item__info
			.rec-item__info-name {{i.title}}
			.rec-item__info-intro {{i.introduce}}
</template>
<style lang="stylus">
.rec
  display flex
  flex-wrap wrap
.rec-item
  display block
  width 50%
  padding-left 0.3rem
  box-sizing border-box
  img
    width 3.3rem
    height 2.06rem
    border-radius 5px
    box-shadow 0 3px 3px rgba(0,0,0,.2)
  .rec-item__info
    padding 0.2rem 0
    color #666
    font-size 12px
  .rec-item__info-name
    color #444
    font-size 14px
  .rec-item__info-intro
    margin-top 0.1rem
    margin-bottom 0.2rem
  .rec-item__info-score
    span
      display inline-block
      padding-top 0.13rem
  .rec-item__info-price
    font-size 0.13rem
    color #666
    span
      font-size 0.15rem
      color #ff5d16
</style>
