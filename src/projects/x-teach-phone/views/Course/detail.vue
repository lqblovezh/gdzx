<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Score from '@/components/common/star/score'
import Step from './comp/step'
import Intro from './comp/teacher'
import CourseIntro from './comp/CourseIntro'
import CourseBaseInfo from './comp/CourseBaseInfo'
import CourseFooter from './comp/CourseFooter'
import { getCurResource } from '@/utils/algorithm'
import { throttle } from '@/utils'

const IMG_MAX_HEIGHT = 1

export default {
  mixins: [],
  data() {
    return {
      styleObj: {},
      title: '',
      cordova: window && window.cordova,
      cur: 'intro', // 动态组件名称
      isFast: this.$route.query.isFast,
      popupVisible: false,
    }
  },
  components: {
    Score,
    Step,
    Intro,
    CourseFooter,
    CourseBaseInfo,
    CourseIntro,
  },
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapState('course', ['info']),
    isBuy() {
      return (
        this.info &&
        (this.info.user_speed_buy_status || Number(this.info.price) == 0)
      )
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scroll.addEventListener('scroll', this.onScroll)
      this.styleObj = {
        backgroundColor: '#3496e1',
        // boxShadow: '0px 2px 2px rgba(0,0,0,.2)',
        transition: 'all .3s ease',
      }
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.scrollToTop()
    next()
  },
  beforeDestroy() {
    this.$refs.scroll.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    ...mapMutations('common', ['setOrderInfo']),
    ...mapMutations('course', ['SET_COURSE_INFO', 'SET_RESOURCE']),
    goToTA() {
      this.$router.push({
        path: 'teacherAnswer',
        query: { teacher_id: this.courseInfo.teach_user.id },
      })
    },
    createOrder() {
      if (!this.userInfo) {
        this.$router.push({ name: 'login' })
      } else {
        let good = [{ course_info: { ...this.info }, id: 0 }]
        window.sessionStorage.setItem('cart', JSON.stringify(good))
        this.setOrderInfo(good)
        this.$goByName('order', {})
      }
    },
    addToShopCar() {
      this.$service.cart
        .add({
          ids: [this.info.id],
        })
        .then(res => {
          this.$Toast({
            message: '已添加到购物车',
            iconClass: 'icon-toast icon-success',
          })
        })
        .catch(this.$catchError)
    },
    openScoreDialog() {
      this.$refs.myScore.showScoreLayer()
    },
    async modifyScore() {
      const res = await this.$service.course.getScore({
        course_id: this.info.id,
      })
      console.log(res)
      console.log('res')
      //this.info.score = res.data
      this.$set(this.info, 'score', res.data)
    },
    scrollToTop() {
      this.$refs.scroll.scrollTop = 0
    },
    onScroll: throttle(
      function(evt) {
        const target = evt.target || evt.srcElement
        let scrollTop = target.scrollTop
        let fontSize = window.getComputedStyle(
          document.documentElement || document.body
        ).fontSize
        // if (scrollTop > parseFloat(fontSize) * IMG_MAX_HEIGHT) {
        //   this.styleObj = {
        //     backgroundColor: "#3496e1",
        //     boxShadow: "0px 2px 2px rgba(0,0,0,.2)",
        //     transition: 'all .3s ease'
        //   }
        //   this.title = this.info.course_name
        // } else {
        //   this.title = ''
        //   this.styleObj = {}
        // }
      },
      100,
      300
    ),
    shareClick() {
      this.popupVisible = true
    },
    thirdShare(type) {
      const { img_src: img, name: title, abs: desc } = this.info
      this.$thirdShare(
        {
          type,
          title,
          desc,
          img,
          url: restUrl + '/h5/index' + location.hash,
        },
        res => {
          this.$Toast({
            message: res + '分享成功',
          })
          this.popupVisible = false
        }
      )
    },
  },
}
</script>
<template lang="pug">
div
  mt-popup.share-popup(
    v-model="popupVisible"
    position="bottom"
  )
    p.tit 分享
    ul.icon-share
      li.icon.i-share-pengyou(@click="thirdShare('pengyou')")
      li.icon.i-share-weixin(@click="thirdShare('weixin')")
      li.icon.i-share-qzone(@click="thirdShare('qzone')")
      li.icon.i-share-qq(@click="thirdShare('qq')")
      //- li.icon.i-share-xinlang(@click="thirdShare('xinlang')")
  //- v-wrapper(:main-type="2" :title="info.course_name" :header-style="styleObj" is-trans class="course")
  v-wrapper(:main-type="2" title="课程详情" :header-style="styleObj" class="course")
    template(#right v-if="cordova")
      .header-icon
        .i-share(@click="shareClick")
    course-footer(
      :which-type="userInfo && isBuy"
      @addToShopCar="addToShopCar"
      @createOrder="createOrder"
    )
    .course-container(ref="scroll")
      course-base-info(:info="info" :status="userInfo && isBuy" @score="openScoreDialog")
      .course-content.c-bg-f
        mt-navbar(v-model="cur")
          mt-tab-item(id="intro") 课程介绍
          mt-tab-item(id="step") 课程目录
          mt-tab-item(id="teacher_intro") 授课教师
        mt-tab-container(v-model="cur")
          mt-tab-container-item(id="intro")
            course-intro(:abs="info.abs")
          mt-tab-container-item(id="step")
            step(:tab-info="info.course_period_list" :is-buy="isBuy")
          mt-tab-container-item(id="teacher_intro")
            intro(:teach-user="info.teach_user" :course-relev="info.course_relev")
      Score(ref="myScore" @modifyScore="modifyScore")
</template>
<style lang="stylus" scoped>
@import '~@/assets/css/mixin.styl'

.share-popup
  width 100%
  border-top-left-radius 0.6rem
  border-top-right-radius 0.6rem
  .tit
    font-size 0.34rem
    color #666666
    padding 0.56rem 0.43rem 0.68rem
    border 1px solid rgba(0, 0, 0, 0.15)
  .icon-share
    width 100%
    padding 0.75rem 0
    .icon
      width 20%
      text-align center
      display inline-block
.course
  position relative
  padding-bottom 1rem
  box-sizing border-box
  >>> header
    position fixed
    width 100%
    top 0
    left 0
    z-index 10
    background-color transparent
  .header-icon
    .i-share
      margin-top 0.085rem
  &-container
    height 100%
    overflow auto
    -webkit-overflow-scrolling touch
  &-head
    position absolute
    width 100%
    left 0
    top 0
    height 0.88rem
    padding 0 0.2rem
    box-sizing border-box
    background-color transparent
    z-index 100
    .icon-back
      margin-top 0.26rem
      float left
    .icon-share
      margin-top 0.2rem
      float right
  &-content
    >>> .mint-navbar
      border-1px(bottom, #f0f0f0)
      .mint-tab-item
        margin 0
        &-label
          font-size 14px
  .intro
    font-size 13px
    line-height 0.45rem
    letter-spacing 1px
</style>
