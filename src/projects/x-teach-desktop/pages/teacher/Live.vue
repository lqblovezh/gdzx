<script>
import DetailCard from './comp/DetailCard'
import CommonHead from './comp/CommonHead'
import { mapActions } from 'vuex'
import teacherMixins from './mixins'

export default {
  components: { DetailCard, CommonHead },
  mixins: [teacherMixins],
  asyncData({ store, route }) {
    return store.dispatch('teacher/getLivesByTid', route.query)
  },
  methods: {
    go(item) {
      //console.log(item)
    },
    ...mapActions('teacher', {
      getList: 'getLivesByTid',
    }),
  },
}
</script>


<template lang="pug">
  .page-teacher-course.page-teacher-same.c_f5_bg 
    .cbox.c_f_bg 
      .wrap 
        CommonHead(curr="live")
        .cbody
          .normal_ls_item_horizon
            .item(v-for="item in list" :href="item.url" target="_blank" )
              HorizonCard(
                :name="item.title"
                :des="item.introduce"
                num="100"
                :time="item.start_time"
                :imgUrl="item.img"
                :url="item.url"
              )
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
