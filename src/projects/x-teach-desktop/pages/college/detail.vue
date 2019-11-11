<script>
import DetailCard from './comp/DetailCard'
import { mapState, mapGettersm, mapActions } from 'vuex'

export default {
  components: { DetailCard },
  asyncData({ store, route }) {
    return store.dispatch('intearal/getCollegeAll', route.query)
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      detail: state => state.intearal.collegeDetail,
      collegeCourse: state => state.intearal.collegeCourse,
      collegeCoursePage: state => state.intearal.collegeCoursePage,
    }),
  },
  methods: {
    pageChangeHandler(pageNum) {
      this.getCollegeCourse({ ...this.$route.query, pageNum })
    },
    ...mapActions('intearal', ['getCollegeCourse']),
  },
}
</script>

<template lang="pug">
NormalWrap
  .college-detail
    DetailCard(
      :name="detail.name"
      :english="detail.english_name"
      :imgUrl="detail.img"
      :motto="detail.school_motto"
      :address="detail.address"
      :abs="detail.abs"
    )
      .courseList
        .item.ib(v-for="item in collegeCourse" @click="$go('/course/detail' , {id:item.id})")
          HomeCard(
            type="simple" 
            :imgUrl="item.img"
            :name="item.course_name" 
            :time="item.create_time"
            :des="item.teacher+' | '+item.name"
            :isStar="false"
            :studied="item.study_count"
          )
        PageMy(
          @currentChange="pageChangeHandler"
          :total="collegeCoursePage.total"
          :pageOffset="collegeCoursePage.pageOffset"
          :pageNum="collegeCoursePage.pageNum"
        )
</template>

<style lang="stylus" scoped>
.college-detail
  width 1200px
  margin 20px auto 60px
  .courseList
    margin-top 10px
    >>>.comp-page
      padding-bottom 40px
      padding-top 10px
    .item
      width 250px
      margin-bottom 50px
      margin-right 46px
      border 1px solid #e0e0e0
      border-radius 4px
      box-sizing border-box
      &:nth-of-type(4n)
        margin-right 0
      >>> .comp-card
        .img
          img
            width 100%
            height 140px
</style>
