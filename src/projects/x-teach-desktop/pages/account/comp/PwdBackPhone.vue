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
          type: 'phone',
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
        pass: {
          // 验证所需字段
          display: '密码过短',
          rules: 'min_length(5)',
          // 组件额外字段
          cname: '新密码',
          type: 'password',
          value: '',
          id: 'lq_pwd_back_reset',
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
  watch: {
    '$store.state.isLoginDialog'(flag) {
      if (flag) {
        this.getImgCode()
      }
    },
  },
  methods: {
    next() {
      this.isPass()
        .then(res => {
          //console.log(res)
          const { user_id, value: code_val } = this.valiData.code_val
          const { pass, pass_confirm } = res
          if (user_id && code_val) {
            // this.$emit('next')
            let data = {
              user_id,
              code_val,
              pass,
              pass_confirm,
            }
            this.$message({
              showClose: true,
              message: '密码重置成功',
              type: 'success',
            })
            return this.$service.user.setPwd(data)
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err.message,
          })
        })
    },
    getPhoneCodeBackHander() {
      //console.log('object')
      this.$refs.inp_phone[0].vali() // 验证手机号
      if (this.valiData.phone.isError) return
      let data = {
        phone: this.valiData.phone.value,
        code_val: this.valiData.code_img.value,
        code_id: this.valiData.code_img.code_id_img,
      }
      this.$service.signin
        .pwdBackPhoneCode(data)
        .then(res => {
          //console.log('phoneback', res)
          this.$message({
            type: 'success',
            message: `已向账户:${this.valiData.phone.value}发送短信! 请注意查收!`,
          })
          // 保存手机验证码id
          this.valiData.code_val.user_id = res.data.user_id
          // 60秒内不再发送
          this.$refs.inp_code_val[0].wait()
        })
        .catch(err => {
          console.error('短信发送错误', err)
          switch (err.message) {
            case '短信发送错误':
              this.valiData.code_img.isError = true
              break
            case '用户不存在':
              this.valiData.phone.isError = true
              break
            default:
              break
          }
          this.$message({
            type: 'error',
            message: err.message,
          })
        })
    },
  },
}
</script>



<template lang="pug">
.comp-login-pwdphone
  .account
    form(ref="form")
      LoginInput(
        v-for="item,key in valiData"
        @imgClickHander="getImgCode"
        @phoneClickHander="getPhoneCodeBackHander"
        :ref="`inp_${key}`"
        :key="key"
        :name="key"
        :data="item"
      )
    .register-btn.btns.tc
      .login_btn(@click="next") 完成
</template>
<style lang="stylus">
.comp-login-pwdphone
  >.account
    >.btns
      margin 70px 0 40px 0px
      &.tc
        color red
      >div
        width 250px
</style>
