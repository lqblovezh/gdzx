<script>
import Personal from './comp/Personal'
import Account from './comp/Account'

export default {
  components: {
    Personal,
    Account,
  },
  data() {
    return {
      navs: {
        personal: {
          name: '个人信息',
        },
        account: {
          name: '账户资料',
        },
      },
      infoType: 'personal'
    }
  },
  methods: {
    changeKey(key) {
      this.infoType = key
    },
  },
}
</script>


<template lang="pug">
div
  NormalWrap
    .page-userInfo.cbox
      .conatiner
        .nav.c_f_bg 
          .ls.c_e0_bd 
            .item.active_border.ib(
              :key="key"
              @click="changeKey(key)"
              :class="{active:infoType === key}"
              v-for="item,key in navs"
            ) {{item.name}}
        .body.c_f_bg 
          Personal(v-if="infoType === 'personal'")
          Account(v-else)
</template>


<style lang="stylus">
.page-userInfo
  min-height 500px
  >.conatiner
    padding-top 20px
    padding-bottom 65px
    >.nav
      >.ls
        border-bottom 1px solid #e0e0e0
        box-sizing border-box
        height 57px
        >.item
          text-align center
          line-height 55px
          margin 0 25px
          padding 0 5px
          cursor pointer
          box-sizing border-box
</style>
