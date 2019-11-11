<script>
import { mapState, mapActions } from 'vuex'
import Head from '@/components/common/head'
import { thirdLoginAPP } from 'services/common/member'

export default {
  mounted() {},
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo || {},
    }),
  },
  components: {
    Head,
  },
  methods: {
    go_updateName() {
      if (this.userInfo.name.match(/^(qq_|weixin_|gli_oauth|sina_)/)) {
        console.log('第三方登陆可修改')
        this.go('UpdateName')
      } else {
        console.log('不是第三方登陆不可修改')
      }
    },
    go(name) {
      this.$router.push({ path: name })
    },
    sendThirdRequest(el, type) {
      if (window.cordova) {
        this.$thirdLogin(type, args => {
          thirdLoginAPP({
            login_type: type == 'weixin_mp' ? 'weixin_app' : 'qq_app',
            bind_user_id: this.userInfo.id,
            ...args,
          })
            .then(res => {
              this.queryUserInfo().catch(e => {
                if (this.$route.meta.auth) {
                  this.$go('login')
                }
              })
              this.$Toast({
                message: '绑定成功',
              })
            })
            .catch(({ payload }) => {
              this.$Toast({
                message: payload.message,
              })
            })
        })
        return
      }
      !el &&
        this.$service.user
          .thirdLogin({
            back_url: window.location.href,
            bind_user: 1,
            type,
          })
          .then(res => {
            window.location.href = res.data.login_link
          })
    },
    ...mapActions('user', ['queryUserInfo']),
  },
}
</script>
<template lang="pug">
v-wrapper(title="账户与安全" :main-type="1" class="page-of-account")
  .info-menu
    .container.c-bg-f
      .info-item(@click="go_updateName()")
        p 账户
        p.ell {{userInfo.name}}
          span.icon-small.icon-enter
      .info-item(@click="go('updatePwd')")
        p 密码
        p ********
          span.icon-small.icon-enter
      .info-item(@click="go('updatePhone')" style="border-bottom: none;")
        p 手机号
        p {{userInfo.phone && userInfo.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")}}
          span.icon-small.icon-enter
      .line-part
      .info-item(@click="sendThirdRequest(userInfo.third_weixin,'weixin_mp')")
        p 微信
        p(:class="{orange: userInfo.third_weixin}") {{userInfo.third_weixin?'已绑定':'未绑定'}}
          span.icon-small.icon-enter
      .info-item(@click="sendThirdRequest(userInfo.third_qq, 'qq_web')")
        p qq
        p(:class="{orange: userInfo.third_qq}") {{userInfo.third_qq?'已绑定':'未绑定'}}
          span.icon-small.icon-enter
</template>
<style lang="stylus" scoped>
.info-menu
  background-color #fff
  .info-item
    p
      &:last-child
        max-width 50%
  input
    text-align right
    border none
    outline none
</style>
