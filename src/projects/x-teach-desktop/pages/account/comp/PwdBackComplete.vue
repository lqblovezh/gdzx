<script>
import loginMixins from '../mixins'
export default {
  mixins: [loginMixins],
  props: ['changeKey'],
  data() {
    return {
      valiData: {
        pass: {
          // 验证所需字段
          display: '密码过短',
          rules: 'min_length(5)',
          // 组件额外字段
          cname: '新密码',
          type: 'password',
          value: '',
          id: 'lq_pwd_back_reset_none',
          isError: false,
        },
        pass_confirm: {
          // 验证所需字段
          display: '两次密码不相等',
          rules: 'same2(lq_pwd_back_reset)|min_length(1)',
          // 组件额外字段
          cname: '确认密码',
          type: 'password',
          value: '',
          isError: false,
        },
      },
    }
  },
  methods: {
    loginClickHander() {
      this.isPass()
        .then(res => {
          res = { ...res, ...this.$store.state.pwd_back_code }
         //console.log(res)
          return this.$service.signin.pwdBackRestPwd(res)
        })
        .then(res => {
         //console.log(res)
        })
        .catch(err => {
         //console.log(err)
          this.$message({
            type: 'error',
            message: err.message || err,
          })
        })
    },
  },
}
</script>



<template lang="pug">
.comp-login-pwdcomplete
  .account
    form(ref="form")
      LoginInput(
        :ref="`inp_${key}`"
        v-for="item,key in valiData"
        :key="key"
        :name="key"
        :data="item"
      )
    .register-btn.btns.tc 
      .login_btn(@click="loginClickHander") 完 成
</template>
<style lang="stylus">
.comp-login-pwdcomplete
  >.account
    >.btns
      margin 70px 0 40px 0px
      &.tc
        color red
      >div
        width 250px
</style>
