<script>
import '../../assets/css/icon-menu.css'
import GliMenu from 'projects/common/menu'
import GliMenuTop from 'projects/common/menu/Menu'
import GliMenuItem from 'projects/common/menu/MenuItem'

export default {
  components: {
    GliMenu,
    GliMenuTop,
    GliMenuItem,
  },
  data() {
    return {
      isCollapse: false,
    }
  },
  computed: {
    defaultActive() {
      let path = this.$route.path
      if (path == '/') {
        path = '/wms/home'
      } else {
        if (path.split('/').length > 3) {
          let index = path.lastIndexOf('/')
          path = path.substring(0, index)
        }
      }
      return path
    },
    nav() {
      return this.$store.state.authority
    },
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    MenuCollapse() {
      this.isCollapse = !this.isCollapse
      var node = document.querySelector('#content')
      if (this.isCollapse) {
        node.classList.add('mini')
      } else {
        node.classList.remove('mini')
      }
    },
    menuItemClickHandler() {},
    menuFoldHandler() {
      this.MenuCollapse()
    },
    getAuthority(type) {
      return this.nav[type] && this.nav[type].status
    },
  },
}
//:unique-opened="true"  这里还不能改, 因为不是二级路由, 非常别扭
</script>


<template lang="pug">
.menu(v-if="nav" :class="{'collLeft': isCollapse}")
  gli-menu(
    @itemClickHandler="menuItemClickHandler"
    @foldHandler="menuFoldHandler"
    :menuRecreate="false"
    topPx="50px"
    :keepOneOpen="true"
    :default-active="$route.path"
    :router="true"
    :collapse="isCollapse"
    background-color="#333744"
    text-color="#fff"
    active-text-color="#44c3aa")
    GliMenuTop( txt="首页" index="/wms/home" v-if="getAuthority('/wms/home')")
      GliMenuItem(
        iconClass="icon-menu-home"
        txt="首页"
        style="display:none"
        index="/wms/home" v-if="getAuthority('/wms/home')")
    //- GliMenuTop( txt="资源库" v-if="getAuthority('/wms/resource')")
    //- 	GliMenuItem(
    //- 		iconClass="icon-menu-course-library"
    //- 		txt="共享资源"
    //- 		index="/wms/resource")
    GliMenuTop( txt="课程库")
      GliMenuItem(
        iconClass="icon-menu-my-course"
        txt="我的课程"
        index="/wms/course" v-if="getAuthority('/wms/course')")
      GliMenuItem(
        iconClass="icon-menu-resource-library-pub"
        txt="共享课程库"
        index="/wms/pubCourse" v-if="getAuthority('/wms/pubCourse')&&$config.isTeacher")
    GliMenuTop( txt="班级库")
      GliMenuItem(
        iconClass="icon-menu-course-library"
        txt="课程库"
        index="/wms/applyClass" v-if="getAuthority('/wms/applyClass')&&$config.isTeacher")
      GliMenuItem(
        iconClass="icon-menu-class-management"
        txt="班级管理"
        index="/wms/class" v-if="getAuthority('/wms/class')")
      GliMenuItem(
        iconClass="icon-menu-code-audit"
        txt="授权码审核"
        index="/wms/auditClass" v-if="getAuthority('/wms/auditClass')&&!$config.isTeacher")
    GliMenuTop( txt="阅卷" v-if="$config.isTeacher")
      GliMenuItem(
        iconClass="icon-menu-marking"
        txt="阅卷"
        index="/wms/marking" v-if="getAuthority('/wms/marking')")
    GliMenuTop( txt="消息管理")
      GliMenuItem(
        iconClass="icon-menu-private-letter"
        txt="私信"
        index="/wms/message" v-if="getAuthority('/wms/message')")
      GliMenuItem(
        iconClass="icon-menu-news"
        txt="消息"
        index="/wms/message/msg" v-if="getAuthority('/wms/message/msg')")
      GliMenuItem(
        iconClass="icon-menu-answering-question"
        txt="答疑"
        index="/wms/message/answer" v-if="getAuthority('/wms/message/answer')&&$config.isTeacher")
      GliMenuItem(
        iconClass="icon-menu-leaving-message"
        txt="留言"
        index="/wms/message/leaving" v-if="getAuthority('/wms/message/leaving')&&$config.isTeacher")
    //- GliMenuTop( txt="直播")
    //- 	GliMenuItem(
    //- 		iconClass="icon-menu-lives"
    //- 		txt="直播"
    //- 		index="/wms/lives" v-if="getAuthority('/wms/lives')")
    //- 	GliMenuItem(
    //- 		iconClass="icon-menu-lives-audit"
    //- 		txt="直播审核"
    //- 		index="/wms/lives/verify" v-if="getAuthority('/wms/lives/verify')&&!$config.isTeacher")
    GliMenuTop( txt="个人信息" v-if="$config.isTeacher")
      GliMenuItem(
        iconClass="icon-menu-information"
        txt="个人信息"
        index="/wms/personalInfo" v-if="getAuthority('/wms/personalInfo')")
    GliMenuTop( txt="交易信息")
      GliMenuItem(
        iconClass="icon-menu-course-order"
        txt="课程订单"
        index="/wms/courseOrder" v-if="getAuthority('/wms/courseOrder')")
      GliMenuItem(
        iconClass="icon-menu-course-authorized"
        txt="授权课程订单"
        index="/wms/authorizeOrder" v-if="getAuthority('/wms/authorizeOrder')")
      GliMenuItem(
        iconClass="icon-menu-resource-licensing"
        txt="资源授权"
        index="/wms/resourceAuthorize" v-if="getAuthority('/wms/resourceAuthorize')")
    GliMenuTop( txt="网站编辑" v-if="!$config.isTeacher")
      GliMenuItem(
        iconClass="icon-menu-banner-setting"
        txt="banner设置"
        index="/wms/setting/banner" v-if="getAuthority('/wms/setting/banner')")
      GliMenuItem(
        iconClass="icon-menu-ad-setting"
        txt="广告位"
        index="/wms/setting/ad" v-if="getAuthority('/wms/setting/ad')")
      GliMenuItem(
        iconClass="icon-menu-index-setting"
        txt="首页栏目设置"
        index="/wms/setting/commend" v-if="getAuthority('/wms/setting/commend')")
      GliMenuItem(
        iconClass="icon-menu-foot-setting"
        txt="网站底部设置"
        index="/wms/setting/footer" v-if="getAuthority('/wms/setting/footer')")
      GliMenuItem(
        iconClass="icon-menu-course-category"
        txt="课程类别"
        index="/wms/setting/lession" v-if="getAuthority('/wms/setting/lession')")
    GliMenuTop( txt="积分商城" v-if="!$config.isTeacher")
      GliMenuItem(
        iconClass="icon-menu-Integral-mall"
        txt="积分商城"
        index="/wms/integralMall" v-if="getAuthority('/wms/integralMall')")
      GliMenuItem(
        iconClass="icon-menu-Integral-setting"
        txt="积分设置"
        index="/wms/setting" v-if="getAuthority('/wms/setting')")
      GliMenuItem(
        iconClass="icon-menu-Integral-exchange"
        txt="兑换记录"
        index="/wms/convertRecord" v-if="getAuthority('/wms/convertRecord')")
      GliMenuItem(
        iconClass="icon-menu-records"
        txt="获取记录"
        index="/wms/getRecord" v-if="getAuthority('/wms/getRecord')")
      GliMenuItem(
        iconClass="icon-menu-course-authorized"
        txt="纸质书订单"
        index="/wms/bookOrder")
        //- index="/wms/bookOrder" v-if="getAuthority('/wms/bookOrder')")
    GliMenuTop( txt="会员管理" v-if="!$config.isTeacher")
      GliMenuItem(
        iconClass="icon-menu-management"
        txt="会员管理"
        index="/wms/member" v-if="getAuthority('/wms/member')")
    GliMenuTop( txt="院校管理" v-if="!$config.isTeacher&&getAuthority('/wms/colleges')")
      GliMenuItem(
        iconClass="icon-menu-management"
        txt="院校管理"
        index="/wms/colleges" )
    GliMenuTop( txt="教师列表" v-if="!$config.isTeacher")
      GliMenuItem(
        iconClass="icon-menu-edit-list"
        txt="教师列表"
        index="/wms/editorial" v-if="getAuthority('/wms/editorial')")
      GliMenuItem(
        iconClass="icon-menu-editing-audit"
        txt="教师审核"
        index="/wms/audit" v-if="getAuthority('/wms/audit')")
      GliMenuItem(
        iconClass="icon-menu-cash-management"
        txt="提现管理"
        index="/wms/deductPercent" v-if="getAuthority('/wms/deductPercent')")
    GliMenuTop( txt="数据报表" v-if="!$config.isTeacher")
      GliMenuItem(
        iconClass="icon-menu-user-report"
        txt="用户报表"
        index="/wms/userStatement" v-if="getAuthority('/wms/userStatement')")
      GliMenuItem(
        iconClass="icon-menu-Income-report"
        txt="收益报表"
        index="/wms/profileStatement" v-if="getAuthority('/wms/profileStatement')")
    GliMenuTop( txt="AR&VR管理" v-if="!$config.isTeacher&&getAuthority('/wms/ArVr')")
      GliMenuItem(
        iconClass="icon-menu-lives-audit"
        txt="AR&VR管理"
        index="/wms/ArVr")
</template>


<style lang="stylus" scoped>
.menu
  position fixed
  width 200px
  top 50px
  bottom 0
  z-index 300
  overflow hidden
  transition width 0.3s ease-in-out
  .el-menu
    width 220px
    height 100%
    overflow-y auto
    overflow-x hidden
    .el-menu-item
      padding-left 30px !important
    .el-submenu
      max-width 200px
      .el-submenu__title
        font-size 16px
        height 44px
        line-height 44px
        i
          font-size 16px
          margin-right 6px
.menu .el-menu
  width 220px
  height 100%
  overflow-y auto
  overflow-x hidden
.menu .el-menu .el-submenu
  max-width 200px
.collapse
  background #565E6E
  height 50px
  max-width 200px
  text-align center
  line-height @height
  color #ffffff
  font-size 16px
  cursor pointer
  user-select none
  i
    font-size 15px
.el-menu-item
  i
    margin-right 10px
    &:before
      font-size 16px
      display inline-block
.collLeft
  width 70px
  .el-menu
    width 70px
    transition width 0.3s ease-in-out
</style>
