<script>
import loginMixins from '../mixins'
export default {
  mixins: [loginMixins],
  props: ['changeKey'],
  data() {
    return {
      valiData: {
        phone: {
          // 验证所需字段
          display: '手机号码不正确',
          rules: 'is_phone',
          // 组件额外字段
          cname: '手机号',
          type: 'number',
          value: '',
          isError: false,
        },
        code_img: {
          display: '验证码错误',
          rules: 'min_length(1)',
          cname: '验证码',
          type: 'text',
          isCode: true,
          isError: false,
          value: '',
          img_src: '',
          code_id_img: '', // 图片的id
        },
        // 手机短信的code_val
        code_val: {
          display: '验证码错误',
          rules: 'min_length(1)',
          cname: '短信验证',
          type: 'text',
          isPhoneCode: true,
          isError: false,
          value: '',
        },
        // id, 短信发送成功后返回的字段
        code_id: {
          value: '',
          noRender: true,
        },
      },
    }
  },
  methods: {
    loginClickHander() {
      this.isPass()
        .then(res => {
          return this.$service.user.phoneLogin(res)
        })
        .then(res => {
          this.$loginSuccess(res.data)
          return true
        })
        .catch(err => {
          this.$message.error(err.payload.message)
        })
    },
  },
  watch: {
    '$store.state.isLoginDialog'(flag) {
      //console.log('getImgCode')
      if (flag) {
        this.getImgCode()
      }
    },
  },
}
</script>



<template lang="pug">
.comp-login-account
  .account
    form(ref="form")
      LoginInput(
        v-for="item,key in valiData"
        v-if="!item.noRender"
        @imgClickHander="getImgCode"
        @phoneClickHander="getPhoneCodeHander"
        :ref="`inp_${key}`"
        :key="key"
        :name="key"
        :data="item"
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
