<script>
import { mapState, mapActions } from 'vuex'

export default {
  asyncData({ store, route }) {
    return store.dispatch('lives/getList')
  },
  data() {
    return {
      query: {
        title: '',
        teacher_name: '',
        time_start: '',
        time_end: '',
      },
      picker: null,
    }
  },
  computed: {
    ...mapState({
      list: state => state.lives.list,
      page: state => state.lives.page,
    }),
  },
  methods: {
    go(item) {
      //console.log(item.url)
      console.log(item)
    },
    search() {
      this.getList({ ...this.query })
    },
    itemClickHandler(item) {
      console.log(item)
      location.href = item.url
    },
    getTime(time) {
      if (!time) {
        time = ['', '']
      }
      this.query.time_start = time[0]
      this.query.time_end = time[1]
    },
    ...mapActions('lives', ['getList']),
  },
}
</script>


<template lang="pug">
  .page-teacher-list 
    Top(:search="false")
    //- TopNav( :activeIndex="2")
    .wrap.c_f5_bg
      .conatiner.cbox.c_f_bg
        .search-wrap.vm-all
          input.bd_e.c_theme( placeholder="名称" v-model="query.title")
          input.bd_e.c_theme.ml20(placeholder="教师" v-model="query.teacher_name")
          el-date-picker.ml20(
            v-model="picker"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            size="small"
            @change="getTime"
          )
          Tbutton.search-btn.ml20(icon="search-white" @click.native="search()" size="samll")
        .list-wrap 
          .ls.normal_ls_item_4 
            a.item.ib(v-for="item in list"
              target="_blank"
              :href="item.url"
            )
              CourseCard(
                :name="item.title"
                :teacher="item.teacher_name"
                :time="item.start_time"
                :des="item.introduce"
                :imgUrl="item.img"
                :noPrice="true"
              )
          .page
            Page(:total="page.total")
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
