<script>
import {validatePhone} from '@/utils/validate.js'
import {code} from '@/mixins'
export default {
  mixins: [code],
  data() {
    return {
      phone_tip: '发送验证码',
      info: {
        user_name: null,
      }
    }
  },
  mounted() {
    this.getImgCode()
  },
  methods: {
    back () {
      this.$router.replace({path: 'login'})
    },
    enterUpdatePwd (uid) {
      this.$router.replace({path: 'updatePwd', query: {uid}})
    },
    sendPhoneInfo () {
      if (!this.info.user_name || !this.img_code_val) {
        this.$Toast('请填写用户名以及验证码')
        return
      }
      this.$service.user.backPwdCode({
        user_name: this.info.user_name,
        code_id: this.img_code.code_id,
        code_val: this.img_code_val
      }).then(res => {
        this.enterUpdatePwd(res.data.user_id)
      }).catch(e => {
        this.$Toast(e.message.toString())
      })
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="忘记密码" :main-type="1")
  .mi-container
    .forget-pass
      .bg_box.text-center
        .login_bg
        img.logo_title(src="../../../assets/img/login_logo@2x.png")      
      form.user-form.container
        .form-control
          span.icon-phone
          input(type="text" v-model="info.user_name" placeholder="请输入用户名")
        .form-control
          span.icon-envelope_s
          input(type="text" v-model="img_code_val" placeholder="请输入图片验证码")
          img.form-align--center(:src="img_code.code_img" @click="getImgCode")
        button.btn-large.btn-pwd(@click.prevent="sendPhoneInfo") 重置密码
</template>
<style lang="stylus" scoped>
.bg_box
  margin-top 0.8rem
  position relative
  .login_bg
    width 100%
    height 3.3rem
    background url('../../../assets/img/login_bg_img@2x.png') no-repeat
    background-size 100% 100%
  .logo_title 
    position  absolute 
    top 30%
    left 50%
    transform translate(-50%, -50%)
    width 50%
.form-control
  img
    position absolute
    right 0
    width 1.44rem
    height 0.5rem
button
  margin-top 0.9rem
</style>
