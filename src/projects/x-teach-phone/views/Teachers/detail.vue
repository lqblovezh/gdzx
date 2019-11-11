<script>
import { mapState } from 'vuex'
import Head from '@/components/common/head'
import Course from './course'
import Live from './live'
import Classes from './class'
import { user, charEll } from '@/mixins'
import { extract } from '@/utils/algorithm'
import LeaveMessages from './children/LeaveMessages'
import { prefixStyle } from '@/utils/dom'

const transform = prefixStyle('transform')
const boxShadow = prefixStyle('boxShadow')

export default {
  mixins: [user, charEll],
  data() {
    return {
      styleObj: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
      cur: 'course',
      teacherInfo: {},
      msgs: [], // 用户的浏览列表
      isSpread: false,
      toTopShow: false,
      scrollTop: 0,
    }
  },
  components: { Head, Course, Live, Classes, LeaveMessages },
  computed: {
    ...mapState('user', ['userInfo']),
    tabs() {
      return [
        { label: '课程', component: Course },
        { label: '班级', component: Classes },
        // { label: '直播', component: Live }
      ]
    },
    isMoreThanThree() {
      return this.teacherInfo.summary &&
        this.teacherInfo.summary.length > this.maxLength
        ? true
        : false
    },
  },
  mounted() {
    let content = this.$refs.content.parentNode
    content.addEventListener('scroll', this.handleScroll, false)
    this.getDetailTeacherInfo()
  },
  methods: {
    handleScroll() {
      this.scrollTop = this.$refs.content.parentNode.scrollTop
      if (this.scrollTop > 40) {
        this.styleObj = {
          backgroundColor: '#1C9FF4',
          boxShadow: '0px 2px 2px rgba(0,0,0,.2)',
          transition: 'all .3s ease',
        }
      } else {
        this.styleObj = {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }
      }
    },
    isLogin() {
      if (!this.userInfo) {
        this.$router.push({ path: 'login' })
      }
    },
    getDetailTeacherInfo() {
      const id = this.$route.query.userId
      this.$service.teacher.getDetailTeacher({ id }).then(res => {
        this.teacherInfo = res.data
      })
    },
    cancelFollowed(id) {
      this.$service.teacher
        .cancelFollowedRequest({ id })
        .then(res => {
          this.getDetailTeacherInfo()
        })
        .catch(console.error)
    },
    addFollowed(id) {
      this.$service.teacher
        .sendFollowRequest({ id })
        .then(res => {
          this.getDetailTeacherInfo()
        })
        .catch(console.error)
    },
    followTeacher(id) {
      this.isLogin()
      this.teacherInfo.current_user_is_followed
        ? this.cancelFollowed(id)
        : this.addFollowed(id)
    },
    chat() {
      if (!this.userInfo) {
        this.$router.push({ path: 'login' })
      } else {
        let id = this.teacherInfo.id
        this.$router.push({
          name: 'chat',
          params: { id },
          query: { name: this.teacherInfo.nick_name },
        })
      }
    },
    // 删除我的留言
    async del(mid) {
      await this.$service.message.delMsg({ id: mid })
      await this.getLiveMsg()
    },
    spread() {
      this.isSpread = !this.isSpread
    },
    scroll(newY) {
      let translateY = Math.max(
        -this.$refs.content.offsetTop +
          this.$refs.content.parentNode.scrollTop +
          44,
        newY
      )
      console.log(newY, 111)
      let percent = Math.abs(newY / this.$refs.bgImage.clientHeight)
      let scale = 1
      if (newY > 0) {
        scale = 1 + percent
      }
      this.$refs.content.style[transform] = `translate3d(0,${translateY}px,0)`
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      if (newY < 0) {
        this.$refs.content.style[boxShadow] = `0px -2px 2px rgba(0,0,0,0.5)`
      } else {
        this.$refs.content.style[boxShadow] = 'none'
      }
    },
  },
}
</script>
<template lang="pug">
.page-teacher-detail
  Head(:privateStyle="styleObj")
    span 教师详情
  .teacher-container(v-if="teacherInfo")
    .scroll-box
      .div.img-teacher_bg(ref="bgImage")
        .info-header
          .center.container
            .left
              img.picture(:src="teacherInfo.picture_absolute")
              span.name {{teacherInfo.nick_name}}
            .right.text-right
              p.num {{teacherInfo.followed_me && teacherInfo.followed_me.length}} 粉丝
              button.circle(@click="followTeacher(teacherInfo.id)")
                span.icon-plus_white(v-show="!teacherInfo.current_user_is_followed")
                |{{!teacherInfo.current_user_is_followed?"关注":"取消关注"}}
          .bottom
            .duty
              p 职务
              p.value {{teacherInfo.duties}}
            .duty
              p 学历
              p.value {{teacherInfo.education||"无"}}
            .duty
              p 单位
              p.value {{teacherInfo.company||"无"}}
        .intro
          .jianjie 简介：
          p.text(ref="text") {{ teacherInfo.summary && isSpread ? teacherInfo.summary : maxSlice(teacherInfo.summary) }}
          .button(v-show="isMoreThanThree")
            a.f14(@click="spread") {{isSpread?'收拢':'展开'}}
      .line-part
      .content(ref="content")
        tabs(:tabs="tabs" @scroll="scroll")
  .teacher-footer
    a.btn-priamry(@click="$refs.msgs.show()")
      .icon.icon-leave-message
      span 留言
    a(@click="chat")
      .icon.icon-envelope
      span 私信
  leave-messages(
    ref="msgs"
  )
</template>
<style lang="stylus" scoped>
@import '../../assets/css/var.styl'

.icon-triangle
  margin-top 0.05rem
  padding 0 0.1rem
.icon-teacher
  padding 0 0.1rem
.btn-closed
  color #999
  font-size 12px
  line-height 1
  .icon
    margin-left 0.1rem
    margin-top 0.05rem
.text-center
  text-align center
.teacher-container
  position fixed
  padding-bottom 1.05rem
  left 0
  right 0
  bottom 0
  top 0
  width 100%
  .scroll-box
    height 100%
    overflow auto
    -webkit-overflow-scrolling touch
    .content
      background #fff
  .div
    .center
      display flex
      justify-content space-between
      align-items center
      padding-top 0.88rem
      height 2rem
      .left, .right
        overflow hidden
        .picture
          width 1.5rem
          height 1.5rem
          border-radius 50%
          border 1px solid #ccc
        span, p
          font-size 0.34rem
          color #fff
        .name
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          padding-left 0.17rem
          line-height 1.5rem
          display inline-block
          width 2.5rem
        .num
          font-size 14px
          margin-bottom 0.2rem
        button
          width 1.6rem
          height 0.6rem
          line-height 0.6rem
          outline none
          border none
          color #FFF
          background-color #ffa800
          >span
            margin-top 0.18rem
            margin-right 5px
    .bottom
      width 100%
      height 1.7rem
      .duty
        width 33%
        height 100%
        text-align center
        float left
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        p
          font-size 0.24rem
          color #fff
          padding-top 0.5rem
        .value
          font-size 0.28rem
          padding-top 0.15rem
  .intro
    padding 0.3rem
    font-size 15px
    background-color #FFF
    border-top-left-radius 0.3rem
    border-top-right-radius 0.3rem
    .jianjie
      color #333
      line-height 0.5rem
    P
      line-height 0.5rem
      color #808080
    .button
      width 100%
      height 0.5rem
      text-align right
      line-height 0.5rem
      a
        color #808080
  .line-part
    height 0.2rem
    background #f4f5f7
.teacher-footer
  position fixed
  bottom 0
  left 0
  height 1rem
  width 100%
  font-size 14px
  box-shadow -3px 0 5px #ccc
  background-color #FFF
  a
    display inline-block
    width 50%
    line-height 1rem
    text-align center
    color #4d4d4d
    .icon
      margin 0.38rem 0.2rem
</style>
