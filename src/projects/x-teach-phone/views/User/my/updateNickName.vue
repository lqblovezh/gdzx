<script>
import { mapState, mapMutations } from 'vuex'
import Head from '@/components/common/head'

export default {
  data () {
    return {
      nickname: ''
    }
  },
  components: {
    Head
  },
  mounted () {
    this.nickname = this.userInfo.nick_name
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    }),
    hasChanged() {
      return this.nickname !== this.userInfo.nick_name
    }
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    clear () {
      this.nickname = ''
    },
    save () {
      if (this.nickname !== this.userInfo.nick_name) {
        this.$service.user.changeUserInfo({
          nick_name: this.nickname
        }).then(res => {
          this.setUserInfo(res.data)
          this.$Toast({
            message: '修改成功',
            iconClass: 'icon-toast icon-success',
            duration: 400
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 400)
        }).catch(console.info)
      }
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="修改昵称" :main-type="1" class="page-of-nickname")
  template(#right)
    p.f14.c-f(@click="save" v-show="hasChanged") 保存
  div
    .input-control-bar
      input(type="text" v-model="nickname")
      span.icon-close_u(@click="clear" v-show="nickname != ''")
</template>
<style lang="stylus" scoped>
.page-of-nickname
  .input-control-bar
    position relative
    height 1.11rem
    box-shadow 0 2px 1px #ccc
    input
      width 100%
      height 1.11rem
      background-color #FFF
      border none
      text-indent 1em
      outline none
.icon-close_u
  position absolute
  right 0.3rem
  top 50%
  margin-top -0.19rem
</style>