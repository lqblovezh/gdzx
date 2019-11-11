<script>
import DetailCard from './comp/DetailCard'
import CommonHead from './comp/CommonHead'
import { mapActions } from 'vuex'
import teacherMixins from './mixins'

export default {
  mixins: [teacherMixins],
  asyncData({ store, route }) {
    return store.dispatch('teacher/getCourseByTid', route.query)
  },
  components: { DetailCard, CommonHead },
  methods: {
    go(item) {
      //console.log(item)
      this.$go('/course', { id: item.id })
    },
    ...mapActions('teacher', {
      getList: 'getCourseByTid',
    }),
  },
}
</script>


<template lang="pug">
  .page-teacher-course.page-teacher-same.c_f5_bg 
    .cbox.c_f_bg 
      .wrap 
        CommonHead(curr="course")
        .cbody
          .normal_ls_item_4
            .item(v-for="item in list" :key="item.id" @click="go(item)")
              CourseCard(
                :name="item.course_name"
                :des="item.abs"
                tag="服务"
                :num="item.class_users"
                :star="item.score"
                :price="item.price"
                :isBdLine="true"
                :imgUrl="item.img"
                :studied="item.study_count"
                :isBuy="item.user_speed_buy_status"
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
<style lang="stylus">
</style>
