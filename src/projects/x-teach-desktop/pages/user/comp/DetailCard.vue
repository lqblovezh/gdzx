<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    edit() {
      this.$go('/usreInfo')
    },
    getUserinfo() {
      //获取积分
      this.$service.user.isLogin().then(res => {
        this.$infoBack(res.data)
      })
    },
    getClass() {
      if (this.user.sex == '男') {
        return 'icon-man'
      }
      return 'icon-lady'
    },
    logout() {
      localStorage.token = ''
      this.$service.signin.loginOut().then(res => {
        localStorage.token = ''
        this.$store.state.user = null
        this.$go('/home')
      })
    },
    go() {
      location.href = process.env.NODE_ENV
        ? restUrl + '/admin'
        : restUrl_common + restUrl + '/admin'
    },
  },
}
</script>


<template lang="pug">
  .comp-user-detail-card.pr.icon.icon-user-bg
    .box(v-if="user")
      .img.ib.vm.f14
        img(:src="user.picture_absolute") 
      .other.ib.vm.f14
        .name.f20.c_f.f800 {{user.nick_name}}
        div.c_f
          span.icon(:class="getClass()") {{user.sex}}
          span.icon.icon-jobs {{user.is_teacher?'老师':'学生'}}
          span.icon.icon-integral {{user.statistics?user.statistics.credits:'0'}}积分
      .btn.ib.vm.f14
        Tbutton( @click.native="edit" type="og") 编辑个人资料
        .btn-out(@click="go" v-if="user.is_teacher") 进入教学中心
</template>


<style lang="stylus">
.comp-user-detail-card
  display flex
  flex-direction column
  justify-content center
  .box
    >.img
      margin 0 38px
      >img
        width 120px
        height @width
        border-radius 50%
        border 5px solid #91d8f0
        box-sizing border-box
    >.other
      width 800px
      >div
        &.name
          margin-bottom 30px
        >span
          margin-right 40px
          padding-left 25px
          background-position left
    >.btn
      text-align center
      position absolute
      top 50px
      >.btn-out
        margin-top 50px
    >.share
      bottom 10px
      right 10px
</style>
