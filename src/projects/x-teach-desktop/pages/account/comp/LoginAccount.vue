<script>
import loginMixins from '../mixins'
export default {
  mixins: [loginMixins],
  props: ['changeKey'],
  data() {
    return {
      valiData: {
        user_name: {
          // 验证所需字段
          display: '账号过短',
          rules: 'min_length(4)',
          // 组件额外字段
          cname: '账 户',
          type: 'text',
          isError: false,
          value: '',
        },
        user_pass: {
          display: '密码过短',
          rules: 'min_length(4)',
          cname: '密 码',
          type: 'password',
          isError: false,
          value: '',
        },
      },
    }
  },
  methods: {
    loginClickHander() {
      this.isPass()
        .then(res => this.$service.user.userLogin(res))
        .then(res => {
          this.$loginSuccess(res.data)
          return true
        })
        .catch(err => {
          this.$message.error(err.payload.message)
        })
    },
  },
}
</script>



<template lang="pug">
.comp-login-account
  .account
    form(ref="form")
      LoginInput(
        :ref="`inp_${key}`"
        v-for="item,key in valiData"
        :name="key"
        :key="key"
        :data="item"
        @keyup.enter.native="loginClickHander"
      )
</template>
<style lang="stylus">
.comp-login-account
  >.account
    >.btns
      margin 70px 0 40px 0px
      &.tc
        color red
      >div
        width 250px
</style>
