<script>
import { mapState, mapMutations } from 'vuex'
import Head from '@/components/common/head'

export default {
  data () {
    return {
      name: ''
    }
  },
  components: {
    Head
  },
  mounted () {
    this.name = this.userInfo.name
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo
    }),
    hasChanged() {
      return this.name !== this.userInfo.name
    }
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    clear () {
      this.name = ''
    },
    save () {
      if (this.name !== this.userInfo.name) {
        this.$service.user.changeUserInfo({
          name: this.name
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
.pt88-static__vh.main-color
  Head
    p(slot="center") 修改账户名
    div(slot="right")
      p(@click="save" v-show="hasChanged") 保存
  div
    .input-box
      input(type="text" v-model="name")
      span.icon-close_u(@click="clear" v-show="name != ''")
</template>
<style lang="stylus" scoped>
.input-box
  position relative
  height 1.11rem
  width 100%
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
