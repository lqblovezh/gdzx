<script>
import { mapState, mapActions } from 'vuex'

export default {
  asyncData({store,route}) {
    return store.dispatch('teacher/getList',route.query)
  },
  data() {
    return {
      query: {
        name: '',
        company: '',
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.teacher.list,
      page: state => state.teacher.page
    })
  },
  methods: {
    go(item) {
      this.$go('/teacher/course', {
        id: item.id,
      })
    },
    pageChangeHandler(pageNum) {
      this.$go('/teacher-list', { ...this.$route.query, pageNum })
    },
    search() {
      this.getList({...this.query})
    },
    ...mapActions('teacher',[
      'getList'
    ])
  },
  beforeRouteUpdate(to, from, next) {
    this.getList(to.query)
    next()
  },
}
</script>


<template lang="pug">
  .page-teacher-list 
    Top(:search="false")
    //- TopNav( :activeIndex="1")
    .wrap.c_f5_bg
      .conatiner.cbox.c_f_bg
        .search-wrap.vm-all
          input.bd_e.c_theme(placeholder="教师名称" v-model="query.name")
          input.course_inp.c_f5_bg.ml20(placeholder="单位" v-model="query.company")
          Tbutton.search-btn.ml20(icon="search-white" @click.native="search" size="samll")
        .list-wrap 
          .ls.normal_ls_item_4 
            .item.ib(v-for="item in list"
              @click="go(item)"
            )
              TeacherCard(
                :name="item.nick_name"
                :des="item.summary"
                tag="服务"
                :noPrice="true"
                :organization="item.company||'&nbsp;'"
                :imgUrl="item.picture_absolute"
              )
          .page-wrap 
            PageMy(
              @currentChange="pageChangeHandler"
              :total="page.total"
              :pageOffset="page.pageOffset"
              :pageNum="page.pageNum"
            )
    MainFooter            
</template>
<style lang="stylus">
.page-teacher-list
  >.wrap.c_f5_bg
    padding 30px 0 70px 0
    >.conatiner.cbox.c_f_bg
      >.search-wrap
        height 70px
        line-height 70px
        border-bottom 1px solid #eee
        padding 0 30px
      >.list-wrap
        min-height 600px
        >.ls
          >.item
            color red
</style>
