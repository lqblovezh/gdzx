<script>
import BannerNav from './comp/BannerNav'
import { mapState } from 'vuex'

export default {
  asyncData({ store, route }) {
    return store.dispatch('intearal/getCollegeIndex', route.query)
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch('intearal/getCollegeIndex', to.query)
    next()
  },
  data() {
    return { searchName: '' }
  },
  components: { BannerNav },
  methods: {
    go(item) {
      this.$go('/college-detail', { id: item.id })
    },
    pageChangeHandler(pageNum) {
      this.$go('/colleges', { ...this.$route.query, pageNum })
    },
    search() {
      const { query } = this.$route
      this.$go('/colleges', { id: query.id, name: this.searchName, pageNum: 1 })
    },
  },
  computed: {
    ...mapState({
      collegeList: state => state.intearal.collegeList,
      collegePage: state => state.intearal.collegePage,
      collegeBanner: state => state.intearal.collegeBanner,
    }),
  },
}
</script>

<template lang="pug">
div
  NormalWrap(cname="opacity")
    .page-college
      .container-wrap
        .banner(v-if="Object.entries(collegeBanner).length")
          BannerNav(:navList="collegeBanner")
        .cbox
          .main-wrap
            .search-wrap.bd-line
              el-input(v-model="searchName" size="small" placeholder="院校名称" clearable)
              Tbutton.search-btn.ml20(icon="search-white" @click.native="search"  size="samll")
            .normal_ls_item_4(v-if="collegeList.length")
              .item(
                v-for="item in collegeList"
                :key="item.id"
                @click="go(item)"
              )
                CourseCard(
                  type="college"
                  :name="item.name"
                  :noPrice="true"
                  :des="item.english_name"
                  :motto="item.school_motto"
                  :teacher="false"
                  :num="item.course_count"
                  :imgUrl="item.img"
                )
              .page-wrap
                PageMy(
                  @currentChange="pageChangeHandler"
                  :total="collegePage.total"
                  :pageOffset="collegePage.pageOffset"
                  :pageNum="collegePage.pageNum"
                )
            .no-data(v-else) 暂无数据
</template>
<style lang="stylus" scoped>
.page-college
  >.container-wrap
    background #f5f5f5
    padding-bottom 100px
    >.cbox
      margin-top 20px
      >.main-wrap
        background #fff
        position relative
        min-height 514px
        >.search-wrap
          height 70px
          line-height 70px
          padding-left 30px
          border-bottom 1px solid #ebebeb
          .el-input
            width 240px
        >.rank-wrap
          width 250px
          background #fff
          position absolute
          z-index 10
          top 0
          right -30px
          transform translateX(100%)
          transition all 0.2s ease-in-out
</style>
