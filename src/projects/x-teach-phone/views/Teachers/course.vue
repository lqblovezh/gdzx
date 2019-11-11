<script>
import loadmoreMixin from '@/mixins/loadmore'

export default {
  mixins: [loadmoreMixin],
  data() {
    return {
      list: [],
      scrollY: 0,
    }
  },
  computed: {
    setHeight() {
      let height = ['1.4rem', '2.4rem']
      if (typeof device != 'undefined' && device.platform == 'iOS') {
        height = ['2rem', '3rem']
      }
      if (this.$route.path == '/market') {
        return `height: calc(90vh - ${height[0]})`
      }
      return `height: calc(90vh - ${height[1]})`
    },
  },
  methods: {
    fetch() {
      const { userId } = this.$route.query
      this.$service.teacher.getCourseByTid({ id: userId }).then(res => {
        this.list = res.data
      })
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
  },
  watch: {
    scrollY(newY) {
      this.$emit('scroll', newY)
    },
  },
}
</script>
<template lang="pug">
.course-list
  p.course-tips.container(v-show="!list || list.length == 0") 暂无数据
  //- CourseList(:list="list" showPrice="true")
  cube-scroll(
    ref="scroll"
    class="mall-books"
    :scroll-events="['scroll']"
    :options="options"
    @pulling-up="onPullUp"
    @scroll="scroll"
    :style="setHeight"
  )
    layout-grid
      course-item(
        v-for="(item, index) in list"
        :key="item.id"
        :info="item"
        show-price
      )
</template>
<style lang="stylus" scoped>
.course-list
  padding-top 0.3rem
</style>
