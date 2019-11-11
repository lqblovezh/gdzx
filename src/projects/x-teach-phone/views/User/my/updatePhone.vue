<script>
import { mapMutations } from 'vuex'
import Head from '@/components/common/head'
import { code } from '@/mixins'
import { codeCheck } from 'services/common/member'

export default {
  mixins: [code],
  data() {
    return {
      info: {
        phone: '',
      },
    }
  },
  components: {
    Head,
  },
  mounted() {
    this.getImgCode()
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    update() {
      codeCheck({
        code_id: this.info.code_id,
        code_val: this.info.code_val,
      })
        .then(res => {
          return this.$service.user
            .changeUserInfo({
              phone: this.info.phone,
            })
            .then(res => {
              this.$Toast({
                message: '修改成功',
                duration: 2000,
              })
              this.setUserInfo(res.data)
              this.$router.go(-1)
            })
        })
        .catch(({ payload }) => {
          this.$Toast({
            message: payload.message,
            duration: 2000,
          })
        })
    },
  },
}
</script>
<template lang="pug">
div
  Head
    p 修改手机号
  .bg_box.text-center
    .login_bg
    img.logo_title(src="../../../assets/img/login_logo@2x.png")
  .pt88-content
    form.user-form
      .form-control
        span.icon-phone
        input(type="text" v-model="info.phone" placeholder="请输入新手机号")
      .form-control
        span.icon-envelope_s
        input(type="text" v-model="img_code_val" placeholder="请输入图片验证码")
        img.form-align--center(:src="img_code.code_img" @click="getImgCode")
      .form-control.clearfix
        span.icon-code
        input(type="text" v-model="info.code_val" placeholder="请输入短信验证码")
        .btn-send.form-align--center(@click="sendCheckCode") {{code_tip}}
    button.btn-large(@click="update") 确定
</template>
<style lang="stylus" scoped>
.bg_box
  margin-top 1.6rem
  position relative
  .login_bg
    width 100%
    height 3.3rem
    background url('../../../assets/img/login_bg_img@2x.png') no-repeat
    background-size 100% 100%
  .logo_title
    position absolute
    top 30%
    left 50%
    transform translate(-50%, -50%)
    width 50%
</style>
