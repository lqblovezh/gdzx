import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  methods: {
    getList(query) {
      let path = this.$route.path.split('/').pop()
      if (this.$route.path.split('/').includes('message')) {
        return this.$store.dispatch(`userCenter/messageList`, {
          type: path,
          ...this.page,
          ...query,
        })
      } else {
        return this.$store.dispatch(`userCenter/${path}List`, {
          ...this.page,
          ...query,
        })
      }
    },
    goStudy(item) {
      this.$go('/video', { course_id: item.id })
    },
    del(id) {
      let path = this.$route.path.split('/').pop()
      let message = path == 'teacher' ? '取消关注' : '删除'
      let type = path == 'class' ? '学习进度' : ''
      this.$confirm(`你是否确认${message}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$service.userCenter.del({ id, type: path }).then(
            res => {
              if (res && res.status) {
                this.getList()
                this.$message.success(`${message}${type}成功!`)
              }
            },
            ({ payload }) => {
              this.$message.error(payload.message)
            }
          )
        })
        .catch(err => {
          //console.log(err)
        })
    },
    pageChangeHandler(pageNum) {
      this.$go(this.$route.path, {
        ...this.$route.query,
        pageNum,
      })
    },
  },
  computed: {
    ...mapState({
      list: state => state.userCenter.list,
      page: state => state.userCenter.page,
    }),
  },
  mounted() {
    this.getList({ ...this.$route.query })
      .then(res => {})
      .catch(err => {
        if (err.message == '没有登录或登录超时') {
          this.$go('/home')
        }
      })
  },
  beforeRouteUpdate(to, from, next) {
    this.getList(to.query)
    next()
  },
}
