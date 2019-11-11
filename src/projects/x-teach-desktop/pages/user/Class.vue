<script>
import ListCard from './comp/listCard'
import userMixins from './mixins'

export default {
  mixins: [userMixins],
  components: {
    ListCard,
  },
  async asyncData({ store, route }) {
    const id = route.params.id
    //console.log('id:=========>  ' + id)
  },
  data() {
    return {
      imgUrl: 'https://img4.sycdn.imooc.com/szimg/5b17bad10001535305400300.jpg',
    }
  },
  methods: {
    detail(item) {
      //console.log('详细2',item)
    },
  },
}
</script>

<template lang="pug">
  .page-user-course
    .group(v-for="item in list" :key="item.id")
      ListCard(
        @goStudy="goStudy(item.course_info)"
        :item="item"
        type="class"
        :name="item.class_name"
        :time="item.end_speed_time"
        :img="item.course_info.img"
        :percentage="$tianKenPercentage(item.course_info.user_speed_time_protion)"
      )
    .no-data(v-if="!list.length")
      span 暂未加入班级
    .page-wrap
      PageMy(
        @currentChange="pageChangeHandler"
        :total="page.total"
        :pageOffset="page.pageOffset"
        :pageNum="page.pageNum"
      )
</template>

<style lang="stylus">
</style>
