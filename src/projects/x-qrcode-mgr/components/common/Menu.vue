<script>
import '../../assets/css/incon-fomts2.styl'
import '../../assets/css/incon-fonts1.css'
import GliMenu from 'projects/common/menu'
import GliMenuTop from 'projects/common/menu/Menu'
import GliMenuItem from 'projects/common/menu/MenuItem'

export default {
  components: { GliMenu, GliMenuTop, GliMenuItem },
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
				iconClass="icon-wms_indexSettings"
				txt="首页"
				style="display:none"
				index="/wms/home" v-if="getAuthority('/wms/home')")
		GliMenuTop( txt="实体书库")
			GliMenuItem(
				iconClass="icon-wms_mediaBook"
				txt="实体书库"
				index="/wms/book" v-if="getAuthority('/wms/book')")
		GliMenuTop( txt="二维码库")
			GliMenuItem(
				iconClass="icon-wms_mediaBook"
				txt="二维码库"
				index="/wms/qrcode" v-if="getAuthority('/wms/qrcode')")
			GliMenuItem(
				iconClass="icon-wms_theme"
				txt="二维码回收站"
				index="/wms/recycle" v-if="getAuthority('/wms/recycle')")
		GliMenuTop( txt="资源库")
			GliMenuItem(
				iconClass="icon-wms_mediaBook"
				txt="习题集"
				index="/wms/practice" v-if="getAuthority('/wms/practice')")
			GliMenuItem(
				iconClass="icon-wms_mediaBook"
				txt="图片集"
				index="/wms/pictures" v-if="getAuthority('/wms/pictures')")
			GliMenuItem(
				iconClass="icon-wms_theme"
				txt="音频集"
				index="/wms/audios" v-if="getAuthority('/wms/audios')")
			GliMenuItem(
				iconClass="icon-videos"
				txt="视频集"
				index="/wms/videos" v-if="getAuthority('/wms/videos')")
			GliMenuItem(
				iconClass="icon-voices"
				txt="文章集"
				index="/wms/articles" v-if="getAuthority('/wms/articles')")
			GliMenuItem(
				iconClass="icon-book"
				txt="数字图书集"
				index="/wms/books" v-if="getAuthority('/wms/books')")
		GliMenuTop( txt="二维码产品库")
			GliMenuItem(
				iconClass="icon-wms_mediaBook"
				txt="二维码产品库"
				index="/wms/qrcodeProduct" v-if="getAuthority('/wms/qrcodeProduct')")
		GliMenuTop( txt="专题库")
			GliMenuItem(
				iconClass="icon-wms_indexSettings"
				txt="专题"
				index="/wms/dissertation" v-if="getAuthority('/wms/indexSettings')")
			//- GliMenuItem(
			//- 	iconClass="icon-wms_indexSettings"
			//- 	txt="详情"
			//- 	index="/wms/typeSetting/column" v-if="getAuthority('/wms/indexSettings')")
			//- GliMenuItem(
			//- 	iconClass="icon-wms_bookSettings"
			//- 	txt="资源与应用"
			//- 	index="/wms/typeSetting/resAndUse" v-if="getAuthority('/wms/resAndUse')")
			//- GliMenuItem(
			//- 	iconClass="icon-wms_rcmSettings"
			//- 	txt="广告位"
			//- 	index="/wms/typeSetting/advertising" v-if="getAuthority('/wms/typeSetting')")
			//- GliMenuItem(
			//- 	iconClass="icon-wms_rcmSettings"
			//- 	txt="使用中产品"
			//- 	index="/wms/typeSetting/using" v-if="getAuthority('/wms/typeSetting')")
		GliMenuTop( txt="应用库")
			GliMenuItem(
				iconClass="icon-wms_mediaBook"
				txt="投票"
				index="/wms/vote" v-if="getAuthority('/wms/vote')")
			GliMenuItem(
				iconClass="icon-wms_theme"
				txt="问卷调查"
				index="/wms/questionnaire" v-if="getAuthority('/wms/questionnaire')")
			GliMenuItem(
				iconClass="icon-videos"
				txt="问答库"
				index="/wms/qandA" v-if="getAuthority('/wms/qandA')")
			GliMenuItem(
				iconClass="icon-voices"
				txt="抽奖"
				index="/wms/lottery" v-if="getAuthority('/wms/lottery')")
			GliMenuItem(
				iconClass="icon-voices"
				txt="书圈"
				index="/wms/readerCircle" v-if="getAuthority('/wms/readerCircle')")
			GliMenuItem(
				iconClass="icon-voices"
				txt="报名应用"
				index="/wms/apply" )
		GliMenuTop( txt="营销库")
			GliMenuItem(
				iconClass="icon-wms_indexSettings"
				txt="晒单营销"
				index="/wms/showList" v-if="getAuthority('/wms/showList')")
			GliMenuItem(
				iconClass="icon-wms_bookSettings"
				txt="转发营销"
				index="/wms/transpond" v-if="getAuthority('/wms/transpond')")
		GliMenuTop( txt="会员管理")
			GliMenuItem(
				iconClass="icon-wms_memberlist"
				txt="会员列表"
				index="/wms/memberlist" v-if="getAuthority('/wms/memberlist')")
			//- GliMenuItem(
			//- 	iconClass="icon-userMsg"
			//- 	txt="用户反馈"
			//- 	index="/wms/memberfb" v-if="getAuthority('/wms/memberfb')")
		GliMenuTop( txt="订单管理")
			GliMenuItem(
				iconClass="icon-wms_orderManage"
				txt="收入统计"
				index="/wms/incomeStatics" v-if="getAuthority('/wms/incomeStatics')")
			GliMenuItem(
				iconClass="icon-wms_orderManage"
				txt="订单查询"
				index="/wms/orderManage" v-if="getAuthority('/wms/orderManage')")
		GliMenuTop( txt="统计分析")
			GliMenuItem(
				iconClass="icon-wms_cash1"
				txt="产品报表"
				index="/wms/proStatics" v-if="getAuthority('/wms/proStatics')")
			GliMenuItem(
				iconClass="icon-wms_cash1"
				txt="书籍报表"
				index="/wms/bookStatics" v-if="getAuthority('/wms/proStatics')")
			GliMenuItem(
				iconClass="icon-wms_statistics"
				txt="系统整体报表"
				index="/wms/analysAll" v-if="getAuthority('/wms/analys')")
		GliMenuTop( txt="系统管理")
			GliMenuItem(
				iconClass="icon-wms_mediaBook"
				txt="导出列表"
				index="/wms/transfer" v-if="getAuthority('/wms/transfer')")
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
