<script>
import ListCard from './comp/listCard'
import userMixins from './mixins'

export default {
  mixins: [userMixins],
  components: {
    ListCard,
  },
  methods: {
    goTest(item) {
      console.log(item)
      const { course_id: id, id: exam_id } = item
      this.$go(`/course/exam`, { id, exam_id, type: 'answer' })
    },
  },
}
</script>

<template lang="pug">
  .page-user-course 
    .group(v-for="item,index in list")
      ListCard(
        @goTest="goTest"
        :item="item"
        type="talk"
        :name="item.name"
        :score="item.score"
        :teacher="item.teach_name"
        :img="item.src_img"
        :course="item.course_name"
      )
    .no-data(v-if="!list.length")
      span 暂无测试报告
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
