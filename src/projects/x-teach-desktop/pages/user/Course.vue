<script>
import ListCard from './comp/listCard'
import userMixins from './mixins'

export default {
  mixins: [userMixins],
  components: {
    ListCard,
  },
  methods: {
    detail(item) {
      this.$go('/course/detail', { id: item.id })
    },
  },
}
</script>

<template lang="pug">
  .page-user-course 
    .group(v-for="item in list")
      ListCard(
        @goStudy="detail(item)"
        :item="item"
        :name="item.course_name"
        :time="item.end_speed_time"
        :img="item.img_src"
        :percentage="item.user_speed_time&&item.user_speed_time_protion.replace('%','')*1||0"
      )
    .no-data(v-if="!list.length")
      span 暂无课程
    .page-wrap 
      PageMy(
        @currentChange="pageChangeHandler"
        :total="page.total"
        :pageOffset="page.pageOffset"
        :pageNum="page.pageNum"
      )
</template>

<style lang="stylus"></style>
