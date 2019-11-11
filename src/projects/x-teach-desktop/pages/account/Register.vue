
<script>
import loginMixins from './mixins'
export default {
  mixins: [loginMixins],
  created() {},
  data() {
    return {
      valiData: {
        name: {
          // 验证所需字段
          display: '4-20个字符',
          rules: 'min_length(4)|max_length(20)',
          // 组件额外字段
          cname: '账 户',
          type: 'text',
          value: '',
          isError: false,
        },
        nick_name: {
          // 验证所需字段
          display: '20个字符',
          rules: 'min_length(1)|max_length(20)',
          // 组件额外字段
          cname: '昵 称',
          type: 'text',
          value: '',
          isError: false,
        },
        pass: {
          // 验证所需字段
          display: '密码不能小于4位',
          rules: 'min_length(4)',
          // 组件额外字段
          cname: '密 码',
          type: 'password',
          value: '',
          isError: false,
          id: 'register_pwd',
        },
        repassword: {
          // 验证所需字段
          display: '两次密码不相等',
          rules: 'same2(register_pwd)|min_length(1)',
          // 组件额外字段
          cname: '确认密码',
          type: 'password',
          value: '',
          isError: false,
        },
        phone: {
          // 验证所需字段
          display: '手机号码不正确',
          rules: 'is_phone',
          // 组件额外字段
          cname: '手机号',
          type: 'text',
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
        // 手机短信的codeval
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
          //console.log(res)
          // 因为code_id 字段不在渲染表单内, 但又需要发送
          return this.$service.signin.register(res)
        })
        .then(res => {
          //console.log(res)
          this.$message.success('注册成功! 请登陆')
          this.$store.state.loginDialogCurrKey = 'login'
        })
        .catch(err => {
          if (err.payload.errors.name != null) {
            this.$message.error(err.payload.errors.name)
          }
          if (err.payload.errors.phone != null) {
            this.$message.error(err.payload.errors.phone)
          }
          console.log(err.payload.errors.name)
        })
    },
    checkImgCode() {},
  },
  watch: {
    '$store.state.isLoginDialog'(flag) {
      if (flag) {
        this.getImgCode()
      }
    },
  },
}
</script>
<template lang="pug">
.comp-page-register 
  .form-wrap 
    form 
      LoginInput(
        v-for="item,key in valiData"
        @imgClickHander="getImgCode"
        @phoneClickHander="getPhoneCodeHander"
        v-if="!item.noRender"
        :ref="`inp_${key}`"
        :name="key"
        :key="key"
        :data="item"
      )
    .register-btn.btns.tc 
      .login_btn(@click="loginClickHander") 注 册 
</template>


<style lang="stylus">
.comp-page-register
  >.form-wrap
    >form
      margin 0 auto
      margin-left 70px
    >.register-btn
      >div
        width 250px
        margin 30px 0
</style>

