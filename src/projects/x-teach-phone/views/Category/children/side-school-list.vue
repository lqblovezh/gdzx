<template lang="pug">
.side-school-list
  cube-scroll(
    ref="scroll"
    :options="options"
    @pulling-up="onPullUp"
  )
    .side-school-item(
      v-for="item in list"
      :key="item.id"
      :class="{'is-active': id === item.id }"
      @click="clickHandler(item)"
    ) {{ item.name }}
</template>
<script>
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  data() {
    return {
      id: '',
      options: {
        click: true,
      },
    }
  },
  mounted() {
    this.fetch(true)
  },
  methods: {
    queryList(page) {
      return this.$service.university
        .getList({ ...page, pageOffset: 20 })
        .then(res => {
          if (!this.list.length) {
            res.data.unshift({
              name: '全部',
              id: '',
            })
          }
          return res
        })
    },
    clickHandler(item) {
      if (this.id !== item.id) {
        this.id = item.id
        this.$emit('change', item)
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/var.styl'

.side-school-list
  height 100%
  width 70%
  padding 0 0.3rem
  background-color $color-white
  box-sizing border-box
  font-size 14px
  color #333
  .side-school-item
    height 0.6rem
    line-height 0.6rem
    border-bottom 1px solid #f0f0f0
    &.is-active
      color $theme-color
</style>
