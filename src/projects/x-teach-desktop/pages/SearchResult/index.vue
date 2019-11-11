<script>
import { mapState } from 'vuex'
export default {
  asyncData({ store, route }) {
    return store.dispatch('search/getData', route.query)
  },
  beforeDestroy() {
    this.formdata.type = '1'
    this.formdata.name = ''
  },
  async beforeRouteUpdate(to, from, next) {
    // 避免数据混乱
    await this.$store.dispatch('search/getData', to.query)
    next()
  },
  computed: {
    ...mapState({
      list: state => state.search.list,
      formdata: state => state.search.formdata,
      courseList: state => state.search.courseList,
      page: state => state.search.page,
    }),
  },
  data() {
    return {
      resIndex: 1,
    }
  },
  methods: {
    changeRes(item) {
      // this.resIndex = index
      // this.formdata.type = item.type
      this.$go('/search', { ...this.formdata, pageNum: 1, type: item.type })
    },
    pageChangeHandler(pageNum) {
      this.$go('/search', { ...this.formdata, pageNum })
    },
  },
}
</script>

<template lang="pug">
  div
    NormalWrap
      .page-search-result
        .classification.c_f_bg
          .wrap
            .main-item 分类
            .item.active_border(
              v-for="item,key in list"
              @click="changeRes(item)"
              :class="{ active : $route.query.type === item.type }"
            )
              span.txt {{item.name}}
        .container-wrap
          .container.cbox
            .conut
              HighlightTxt(
                :val="`为您找到 ${formdata.name} 的相关结果：${page.total}个`"
                :tag="[formdata.name]"
              )
            .res-list
              .normal_ls_item_4
                .item(
                  v-for="item in courseList"
                  :key="item.id"
                )
                  CourseCard(
                    @click.native="$go('/course/detail',{id:item.id})"
                    v-if="$route.query.type ==='1'"
                    :name="item.course_name"
                    :des="item.abs"
                    :price="item.price"
                    :star="item.score"
                    :tag="formdata.name"
                    teacher=""
                    num=""
                    studied=""
                    :imgUrl="item.img"
                  )
                  CourseCard(
                    @click.native="$go('/teacher/course',{id:item.id})"
                    v-if="$route.query.type === '2'"
                    :name="item.nick_name"
                    :des="item.summary"
                    :organization="item.school"
                    tag=" "
                    :imgUrl="item.picture_absolute"
                    :noPrice="true"
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
.page-search-result
  .classification
    height 53px
    line-height 53px
    >.wrap
      width 1200px
      margin 0 auto
      >div
        margin-right 30px
        user-select none
      >.main-item
        display inline-block
        color #999999
      >.item
        display inline-block
        color #4d4d4d
        box-sizing border-box
        height 53px
        cursor pointer
        font-size 16px
  >.container-wrap
    background #f5f5f5
    padding 0px 0 56px 0
    >.container
      >.conut
        height 56px
        line-height 56px
      >.res-list
        min-height 500px
        background #fff
</style>
