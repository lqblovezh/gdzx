<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
import { mapState } from 'vuex'

export default {
  props: ['navList'],
  mounted() {
    this.$nextTick(() => {
      this.initSwiper()
    })
  },
  methods: {
    initSwiper() {
      let bannerSwiper = new Swiper(this.$refs.banner, {
        autoplay: true, //可选选项，自动滑动,
        initialSlide: 0,
        loop: false,
        disableOnInteraction: true,
        // centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左。
        // slidesPerView: 'auto',
        // spaceBetween: 30,
        pagination: {
          el: '.nav-swiper-pagination',
        },
      })
    },
  },
}
</script>

<template lang="pug">
.home-nav  
  .menu-wrap
    .content 
      .right
        .swiper-container.ib(ref="banner")
          .swiper-wrapper
            .swiper-slide(  v-for="item,index in navList" :key="index")
              a(target="_blank" :href="item.src")
                .img.vm-all.tc
                  img.cp(:src="item.img")
          .swiper-pagination.nav-swiper-pagination
</template>

<style lang="stylus">
.home-nav
  >.menu-wrap
    height 360px
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
                line-height 360px
                img
                  width 100%
                  height 360px
                  object-fit cover
          .swiper-pagination
            width 100%
            >span
              margin 0 4px
        >.qr
          margin-top 50px
</style>
