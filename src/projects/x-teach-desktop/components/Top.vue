<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { addFavicon } from 'projects/common/util'

export default {
  data() {
    return {
      topName: '',
      topLog: '',
      Isimg: false,
      scrollTop: 0,
      currentIndex: 0,
    }
  },
  props: {
    search: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: '#fff',
    },
    cname: {
      default: '', // ['blue']
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  computed: {
    ...mapState({
      user: state => state.user,
      totalMessageNum: state => state.userCenter.totalMessageNum,
      cart: state => state.cart,
      bottom: state => state.home.bottom,
    }),
    ...mapGetters(['cartList']),
    wrapStyl() {
      return {
        backgroundColor: this.bgColor,
      }
    },
  },
  methods: {
    go(path) {
      this.$go(path)
    },
    openLoginDialog(e) {
      let isRegister = e.target.className.indexOf('register') > 0
      if (isRegister) {
        this.$openRegister()
        return
      }
      this.$openLogin()
    },
    openRegisterDialog() {
      this.$openRegister()
    },
    goMsg() {
      if (this.$isUser()) {
        this.$go('/user/message/answer')
      }
    },
    logout() {
      this.$service.signin.loginOut().then(res => {
        this.$loginOut()
      })
    },
    sign() {
      this.$service.message
        .sign()
        .then(_ => this.$message.success('签到成功'))
        .catch(({ message }) => this.$message.error(message))
    },
    logtitleGet() {
      //获取log和title
      this.$service.home
        .getConfig()
        .then(res => {
          addFavicon(res.data.application.icon_absolute)
          this.topName = res.data.application.name
          this.topLog = res.data.application.logo_absolute
          this.Isimg = true
          this.SET_APPLICATION(res.data.application)
        })
        .catch(err => {})
    },
    handleScroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
    },
    mouseOver(index) {
      this.currentIndex = index
    },
    mouseLeave() {
      this.currentIndex = 0
    },
    imgError() {
      this.user.picture_absolute = require('@/common/css/img/avatar.png')
    },
    ...mapMutations(['SET_APPLICATION']),
  },
  created() {
    this.logtitleGet()
  },
}
</script>

<template lang="pug">
.comp-top(:class='[cname]')
  .wrap(:class='{fadeIn:scrollTop>60}')
    .content.cbox
      .left.fl.cp.vm-all(@click="$go('/home')" :style="`backgroundImage:url(${topLog})`")
      //- .search.ib(v-if="search")
      //-   .vertical-center
      //-     HomeSearch
      .center.fl
        TopNav
      .right.fr
        .block(v-if="!user")
          .icon.icon-avatar( @click="openLoginDialog" )
          .txt( @click="openLoginDialog")
            .ib.login 登录
            .ib.register 注册
        .block(v-else)
          el-popover(
            placement="top"
            trigger="hover"
            popper-class="personal"
            content=""
          )
            .download-panel
              .user-center
                .block(@click="$go('/user/course')" @mouseover="mouseOver(1)" @mouseleave="mouseLeave")
                  .icon.icon-center(:class="{'icon-center-white':currentIndex==1}")
                  span 个人中心
                .block(@click="$go('/cart')" @mouseover="mouseOver(2)" @mouseleave="mouseLeave")
                  .icon.icon-cart(:class="{'icon-cart-white':currentIndex==2}")
                    .tip(v-if="cartList.length") {{cartList.length}}
                  span 购物车
                .block(@click="sign()" @mouseover="mouseOver(3)" @mouseleave="mouseLeave")
                  .icon.icon-sign(:class="{'icon-sign-white':currentIndex==3}")
                  span 签到
                .block( @click="goMsg()" @mouseover="mouseOver(4)" @mouseleave="mouseLeave")
                  .icon.icon-alert(:class="{'icon-alert-white':currentIndex==4}")
                    .tip.lh6(v-if="totalMessageNum > 9") ...
                    .tip(v-if="totalMessageNum && totalMessageNum < 10") {{totalMessageNum}}
                  span 消息
                .block( @click="logout()" @mouseover="mouseOver(5)" @mouseleave="mouseLeave")
                  .icon.icon-exit(:class="{'icon-exit-white':currentIndex==5}")
                  span 退出
            .btn(slot="reference")
              img.avatar(
                @click="$go('/user/course')"
                :src="user.picture_absolute"
                @error="imgError"
              )
              .name.ellipsis {{user.nick_name}}
              .icon.icon-opens
        .block
          el-popover(
            placement="top"
            trigger="hover"
            content=""
          )
            .download-panel(v-if="bottom&&bottom.bannerCode")
              APPqrcode(:data="bottom&&bottom.bannerCode&&bottom.bannerCode[0]")
            .btn(slot="reference")
              .icon.icon-phone
              .txt APP下载
</template>

<style lang="stylus" scoped>
@keyframes fadeInTop
  from
    -webkit-transform translateY(-200px)
    transform translateY(-200px)
  to
    -webkit-transform translateY(0)
    transform translateY(0)
.lh6
  line-height 6px
.comp-top
  height 60px
  z-index 100
  top 0
  width 100%
  &.opacity
    position absolute
    .wrap
      background-color rgba(0, 0, 0, 0.7)
  .wrap
    &.fadeIn
      position fixed
      top 0
      left 0
      right 0
      z-index 99
      box-shadow 0 -2px 10px #888
      animation fadeInTop 0.5s
      opacity 1
  .wrap
    background-color rgba(4, 136, 191, 0.7)
    .content
      height 60px
      line-height 60px
      .left
        width 150px
        height 80%
        position relative
        top 10%
        background-position center
        background-repeat no-repeat
        background-size contain
        >.txt
          color #309fc3
          padding-left 20px
          font-weight 600
      >.search
        position relative
        height 100%
        margin-left 57px
      .right
        height 100%
        .block
          display inline-block
          height 100%
          cursor pointer
          text-align left
          position relative
          vertical-align top
          margin-left 28px
          &:first-child
            margin 0
          // .txt 垂直居中之谜, 因为icon没有文字内容, 撑开了baseline
          // https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/
          .icon
            vertical-align middle
            position relative
            background-size contain
            >.tip
              top -10px
              right -5px
          .avatar
            width 32px
            height 32px
            vertical-align middle
          .txt
            display inline-block
            font-size 14px
            margin-left 10px
            color #fff
            height 100%
            >.login
              &::after
                content '|'
                margin-left 10px
                margin-right 10px
          .name
            font-size 14px
            color #ffffff
            display inline-block
            margin-left 10px
            margin-right 8px
            max-width 80px
            vertical-align: middle;
      .center
        margin-left 50px
.user-center
  color #666
  font-size 14px
  .block
    padding 0 20px
    height 44px
    line-height @height
    cursor pointer
    &:hover
      background #309fc3
    .icon
      margin-right 10px
</style>
