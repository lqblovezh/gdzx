<script>
import { mapState } from 'vuex'
import PhoneCheck from './PhoneCheck'
import PhoneChange from './PhoneChange'
import PasswordChange from './PasswordChange'
import PassUpdateByPhone from './PassUpdateByPhone'

export default {
  components: {
    PhoneCheck,
    PhoneChange,
    PasswordChange,
    PassUpdateByPhone,
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  data() {
    return {
      detailDialog: false,
      changeDialog: false,
      passDialog: false,
      passUpdateDialog: false,
    }
  },
  methods: {
    phoneCheck() {
      // this.detailDialog = true
      this.changeDialog = true
    },
    checkStatus() {
      this.detailDialog = false
      this.changeDialog = true
    },
    passChange() {
      this.passDialog = true
    },
    passUpdateChange() {
      this.passUpdateDialog = true
    },
    change() {
      this.changeDialog = this.detailDialog = false
    },
    thirdLogin(type) {
      this.$service.user
        .thirdLogin({ type, back_url: location.href, bind_user: 1 })
        .then(res => {
          location.href = res.data.login_link
        })
        .catch(({ message }) => {
          this.$message.error(message)
        })
    },
  },
}
</script>



<template lang="pug">
.comp-user-account
  .box.c_6.f14
    .item.flex
      label.ib 
        span.spacing3 账
        span 户:
      div.ib.ellipsis {{user.name}}
    .item
      label.ib 
        span.spacing3 电
        span 话:
      div.ib {{user.phone}}
      div.ib.cp(@click="phoneCheck()")
        .icon.icon-user-edit
        span 修改
    .item
      label.ib 
        span.spacing3 密
        span 码:
      div.ib ******
      div.ib.cp(@click="passChange()")
        .icon.icon-user-edit
        span 直接修改
      div.ib.cp(@click="passUpdateChange()")
        .icon.icon-user-edit
        span 短信修改
    .item
      label.ib.vt
        span 第三方账号
        span :
      div.ib.trilateral
        div.item
          .icon(:class="[$user.third_qq ? 'icon-user-qq-s': 'icon-user-qq']")
          span QQ
          Tbutton.ib.fr( @click.native="thirdLogin('qq_web')" type="og_plain" size="default") 绑定QQ
        div.item
          .icon(:class="[$user.third_weixin ? 'icon-wechat-s': 'icon-wechat']")
          span 微信
          Tbutton.ib.fr( @click.native="thirdLogin('weixin_web')" type="og_plain" size="default") 绑定微信
  PhoneCheck(
    :detailDialog="detailDialog"
    :phone="user.phone"
    :detailDialog.sync="detailDialog"
    v-if="detailDialog"
    @status="checkStatus"
  )
  PhoneChange(
    :changeDialog="changeDialog"
    :phone="user.phone"
    :changeDialog.sync="changeDialog"
    v-if="changeDialog"
  )
  PasswordChange(
    :passDialog="passDialog"
    :passDialog.sync="passDialog"
    v-if="passDialog"
  )
  PassUpdateByPhone(
    :passUpdateDialog="passUpdateDialog"
    :passUpdateDialog.sync="passUpdateDialog"
    v-if="passUpdateDialog"
  )
</template>
<style lang="stylus">
.comp-user-account
  padding 50px 0
  >.box
    width 385px
    margin 40px auto
    >div.item
      margin-bottom 25px
      line-height 40px
      &:nth-of-type(4n)
        margin-bottom 0
      >.trilateral
        width 250px
        .item
          margin-bottom 40px
          >span
            margin-left 10px
          >.comp-btn
            width 98px
            position relative
            top 5px
      >div
        margin-left 36px
        word-break keep-all
        max-width 260px
      >label
        >.spacing3
          letter-spacing 3em
    >.btn
      margin 38px 0
      button
        width 100px
</style>
