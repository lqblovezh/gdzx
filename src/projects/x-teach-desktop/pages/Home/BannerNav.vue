<script>
import HomeMenu from './HomeMenu'
import Swiper from 'swiper/dist/js/swiper.min.js'
import { mapState } from 'vuex'

export default {
  components: { HomeMenu },
  mounted() {
    this.initSwiper()
  },
  data() {
    return {
      navList: [],
    }
  },
  computed: {
    ...mapState({
      bannerList: state => state.home.bannerList,
      bottom: state => state.home.bottom,
    }),
  },
  methods: {
    initSwiper() {
      // 如果是loop 情况下, 虚拟的swiper  @click事件 不会存在
      // 离开页面,组件内的节点会全部消失, 因此不用考虑注销事件, 假如在app上绑定事件, 就需要注销事件绑定
      // this.$refs.homeSwiper.removeEventListener('click', this.go)
      // 尽量使用$refs, queryselector 查询似乎有延迟, 无法在beforeDestory 获取节点
      // this.$refs.homeSwiper.addEventListener('click', this.go)
    },
  },
}
</script>

<template lang="pug">
.home-nav
  .menu-wrap
    .content
      //- .left
      //-   HomeMenu
      .right
        .swiper-container.ib#nav-swiper
          .swiper-wrapper
            .swiper-slide(  v-for="item,index in bannerList" :key="index")
              a(target="_blank" :href="item.src")
                .img.vm-all.tc
                  img.cp(:src="item.img")
          .swiper-pagination.nav-swiper-pagination
</template>

<style lang="stylus">
.home-nav
  // margin-top -60px
  >.menu-wrap
    height 420px
    // background-color #41cce0
    >.content
      width 100%
      height 100%
      margin 0 auto
      position relative
      >.left
        display inline-block
        height 100%
        width 220px
        // background #123456
      >.right
        position relative
        display inline-block
        width 100%
        vertical-align top
        height 100%
        >.swiper-container
          width 100%
          height 100%
          font-size 0
          .swiper-pagination
            .swiper-pagination-bullet
              background #ffffff
              opacity 0.5
            .swiper-pagination-bullet-active
              background #ffffff
              opacity 1
          >.swiper-wrapper
            >.swiper-slide
              width 100%
              .img
                line-height 420px
                img
                  width 100%
                  height 420px
                  object-fit cover
          .swiper-pagination
            width 100%
            >span
              margin 0 4px
        >.qr
          margin-top 50px
</style>
