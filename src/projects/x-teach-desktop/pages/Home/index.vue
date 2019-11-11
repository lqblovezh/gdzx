<script>
import BannerNav from './BannerNav'
import { mapState } from 'vuex'
import Swiper from 'swiper'
import HomeCoures from './HomeCoures'
import HomeTeacher from './HomeTeacher'
import HomeShop from './HomeShop'
import HomeClassCourse from './HomeClassCourse'

// import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  components: { BannerNav, HomeCoures, HomeTeacher, HomeShop, HomeClassCourse },
  asyncData({ store, route }) {
    return store.dispatch('home/getData')
  },
  created() {},
  async mounted() {
    try {
      await this.dataPromise
    } catch (error) {
      console.error(error)
      console.warn('home page  mounted this.dataPromise 出错了')
    }
    setTimeout(() => {
      console.log('jklfd========')
      let bannerSwiper = new Swiper('#nav-swiper', {
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
      this.likeSwiper = new Swiper('#home-box-like', {
        slidesPerView: 5, //// 设置slider容器能够同时显示的slides数量
        spaceBetween: 30,
      })
      this.teacherSwiper = new Swiper('#home-box-teacher', {
        slidesPerView: 5, //// 设置slider容器能够同时显示的slides数量
        spaceBetween: 30,
      })
      this.courseSwiper = new Swiper('#home-box-course', {
        slidesPerView: 2, //一行显示2个
        slidesPerColumn: 2, //显示2行
        spaceBetween: 30,
      })
      // this.liveSwiper = new Swiper('#home-box-live', {
      //   slidesPerView: 5, //// 设置slider容器能够同时显示的slides数量
      //   spaceBetween: 30,
      // })
      this.isSwiperReady = true
    }, 0)
  },
  data() {
    return {
      isSwiperReady: false,
    }
  },
  methods: {
    go(path, item) {
      this.$go(path, { id: item.course_id })
    },
    leftChlickHandler(type) {
      let swiper = this[type + 'Swiper']
      let next = 4
      if (type === 'course') {
        next = 1
      }
      swiper.activeIndex
      swiper.slideTo(swiper.activeIndex - next, 250 * next, false)
      console.log(type)
    },
    rightChlickHandler(type) {
      let swiper = this[type + 'Swiper']
      let next = 4
      if (type === 'course') {
        next = 1
      }
      swiper.activeIndex
      swiper.slideTo(swiper.activeIndex + next, 250 * next, false)
      console.log(type)
    },
    componentName(item) {
      let cmp = ''
      switch (item.type) {
        case 'course':
          cmp = 'HomeCoures'
          break
        case 'teacher':
          cmp = 'HomeTeacher'
          break
        case 'class_course':
          cmp = 'HomeClassCourse'
          break
        case 'shop':
          cmp = 'HomeShop'
          break
        default:
          cmp = 'HomeCoures'
          break
      }
      return cmp
    },
  },
  computed: {
    ...mapState({
      likeList: state => state.home.likeList,
      commendTeacher: state => state.home.commendTeacher,
      advertisementList: state => state.home.advertisementList,
      advertisementListSide: state => state.home.advertisementListSide,
      columnList: state => state.home.columnList,
    }),
  },
}
</script>

<template lang="pug">
  .teach-home
    Top(:search="false" cname="opacity")
    VScrollTop
    BannerNav
    .ad-side-my
      .left(v-if="advertisementListSide[0]")
        AdvertisingSide(
            :url="advertisementListSide[0].src"
            :imgUrl="advertisementListSide[0].img"
          )
      .right(v-if="advertisementListSide[1]")
        AdvertisingSide(
            :url="advertisementListSide[1].src"
            :imgUrl="advertisementListSide[1].img"
          )
    .other-list(:class="{vis:isSwiperReady}")
      .section()
        HomeBox(
          @leftChlickHandler="leftChlickHandler('like')"
          @rightChlickHandler="rightChlickHandler('like')"
          v-if="likeList.length" title="推荐课程" url="/category")
          #home-box-like.swiper-container
            .swiper-wrapper
              .item.swiper-slide(
                v-for="item in likeList"
                @click="go('/course/detail' , item)"
                :key="item.id"
              )
                HomeCard(
                  type="simple"
                  :imgUrl="item.img"
                  :name="item.course_name"
                  :time="item.create_time"
                  :des="item.teacher_user+' | '+item.university_name"
                  :isStar="false"
                  :studied="item.study_count"
                )
      .adv(v-if="advertisementList[0]")
        Advertising(
          :imgUrl="advertisementList[0].img"
          :url="advertisementList[0].src"
        )
      .section(v-for="items,index in columnList" :key="items.name")
        component(
          :is="componentName(items)"
          :items="items"
          @leftChlickHandler="leftChlickHandler"
          @rightChlickHandler="rightChlickHandler"
        )
        .adv(v-if="advertisementList[index+1]")
          Advertising(
            :imgUrl="advertisementList[index+1].img"
            :url="advertisementList[index+1].src"
          )
    footer
      HomeTeach(v-if="commendTeacher.length")
      MainFooter
</template>

<style lang="stylus">
@media screen and (max-width: 1800px)
  .teach-home
    >.ad-side-my
      display none
.teach-home
  >.ad-side-my
    >.left, >.right
      position fixed
      z-index 10
      top 350px
    >.left
      left 32px
    >.right
      right 32px
  >.other-list
    width 1200px
    margin 0px auto
    margin-top 30px
    visibility hidden
    &.vis
      visibility visible
    >.section
      // margin 30px 0
      .swiper-container
        >.swiper-wrapper
          >.swiper-slide
            cursor pointer
      .card-container
        text-align left
  footer
    margin-top 50px
</style>
