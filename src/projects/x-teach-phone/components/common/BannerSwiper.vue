<script>
import { mapState } from 'vuex'
import Swiper from 'swiper/dist/js/swiper.min.js'
import open from 'projects/common/util/windowOpen'
export default {
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted() {
    // 如果是loop 情况下, 虚拟的swiper不会拥有animeclass
    setTimeout(() => (this.anime = true), 300)
  },
  data() {
    return {
      anime: false,
    }
  },
  watch: {
    banners(newVal) {
      if (newVal.length > 0) {
        this.initSwiper()
      }
    }
  },
  methods: {
    initSwiper() {
      new Swiper('.swiper-container', {
        autoplay: true, //可选选项，自动滑动,
        initialSlide: 0,
        loop: true,
        disableOnInteraction: true,
        centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左。
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        pagination: {
          el: '.xt-swiper-pagination',
        },
      })
      // 如果是loop 情况下, 虚拟的swiper  @click事件 不会存在
      // 离开页面,组件内的节点会全部消失, 因此不用考虑注销事件, 假如在app上绑定事件, 就需要注销事件绑定
      // this.$refs.homeSwiper.removeEventListener('click', this.go)
      // 尽量使用$refs, queryselector 查询似乎有延迟, 无法在beforeDestory 获取节点
    },
    goToOther(url) {
      open(url)
    }
  },
}
</script>
<template lang="pug">
#homeSwiper.swiper-container.c-bg-f(ref="homeSwiper")
  .swiper-wrapper
    .swiper-slide( v-for="item in banners"  :key="item.id"   )
      img( @click="goToOther(item.src)"  :src="item.img" :class="{anime}")
  .xt-swiper-pagination.swiper-pagination
</template>
<style lang="stylus" scoped>
#homeSwiper
  padding 0.3rem 0 0.4rem
.swiper-slide-duplicate > img // 虚拟的swiper的高度
  transition transform 0.3s linear
.swiper-container
  overflow hidden
.swiper-slide
  max-height 2.82rem
  // background-color rgba(0, 0, 0, 0.3)
  padding 0 0.25rem
  background-size cover
  background-position center
  background-repeat no-repeat
  box-sizing border-box
  >img
    width 100%
    height 2.82rem
    border-radius 8px
    box-shadow 2px 5px 15px rgba(6, 91, 164, 0.28)
    &.anime
      transition transform 0.3s linear
.swiper-pagination
  left 0
  right 0
  bottom -0.14rem
.swiper-slide
  a
    display block
    width 100%
    height 100%
    background-color transparent
</style>
