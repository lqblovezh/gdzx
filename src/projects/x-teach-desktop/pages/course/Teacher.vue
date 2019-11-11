<script>
import TeacherCard from './comp/TeacherCard'
import { mapState, mapGetters } from 'vuex'
export default {
  components: { TeacherCard },
  computed: {
    ...mapState({
      detail: state => state.course.courseDetail,
    }),
  },
  mounted() {
    if (this.detail.teach_user.id) {
      this.getList()
    }
  },
  data() {
    return {
      list: [],
      page: {
        pageNum: 1,
        pageOffset: 12,
        total: 1,
      },
    }
  },
  methods: {
    go(item) {
      this.$go('/course/detail', { id: item.id })
    },
    getList() {
      return this.$service.teacher
        .getCourseByTid({ id: this.detail.teach_user.id, ...this.page })
        .then(res => {
          //console.log(res)
          this.list = res.data
          res.page.total = res.page.total
          res.page.pageNum = res.page.num
        })
    },
    pageChangeHandler(pageNum) {
      this.page.pageNum = pageNum
      this.getList()
    },
  },
}
</script>


<template lang="pug">
  .page-course-step(v-if="detail.teach_user.id")
    .teacher
      TeacherCard(
        :imgUrl="detail.teach_user.picture_absolute"
        :name="detail.teach_user.nick_name"
        :education="detail.teach_user.education"
        title=""
        :job="detail.teach_user.duties"
        :abstract="detail.teach_user.summary"
        :email="detail.teach_user.email"
      )
    .course 
      .name.c_3.f18 相关课程 
      .normal_ls_item_4
        .item(v-for="item in list" :key="item.id" @click="go(item)")
          CourseCard(
            :name="item.course_name"
            :des="item.des"
            tag=""
            :teacher="false"
            :num="false"
            :price="item.price || '免费'"
            :imgUrl="item.img"
          )
    .page  
      PageMy(
        @currentChange="pageChangeHandler"
        :total="page.total"
        :pageOffset="page.pageOffset"
        :pageNum="page.pageNum"
      )
</template>


<style lang="stylus">
.page-course-step
  padding-bottom 70px
  >.teacher
    margin 30px
    padding-bottom 50px
    border-bottom 1px solid #e9eef0
  >.course
    >.name
      padding 0 30px
</style>
