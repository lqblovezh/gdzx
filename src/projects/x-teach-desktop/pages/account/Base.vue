<script>
import { mapState } from 'vuex'
import Login from './Login'
import PwdBack from './PwdBack'
import Register from './Register'
export default {
  components: {
    Login,
    PwdBack,
    Register,
  },
  data() {
    return {
      navs: {
        login: {
          name: '登陆',
        },
        register: {
          name: '注册',
        },
        pwdback: {
          name: '忘记密码',
        },
      },
    }
  },
  computed: {
    ...mapState(['isLoginDialog', 'loginDialogCurrKey']),
  },
  methods: {
    changeKey(key) {
      this.$store.state.loginDialogCurrKey = key
    },
    close() {
      ////console.log(this.$store.state.isLoginDialog)
      this.$store.state.isLoginDialog = false
    },
  },
}
</script>


<template lang="pug">
.comp-account-base(v-show="isLoginDialog")
  .mask
    .box
      .table-box
        .conatiner.c_f_bg
          .head.f18.bd_line.c_8.pr
            .ls
              .item.active_border.ib(
                :key="key"
                @click="changeKey(key)"
                :class="{active:loginDialogCurrKey === key}"
                v-for="item,key in navs"
              ) {{item.name}}
            .close.pa.cp.tc(@click="close")  
              span.el-icon-close 
          .body
            Login(v-show="loginDialogCurrKey === 'login'")
            Register(v-show="loginDialogCurrKey === 'register'")
            PwdBack(v-show="loginDialogCurrKey === 'pwdback'")
</template>


<style lang="stylus">
.comp-account-base
  >.mask
    >.box
      display table
      width 100%
      height 100%
      >.table-box
        display table-cell
        vertical-align middle
        >.conatiner
          width 700px
          min-height 500px
          margin auto
          border-radius 4px
          >.head
            height 60px
            line-height 60px
            padding 0 30px
            >.ls
              >.item
                transform translateY(-2px)
                padding 0 20px
                margin-right 50px
            >.close
              right 0
              top 0
              width 50px
              height 50px
          >.body
            padding 30px
            padding-bottom 60px
</style>
