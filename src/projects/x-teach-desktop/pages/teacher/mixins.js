import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  methods: {
    pageChangeHandler(pageNum) {
      this.$go(this.$route.path.split(restUrl)[1], {
        ...this.$route.query,
        pageNum,
      })
    },
  },
  computed: {
    ...mapState({
      list: state => state.teacher.list,
      page: state => state.teacher.page,
    }),
  },
  beforeRouteUpdate(to, from, next) {
    this.getList(to.query)
    next()
  },
}
