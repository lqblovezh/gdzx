<script>
import { mapState, mapMutations } from 'vuex'
import Message from '@/components/common/message'
export default {
  data() {
    return {
      exitSys: false,
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapState('common', ['showHeadMsg', 'showLoading']),
  },
  mounted() {
    this.getBaseConfig()
    document.addEventListener('backbutton', this.backbutton, false)
  },
  components: {
    Message,
  },
  methods: {
    ...mapMutations('user', ['setMessageInfo']),
    ...mapMutations('common', ['setConfig']),
    getNumOfMsg() {
      this.$service.message.getNumOfMsg().then(res => {
        this.setMessageInfo(res.data)
      })
    },
    getBaseConfig() {
      this.$service.home.getConfig().then(res => {
        this.setConfig(res.data)
      })
    },
    backbutton() {
      if (this.$route.path == '/home') {
        if (this.exitSys) {
          navigator.app.exitApp()
          return
        }
        this.$Toast({
          message: '再按一次退出',
        })
        this.exitSys = true
        setTimeout(function() {
          this.exitSys = false
        }, 1000 * 5)
        return false
      } else {
        this.$router.go(-1)
      }
    },
  },
  watch: {
    $route(to, from) {
      if (this.userInfo) {
        this.getNumOfMsg()
      }
    },
  },
}
</script>
<template lang="pug">
#app
	router-view
</template>
<style lang="stylus">
#app
  // padding-top env(safe-area-inset-top)
  font-size 16px
  font-family PingFangSC-Regular, sans-serif
  div
    user-select none
</style>
