<script>
import { mapState } from 'vuex'
import { notEmptyObj } from '@/utils/helpers'
export default {
  data () {
    return {
      options: {
        pullUpLoad: {
          txt: {
            more: '',
            noMore: '没有更多数据了~'
          }
        }
      },
      page: {
        pageStart: 0,
        pageOffset: 10
      },
      list: [],
      loaded: false
    }
  },
  computed: {
    isCourse() {
      const { type } = this.$route.query
      return type === 2 ? false : true
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.queryList({ clear: true, ...to.query })
    next()
  },
  mounted() {
    this.queryList({ clear: true, ...this.$route.query })
  },
  methods: {
    async queryList ({ clear = false, ...queries } = {}) {
      if (clear) {
        this.loaded = false
        this.page.pageStart = 0
      }
      try {
        const { data, page } = await this.$service.search.search({
          name,
          ...queries,
          ...this.page
        })
        if (data && !clear) {
          this.list = [...this.list, ...data]
        } else if (clear && data) {
          this.list = data
        } else {
          this.list = []
        }
        this.page.pageStart = this.list.length
        if (page.total <= this.list.length) {
          this.loaded = true
        }
      } catch(e) {
        this.list = []
      }
    },
    go (type) {
      const {
        name
      } = this.$route.query
      this.$router.replace({ path: 'result', query: {
        name,
        type
      }})
    },
    async onPullUp () {
      if (!this.loaded) {
        await this.queryList(this.$route.query)
      }
      this.$refs.scroll.forceUpdate()
    },
  }
}
</script>
<template lang="pug">
.search-result
  .tabbar.shadow
    .tabbar-nav(:class="{active: isCourse}" @click="go(1)") 课程
    .tabbar-nav(:class="{active: !isCourse}" @click="go(2)") 教师
  .search-result-list
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullUp"
    )
      layout-grid(v-if="isCourse")
        course-item(
          v-for="item, index in list"
          :key="`${index}_${Date.now().toString(16)}`"
          :info="item"
        )
      layout-grid(v-else)
        teacher-item(
          v-for="item, index in list"
          :key="`${index}_${Date.now().toString(16)}`"
          :info="item"
          :item-type="'result'"
        )
  .bg-wrapper.pf(v-show="!list.length")
    .bg-empty.pa
</template>
<style lang="stylus">
.search-result
  &-list
    position fixed
    top 1.95rem
    left 0
    right 0
    bottom 0
    background-color #FFF
  .grid-teacher-item
    margin-bottom 0.4rem
  .bg-wrapper
    top 1.78rem
    left 0
    bottom 0
    right 0
    .bg-empty
      width 100%
      top 50%
      transform translateY(-50%)
</style>