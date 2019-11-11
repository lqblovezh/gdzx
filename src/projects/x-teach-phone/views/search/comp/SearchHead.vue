<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    goSearch () {
      this.$addWordToHistory(this.keyword)
      const {
        path
      } = this.$route
      if (/\/search\/result/.test(path)) {
        this.$router.replace({ path: 'result', query: {
          name: this.keyword,
          type: this.$route.query.type || 1
        }})
        return
      }
      this.$go('search/result', { name: this.keyword, type: 1 })
    },
    setKeyword (keyword) {
      this.keyword = keyword ? keyword : ''
    }
  },
  mounted () {
    const { name } = this.$route.query
    this.setKeyword(name)
  },
  watch: {
    '$route' (to) {
      const { name } = to.query
      this.setKeyword(name)
    }
  }
}
</script>
<template lang="pug">
.search-head.c_bg_theme.flex-center
  .search-head__left.text-center
    .icon-back(@click="$back()")
  form(action="#" method="post" @submit.prevent="goSearch")
    span.icon-search__s
    input(type="text" placeholder="搜索课程" v-model="keyword")
    button.hidden(type="submit")
  p.cancel.text-center.c-f.f14(@click="$back()") 取消
</template>
<style lang="stylus">
.search-head
  height 0.88rem
  width 100%
  >.search-head__left
    width 48.5px
  form
    width 100%
    flex 1
    height 0.5rem
    margin 0.2rem 0
    .icon-search__s
      position absolute
      left 10px
      top 0.1rem
    input
      text-indent 2.8em
  >.cancel
    width 48.5px
</style>