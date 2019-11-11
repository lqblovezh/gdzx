<script>
import PwdBackPhone from './comp/PwdBackPhone'
import PwdBackComplete from './comp/PwdBackComplete'

export default {
  components: { PwdBackPhone, PwdBackComplete },
  data() {
    return {
      list: {
        account: {
          name: '验证身份',
        },
        repwd: {
          name: '重置密码',
        },
      },
      curr: 'account',
    }
  },
  methods: {
    changeKey(key) {
      // if(){
      this.curr = key
      // }
    },
    loginClickHander() {
      this.$refs[this.curr].loginClickHander()
    },
    openPwdDialog() {
      this.$openPwdDialog()
    },
    nextHandler() {
      this.curr = 'repwd'
    },
  },
}
</script>


<template lang="pug">
  .comp-pwdback
    .wrap.tc
      .content.ib
        //- .chead
          .ls.bd_line
            .item.active_border(
              @click="changeKey(key)"
              :key="key"
              :class="{active: key === curr }"
              v-for="item,key in list") {{item.name}}
        .cbody.tl
          PwdBackPhone(
            @next="nextHandler"
            ref="account"
            v-show="curr === 'account'")
          PwdBackComplete(
            ref="repwd"
            v-show="curr === 'repwd'")
</template>


<style lang="stylus">
.comp-pwdback
  >.wrap
    >.content
      width 510px
      >.chead
        height 50px
        line-height 50px
        margin-bottom 30px
        >.ls
          >.item
            transform translateY(1px)
            margin 0 50px
            padding 0 30px
      >.cbody
        .comp-login-input
          white-space nowrap
        >.login-btns
          margin 30px
          >div
            width 250px
        >.change
          padding-left 82px
          width 400px
          margin 30px 0
          >span:last-child
            margin-right 50px
        >.other
          padding 10px 0
          >.types
            padding 10px 0
            >.ib
              width 100px
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
