<script>
import LoginPhone from './comp/LoginPhone'
import LoginAccount from './comp/LoginAccount'

export default {
  components: { LoginPhone, LoginAccount },
  data() {
    return {
      list: {
        account: {
          name: '账号登陆',
        },
        phone: {
          name: '手机登陆',
        },
      },
      curr: 'account',
      qq_web: '',
      weixin_web: '',
    }
  },
  mounted() {},
  watch: {
    '$store.state.isLoginDialog': function(isLoginDialog) {
      console.log('object', isLoginDialog)
      if (isLoginDialog) {
        this.getLinks()
      }
    },
  },
  methods: {
    changeKey(key) {
      this.curr = key
    },
    getLinks() {},
    loginClickHander() {
      this.$refs[this.curr].loginClickHander()
    },
    openPwdDialog() {
      this.$openPwdDialog()
    },
    thirdLogin(type) {
      let { origin, pathname } = location
      this.$service.signin
        .thirdLogin({ type, back_url: origin + pathname })
        .then(res => {
          location.href = res.data.login_link
        })
    },
  },
}
</script>


<template lang="pug">
  .comp-login
    .wrap.tc
      .content
        .chead.tc
          .ls.bd_line.ib
            .item.active_border(
              :key="key"
              @click="changeKey(key)"
              :class="{active: key === curr }"
              v-for="item,key in list") {{item.name}}
        .cbody.tl
          .content
            LoginAccount(
              ref="account"
              v-show="curr === 'account'"
            )
            LoginPhone(
              ref="phone"
              v-show="curr === 'phone'")
            .change.f13.fix
              span.c_theme.fr.cp(@click="openPwdDialog") 忘记密码?
          .bottom
            .login-btns.tc
              .login_btn(@click="loginClickHander") 登 陆
            .other(v-if="curr === 'account'")
              .div.tc.c_8  第三方账号登录
              .types.f25.c_4.tc
                .ib( @click="thirdLogin('qq_web')")
                  .ficon.icon-myqq.c_f
                  .f14.ib QQ
                .ib(  @click="thirdLogin('weixin_web')")
                  .ficon.icon-myweixin.c_f
                  .f14.ib 微信
                // .ib(  @click="thirdLogin('gli_oauth')")
                //   .ficon.icon-myweixin.c_f
                //   .f14.ib 统一登录
            .register-btn.btns.tc
              .login_btn() 注 册
</template>


<style lang="stylus">
.comp-login
  >.wrap
    >.content
      >.chead
        height 50px
        width 520px
        line-height 50px
        margin auto
        margin-bottom 30px
        >.ls
          width 520px
          >.item
            transform translateY(1px)
            margin 0 50px
            padding 0 30px
      >.cbody
        >.content
          margin-left 80px
          >.change
            width 80%
            >span:last-child
              // margin-right 50px
        >.bottom
          >.login-btns
            margin 30px
            >div
              width 250px
          >.other
            padding 10px 0
            >.types
              padding 10px 0
              >.ib
                width 120px
                cursor pointer
                margin 15px 30px
                >.ficon
                  margin-right 10px
                  width 40px
                  height 40px
                  border-radius 50%
                  line-height 40px
                  background #45baf9
                &:last-child
                  >.ficon
                    background #65cd63
          >.register-btn
            padding-top 10px
</style>
