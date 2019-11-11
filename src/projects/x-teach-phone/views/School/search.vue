<template lang="pug">
  cube-scroll(
    ref="scroll"
    :options="options"
    @pulling-up="onPullUp"
  )
    .course-search-result
      .ev-tips.f15 搜索结果
        span.f13 （共{{ page.total }}条）
      .list
        school-item(
          v-for="item in list"
          :key="item.id"
          :item="item"
        )
</template>
<script>
import SchoolItem from './children/school-item'
import loadmore from '@/mixins/loadmore'
export default {
  mixins: [loadmore],
  data () {
    return {
      list: []
    }
  },
  components: { SchoolItem },
  mounted () {
    this.search(true)
  },
  beforeRouteUpdate(to, from, next) {
    const {name} = to.query
    this.search(true, name)
    next()
  },
  methods: {
    async search (flag, college_name) {
      if (flag) {
        this.page.pageStart = 0
        this.list = []
      }
      let { name } = this.$route.query
      name = college_name ? college_name:name
      try {
        const { data, page } = await this.$service.university.getList({name, ...this.page})
        if (data && data.length) {
          this.list = flag ? data : [...this.list, ...data]
          this.page.pageStart = this.list.length
        }
        this.page.total = page.total
        if (page.total <= this.list.length) {
          this.loaded = true
        }
      } catch(e) {
        this.$catchError(e)
      }
    },
    onPullUp () {
      if (!this.loaded) {
        this.search()
      }
      this.$refs.scroll.forceUpdate(true, true)
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .course-search-result
    padding $layout-padding
    background-color #FFF
    .ev-tips
      color #222
</style>