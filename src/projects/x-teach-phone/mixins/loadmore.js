import { isArray } from '@/utils/helpers'
export default {
  data() {
    return {
      list: [],
      total: 0,
      page: {
        pageStart: 0,
        pageOffset: 10,
      },
      options: {
        pullUpLoad: {
          txt: {
            more: '',
            noMore: '没有更多数据了~',
          },
        },
        click: false,
      },
      loaded: false,
    }
  },
  methods: {
    async fetch(flag = false) {
      try {
        if (flag) {
          this.page.pageStart = 0
        }
        const { page, data } = await this.queryList({
          ...this.page,
        })
        if (isArray(data)) {
          this.list = flag ? data : [...this.list, ...data]
          this.page.pageStart = this.list.length
          this.total = page.total
          if (page.total <= this.list.length && !flag) {
            this.loaded = true
          } else {
            this.loaded = false
          }
        }
      } catch (e) {
        this.$catchError(e)
      }
    },
    async onPullingDown() {
      await this.fetch(true)
      setTimeout(() => {
        this.$refs.scroll.forceUpdate(true, false)
      }, 20)
    },
    async onPullUp() {
      if (!this.loaded) {
        await this.fetch()
      }
      setTimeout(() => {
        this.$refs.scroll.forceUpdate(true, this.loaded)
      }, 20)
    },
    refresh() {
      this.$refs.scroll.refresh()
    },
  },
}
