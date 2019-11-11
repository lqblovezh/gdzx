<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  asyncData({ store, route }) {
    const { params, query } = route
    store.dispatch('course/init', { ...params, ...query })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.course_id && to.params.course_id !== from.params.course_id) {
      this.init({ ...to.params }).finally(next)
    } else {
      next()
    }
  },
  methods: {
    ...mapActions('course', ['init']),
    queryInfo () {
      const { query, params } = this.$route
      this.init({ ...query, ...params })
    }
  },
  watch: {
    '$route' (to, from) {
      const { course_id: to_id } = to.params
      const { course_id: from_id } = from.params
      // console.log(to_id, from_id)
      // 如果切换导致再次请求课程数据，在次处理
    }
  }
}
</script>
<template lang="pug">
.page-course
  router-view
</template>
