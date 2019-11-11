<script>
import { mapState, mapActions } from 'vuex'

export default {
  asyncData({ store, route }) {
    store.dispatch('course/getCollegeList', { clear: true })
    return store.dispatch('home/getCategoryData', route.query)
  },
  beforeMount() {
    // 防止右侧突出,扩大宽度
  },
  beforeRouteLeave(to, from, next) {
    // clean data
    this.$store.state.home.categoryCourseList = []
    next()
  },
  created() {},
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch('home/getCategoryCourse', to.query)
    next()
  },
  beforeRouteLeave(to, from, next) {
    let home = this.$store.state.home
    home.categoryList = []
    home.categoryChildList = []
    home.categoryCourseList = []
    next()
  },
  data() {
    return {
      searchName: '',
      modelList: [
        { name: '全部', type: 'all' },
        { name: '随堂课程', type: 'chapel', id: '1' },
        { name: '自学课程', type: 'self', id: '2' },
        { name: '免费课程', type: 'open', id: '3' },
      ],
    }
  },
  watch: {
    '$route.query.id': () => {
      // console.log('change')
    },
  },
  methods: {
    go(item) {
      this.$go('/course/detail', { id: item.id })
    },
    changeCategory(type, item) {
      // this.unCheck()
      // item.checked = true
      // this.$store.state.home.categoryChildList = item.children
      let data = {
        ...this.$route.query,
      }
      data[type] = item.id
      this.$go('/category', data)
    },
    changeCategoryChild(item) {
      this.$go('/category', { ...this.$route.query, id: item.id })
    },
    pageChangeHandler(pageNum) {
      this.$go('/category', { ...this.$route.query, pageNum })
    },
    unCheck() {
      this.categoryList.forEach(item => (item.checked = false))
    },
    search() {
      const { query } = this.$route
      this.$go('/category', { id: query.id, name: this.searchName })
    },
    proClass() {
      let first = this.categoryList.find(item => item.checked)
      if (first) {
        this.$go('/category', { id: first.id })
      }
    },
    ...mapActions('course', ['getCollegeList']),
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList,
      categoryChildList: state => state.home.categoryChildList,
      categoryCourseList: state => state.home.categoryCourseList,
      categoryCoursePage: state => state.home.categoryCoursePage,
      rankFree: state => state.home.rankFree,
      rankPay: state => state.home.rankPay,
      collegeList: state => state.course.collegeList,
      collegePage: state => state.course.collegePage,
    }),
    isAll() {
      return !this.categoryChildList.find(
        item => item.id == this.$route.query.id
      )
    },
    isShowMore() {
      return this.collegeList.length - 1 < this.collegePage.total
    },
  },
}
</script>

<template lang="pug">
div 
  NormalWrap
    .page-category 
      .cate-wrap.cbox 
        .line.firts
          .label 课程分类：
          .ls.f14.top-items
            .item.active_border( 
              v-for="item in categoryList"
              :key="item.id"
              @click="changeCategoryChild(item)"
              :class="{ active : item.checked}"
            )  {{item.name}}
        //- .line.second
        //-   .label 专业分类：
        //-   .ls.f14
        //-     .item.active_normal(:class="{ active : isAll}" @click="proClass") 全部
        //-     .item.active_normal( 
        //-       v-for="citem in categoryChildList"
        //-       @click="changeCategoryChild(citem)"
        //-       :class="{ active : citem.checked }"
        //-       :key="citem.id"
        //-     )  {{citem.name}}
        .line.firts
          .label 模式：
          .ls.f14.top-items
            .item.active_border( 
              v-for="item in modelList"
              :key="item.id"
              @click="changeCategory('effective_status',item)"
              :class="{ active : $route.query.effective_status == item.id}"
            )  {{item.name}}
        .line.firts
          .label 院校：
          .ls.f14.top-items
            .item.active_border( 
              v-for="item in collegeList"
              :key="item.id"
              @click="changeCategory('university_id',item)"
              :class="{ active : $route.query.university_id == item.id}"
            )  {{item.name}}
            .item.active_border(v-if="isShowMore" @click="getCollegeList") 更多>>
      .container-wrap
        .cbox
          .main-wrap
            .search-wrap.bd-line
              el-input(v-model="searchName" size="small" clearable placeholder="课程名称")
              Tbutton.search-btn.ml20(icon="search-white" @click.native="search"  size="samll")
            .normal_ls_item_4(v-if="categoryCourseList.length")
              .item(
                v-for="item in categoryCourseList" 
                :key="item.id"
                @click="go(item)"
              )
                HomeCard(
                  type="simple" 
                  :imgUrl="item.img"
                  :name="item.course_name" 
                  :time="item.create_time"
                  :des="item.teacher_user+' | '+item.university_name"
                  :isStar="false"
                  :studied="item.study_count"
                )
                //- CourseCard(
                //-   :name="item.course_name"
                //-   :des="item.abs"
                //-   tag=""
                //-   :teacher="false"
                //-   :num="false"
                //-   :price="item.price"
                //-   :imgUrl="item.img"
                //-   :star="item.score"
                //-   :studied="item.study_count"
                //-   :isBuy="item.user_speed_buy_status"
                //- )
              .page-wrap 
                PageMy(
                  @currentChange="pageChangeHandler"
                  :total="categoryCoursePage.total"
                  :pageOffset="categoryCoursePage.pageOffset"
                  :pageNum="categoryCoursePage.pageNum"
                )
            .no-data(v-else) 暂无数据    
            .rank-wrap
              RankList(
                :rankFree="rankFree"
                :rankPay="rankPay"
              )   
</template>
<style lang="stylus" scoped>
.page-category
  >.cate-wrap
    margin 20px auto
    background #fff
    padding 13px 20px
    box-sizing border-box
    >.line
      line-height 50px
      color #2d4148
      margin-bottom 1px
      position relative
      >.label
        display inline-block
        min-width 70px
        font-size 14px
        text-align right
        position absolute
        left 0
        top 0
      >.ls
        display inline-block
        padding-left 75px
      >.top-items
        >.item
          display inline-block
          margin-right 30px
          cursor pointer
          box-sizing border-box
      &.second
        >.ls
          >.item
            display inline-block
            margin-right 30px
            cursor pointer
  >.container-wrap
    background #f5f5f5
    padding-bottom 100px
    >.cbox
      >.main-wrap
        background #fff
        position relative
        min-height 514px
        >.search-wrap
          height 70px
          line-height 70px
          padding-left 33px
          .el-input
            width 240px
        >.normal_ls_item_4
          .item
            >>>.comp-card
              .wrap
                .img img
                  border-radius initial
                .other
                  border 1px solid #e0e0e0
                  border-top none
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
