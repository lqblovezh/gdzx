<script>
import { mapState, mapGetters } from 'vuex'
import BannerSwiper from '@/components/common/BannerSwiper'
import Teacher from '@/components/common/tpl/teacher'
import SlidePanel from '@/components/SlidePanel'
import HomeTeacherPanel from './children/HomeTeacherPanel'
import HomeSpecCourse from '@/components/HomeSpecCourse'
import HomeStudyCourse from '@/components/HomeStudyCourse'
import HomeShopPanel from '@/components/HomeShopPanel'
import Star from '@/components/common/star'
export default {
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('common/getInitialState')
  },
  components: {
    BannerSwiper,
    Teacher,
    Star,
    SlidePanel,
    HomeSpecCourse,
    HomeTeacherPanel,
    HomeStudyCourse,
    HomeShopPanel,
  },
  data() {
    return {
      isShowGuessLike: true,
    }
  },
  computed: {
    ...mapState('common', ['banners', 'daily_course']),
    ...mapGetters('common', [
      'spec_course',
      'teacher_list',
      'classic_course',
      'shop',
    ]),
  },
  methods: {
    close() {
      this.isShowGuessLike = false
    },
  },
}
</script>

<template lang="pug">
	.full-bottom
		.home.view-scroll-y
			.top
				.main
					.search
						p.search-bar(@click="$go('search')")
							span.icon-search__home
							//- |搜索课程
						.home-text
							span 首页
						.i-bell(@click="$push('messages')")
					.swiper
						BannerSwiper(:banners="banners")
				.button-items
					.item(@click="$go('category')")
						.icon
							.i-course
						.name 课程
					.item(@click="$go('school')")
						.icon
							.i-college
						.name 院校
					.item(@click="$go('market')")
						.icon
							.i-mall
						.name 商城
					.item(@click="$go('AR')")
						.icon
							.i-ar
						.name AR
			slide-panel(
				label="今日课程"
				icon-class="today-course"
				:list="daily_course"
			)
			home-spec-course(:info="spec_course")
			home-teacher-panel(:info="teacher_list")
			home-study-course(:info="classic_course")
			home-shop-panel(:info="shop")
</template>

<style lang="stylus" scoped>
.home
  color #444
  background-color #f5f7fc
  > div
    background-color #fff
    margin-bottom 0.2rem
  .edit-section
    .content
      .section-li
        padding 0 0.3rem
        &:last-child
          .line-single
            display none
        .msg
          display flex
          font-size 0.3rem
          color #555555
          height 0.95rem
          align-items center
          .name
            width 6rem
            margin-left 0.33rem
            height 0.33rem
            line-height 0.33rem
          >img
            height 0.26rem
            width 0.26rem
            vertical-align middle
  .main
    .swiper
      width 100%
      margin-bottom 0.2rem
    .search
      display flex
      padding 0.19rem 0
      background-color #3496e1
      .search-bar
        margin-left 0.2rem
        height 0.5rem
        line-height 0.5rem
        font-size 14px
        color #C2C2C2
        // background-color #FEFEFE
        // border-radius 999px
        .icon-search__home
          margin 0.05rem 0.1rem 0 0.15rem
      .home-text
        flex 1
        color #fff
        font-size 0.38rem
        text-align center
      .i-bell
        margin-left 0.2rem
        margin-right 0.32rem
        margin-top 0.05rem
  .button-items
    display flex
    padding-bottom 0.4rem
    text-align center
    .item
      display inline-block
      flex 1
      .icon
        margin 0 5px
        min-height 1rem
        overflow hidden
      .name
        color #555555
        font-size 14px
        text-align center
        margin-top 0.1rem
      img
        max-width 0.9rem
</style>
