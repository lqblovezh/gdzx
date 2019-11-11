<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo,
    }),
  },
  methods: {
    ...mapMutations('user', ['clearState', 'setUserInfo']),
    go(name) {
      if (!localStorage.getItem('token')) {
        this.setUserInfo(null)
        this.goToLogin()
        return
      }
      if (this.userInfo === null) {
        this.goToLogin()
        return
      }
      this.$router.push({ path: name })
    },
    goToLogin() {
      this.$router.replace({ path: 'login', query: { redirect: '/user' } })
    },
    logout() {
      this.$service.user.logout().then(res => {
        this.clearState()
      })
    },
  },
}
</script>
<template lang="pug">
.full-layer.main-color
	.user
		.user-info.text-center.icon-user_bg
			img.avatar(:src="userInfo.picture_absolute" @click="go('info')" v-if="userInfo")
			.avatar.icon-default_avatar(@click="goToLogin" v-else)
			.user-info__detail(v-if="userInfo" @click="go('info')")
				.user-info__name {{userInfo.nick_name}}
					span.sex(:class="[userInfo.sex == '男'?'icon-male':'icon-female']")
				.user-info__school
					|学校：{{userInfo.school||'未知'}}
					span |
					|学院：{{userInfo.college||'未知'}}
		.line-part
		.user-menus
			.menus.c-bg-f
				//- .menu-item(@click="go('info')")
				//- 	p
				//- 		span.icon.icon-info
				//- 		|个人资料
				//- 	span.icon-small.icon-enter
				//- .line-part
				.menu-item(@click="go('testReport')")
					p
						span.icon.icon-test_u
						|课程数据
					span.icon-small.icon-enter
				.menu-item(@click="go('follow')")
					p
						span.icon.icon-follow
						|关注教师
					span.icon-small.icon-enter
				.menu-item(@click="go('orderDetail')")
					p
						span.icon.icon-order
						|我的订单
					span.icon-small.icon-enter
				.menu-item(@click="go('scoreShop')")
					p
						span.icon.icon-jifen
						|积分会员
					span.icon-small.icon-enter
				.menu-item(@click="go('shop')")
					p
						span.icon.icon-shop
						|购物车
					span.icon-small.icon-enter
		.line-part
		button.btn-default(@click="logout" v-show="userInfo") 退出登录
</template>
<style lang="stylus" scoped>
.user
  overflow-y auto
  padding-bottom 1.2rem
.sex
  margin-top 0.03rem
  margin-left 0.14rem
.user-info
  height 3.25rem
  padding-top 0.5rem
  img
    width 1.5rem
    height 1.5rem
    border 0.06rem solid #FFF
    border-radius 100%
  .user-info__detail
    color #fff
    .user-info__name
      margin 0.32rem 0
    .user-info__school
      font-size 12px
      span
        margin 0 0.4rem
.user-menus
  .line-part
    margin-left -0.3rem
    margin-right -0.3rem
  .menus
    padding 0 0.3rem
  .menu-item
    display flex
    height 1rem
    line-height 1rem
    justify-content space-between
    align-items center
    font-size 14px
    background-color #fff
    border-bottom 1px solid #dfe6eb
    &:first-child
      margin-bottom 5px
    // &:not(:first-child)
    &:last-child
      border-bottom none
.icon
  margin-top 0.3rem
  margin-right 0.26rem
</style>
