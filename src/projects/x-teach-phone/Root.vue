<template lang="pug">
#root
  .page-line(v-if="isShowLine")
  keep-alive
    router-view(v-if="this.$route.meta.alive" :class="{'srcoll-ios':isShowLine}")
  //- transition(name="slide-up" mode="in-out")
  transition(:name="transitionName")
    router-view(v-if="!this.$route.meta.alive" :class="{'srcoll-ios':isShowLine}")

  Footer(@click-btn="openQrCodeScan")
  ev-overlay(
    v-model.sync="showBtns"
    :transition="'slide-up'"
  )
    .tc.scan-btns(v-show="showBtns")
      .scan-methods
        .scan-qrcode(@click='openQrCodeScan') 扫二维码
        .ar AR识别
      .cancel(@click="showBtns=false") 取消
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Footer from '@/components/Footer'
import UserAgent from 'projects/common/util/express-useragent'
// import Overlay from '@/components/common/Overlay'
export default {
  components: {
    Footer,
  },
  computed: {
    ...mapState('user', ['userInfo']),
    isShowLine() {
      let { isiPhone } = new UserAgent().parse(navigator.userAgent)
      return isiPhone && window.cordova
    },
  },
  data() {
    return {
      showBtns: false,
      transitionName: '',
    }
  },
  async mounted() {
    // 获取登录状态（刷新时）
    // 已登录就重新存储用户信息
    // 否则跳转到登录页面
    this.queryUserInfo()
      .then(res => {
        this.queryIndexData()
      })
      .catch(e => {
        if (this.$route.meta.auth) {
          this.$go('login')
        }
        this.queryIndexData()
      })
  },
  beforeRouteUpdate(to, from, next) {
    !this.userInfo && to.meta.auth
      ? next({ name: 'login', query: { redirect: from.fullPath } })
      : next()
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    ...mapActions('user', ['queryUserInfo']),
    ...mapActions('common', ['queryIndexData']),
    toggleStatus() {
      this.showBtns = !this.showBtns
    },
    openQrCodeScan() {
      if (window.cordova && cordova.plugins.barcodeScanner) {
        cordova.plugins.barcodeScanner.scan(
          ({ text }) => {
            if (/^http/.test(text) && window.cordova && cordova.InAppBrowser) {
              if (device.platform == 'iOS') {
                cordova.InAppBrowser.open(text, '_blank', {
                  closebuttoncaption: '关闭',
                })
              } else {
                cordova.InAppBrowser.open(text)
              }
            } else {
              if (text) {
                alert(text)
              }
            }
          },
          console.error,
          {
            prompt: '请将取景框对准二维码',
          }
        )
      } else {
        alert('抱歉！您的设备不兼容')
      }
    },
  },
  watch: {
    $route(to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态 20
      if (to.meta.index && from.meta.index) {
        if (to.meta.index > from.meta.index) {
          // 设置动画名称
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      } else {
        this.transitionName = ''
      }
    },
  },
}
</script>
<style lang="stylus">
@import '~@/assets/css/var.styl'
@import '~@/assets/css/mixin.styl'

.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active
  will-change transform
  transition all 500ms
  position absolute
  width 100%
.slide-right-enter
  opacity 0
  transform translateX(-100%)
.slide-right-leave-active
  opacity 0
  transform translateX(100%)
.slide-left-enter
  opacity 0
  transform translateX(100%)
.slide-left-leave-active
  opacity 0
  transform translateX(-100%)
.srcoll-ios
  padding-top 0.6rem
  .school-container
    .header
      top 0.6rem !important
  >.full-top
    >.home
      .school-search
        top 0.6rem
  >.top
    .side-school-list
      padding 0.6rem 0.3rem
  >.div >.root
    top 0.6rem !important
  >.header, >.fixed-top, >.edit-address
    top 0.6rem !important
  >.course, .v-wrapper
    >header
      top 0.6rem !important
    >section
      overflow auto
      -webkit-overflow-scrolling touch
      top 1.48rem !important
  >section
    top 1.48rem !important
.page-line
  position fixed
  top 0
  left 0
  width 100%
  height 0.6rem
  background-color #3496e1
  z-index 99
.scan-btns
  position absolute
  bottom 0.3rem
  padding 0 $layout-padding
  width 100%
  font-size 17px
  box-sizing border-box
  color $text-color-9
  > div
    background-color #fff
    border-radius 0.1rem
    overflow hidden
  .scan-methods
    margin-bottom 0.3rem
    .ar
      color $theme-color
      border-1px(top)
  .scan-methods div, .cancel
    height 0.97rem
    line-height 0.97rem
</style>
