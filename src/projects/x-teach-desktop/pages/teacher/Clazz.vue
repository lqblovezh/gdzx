<script>
import CommonHead from './comp/CommonHead'
import teacherMixins from './mixins'
import { mapActions } from 'vuex'

export default {
  mixins: [teacherMixins],
  asyncData({ store, route }) {
    return store.dispatch('teacher/getClassByTid', route.query)
  },
  components: { CommonHead },
  data() {
    return {}
  },
  methods: {
    go(item) {
      //console.log(item)
      this.$go('/course', { id: item.id })
    },
    ...mapActions('teacher', {
      getList: 'getClassByTid',
    }),
  },
}
</script>


<template lang="pug">
  .page-teacher-course.page-teacher-same.c_f5_bg 
    .cbox.c_f_bg 
      .wrap 
        CommonHead(curr="clazz")
        .cbody
          .normal_ls_item_4
            .item(v-for="item in list" :key="item.id" @click="go(item)")
              CourseCard(
                :name="item.course_info.course_name"
                :des="item.course_info.abs"
                tag="服务"
                :teachNum="item.student_count"
                :noPrice="true"
                :isBdLine="true"
                :imgUrl="item.course_info.img"
              )
            .no-data(v-if="!list.length")
              span 暂无班级
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
