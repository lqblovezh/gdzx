<script>
import Base from './account/Base'
import { mapActions } from 'vuex'

export default {
  components: { Base },
  async mounted() {
    let token = sessionStorage.getItem('token')
    // alert(token)
    if (token) {
      await this.$service.user
        .isLogin()
        .then(res => this.$loginBackHander(res.data))
        .catch(({ payload }) => {
          if (payload) {
            this.$loginOut()
          }
        })
    }
    this.getCategoryList()
    this.getBottom()
  },
  methods: {
    ...mapActions('home', ['getCategoryList', 'getBottom']),
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch('userCenter/getMessageStatus')
    next()
  },
}
</script>

<template lang="pug">
  #router
    keep-alive
      router-view( v-if="$route.meta.keepAlive")
    router-view(v-if="!$route.meta.keepAlive")
    Base
</template>
