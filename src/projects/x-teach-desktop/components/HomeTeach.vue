<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      navList: [],
    }
  },
  computed: {
    ...mapState({
      commendTeacher: state => state.home.commendTeacher,
    }),
  },
  created() {
    this.initSwiper()
  },
  methods: {
    initSwiper() {
      this.$nextTick(() => {
        this.likeSwiper = new Swiper(this.$refs.swiperContainer, {
          slidesPerView: 3, // 设置slider容器能够同时显示的slides数量
          spaceBetween: 175,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      })
    },
  },
}
</script>

<template lang="pug">
.home-teacher.icon-js_bg
  .menu-wrap
    .title 让你能够学到中国知名高校的课程
    .content
      .swiper-container(ref="swiperContainer")
        .swiper-wrapper
          .swiper-slide(v-for="item,index in commendTeacher" :key="index")
            .img.vm-all.ib
              img(:src="item.img")
            .name.f18 {{item.name}}
            .college.f14 {{item.college}} {{item.positional}}
            .abs.f14.ellipsis-5(:title="item.abs") {{item.abs}}
        .swiper-button-next
        .swiper-button-prev
</template>

<style lang="stylus" scoped>
.home-teacher
  >.menu-wrap
    width 1200px
    margin 0px auto
    height 500px
    .title
      font-size 24px
      padding 58px
      text-align center
      color #fff
    >.content
      width 100%
      // height 100%
      margin 0 auto
      position relative
      >.swiper-container
        width 100%
        height 100%
        padding 0 50px
        font-size 0
        box-sizing border-box
        .swiper-button-prev
          background-image url("data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'><path%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F><%2Fsvg>") !important
        .swiper-button-next
          background-image url("data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'><path%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F><%2Fsvg>") !important
        .swiper-pagination
          .swiper-pagination-bullet
            background #ffffff
            opacity 0.5
          .swiper-pagination-bullet-active
            background #ffffff
            opacity 1
        >.swiper-wrapper
          height initial
          >.swiper-slide
            width 283px
            margin-right 175px
            overflow hidden
            color #fff
            text-align center
            font-size 0
            line-height 1
            .img
              width 94px
              height @width
              border-radius 50%
              overflow hidden
              img
                width 100%
                max-height 360px
                object-fit cover
            .name
              margin-top 25px
            .college
              margin-top 16px
            .abs
              margin-top 20px
              text-align left
              height 110px
              overflow hidden
              line-height 1.5em
        .swiper-pagination
          width 100%
          >span
            margin 0 4px
      >.qr
        margin-top 50px
</style>
