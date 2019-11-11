import arrayFindIndex from 'array-find-index'
import { isArray } from '@/utils/helpers'
export default {
  data() {
    return {
      list: [],
      page: {
        pageStart: 0,
        pageOffset: 10
      },
      options: {
        pullUpLoad: {
          txt: {
            more: '',
            noMore: '没有更多数据了~'
          }
        }
      },
      loaded: false
    }
  },
  methods: {
    async fetch(flag) {
      if (flag) {
        this.page.pageStart = 0
      }
      try {
        const { data, page } = await this.$service.message.getMsg({
          ...this.page,
          type: this.msg_type
        })
        if (isArray(data)) {
          this.list = flag ? data : [...this.list, ...data]
          this.page.pageStart = this.list.length
          if (page.total <= this.list.length) {
            this.loaded = true
          }
        }
      } catch (e) {
        this.$catchError(e)
      }
    },
    async onPullUp() {
      if (!this.loaded) {
        await this.fetch()
      }
      this.$refs.scroll.forceUpdate(true, this.loaded)
    },
    del(item) {
      this.$MessageBox.confirm('确定删除？').then(action => {
        this.$service.message.delMsg({
          id: item.id
        }).then(() => {
          let index = arrayFindIndex(this.list, v => v.id === item.id)
          this.list.splice(index, 1)
        })
      }).catch(console.warn)
    }
  }
}