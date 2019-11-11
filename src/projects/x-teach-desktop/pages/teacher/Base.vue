<script>
import { mapState, mapMutations } from 'vuex'
import DetailCard from './comp/DetailCard'

export default {
  asyncData({store,route}) {
    return store.dispatch('teacher/getTeacherDate',route.query)
  },
  components: { DetailCard },
  computed: {
    ...mapState({
      teacher: state => state.teacher.teacher,
    })
  },
  created() {
    this.setPage()
  },
  methods: {
    ...mapMutations('teacher/',[
      'setPage',
    ])
  }
}
</script>


<template lang="pug">
  div 
    NormalWrap 
      .page-teacher-base 
        DetailCard(v-if="teacher" :teacher="teacher")
        .router
          router-view

</template>


<style lang="stylus">
.page-teacher-base
  .router
    .no-data
      background #fdfdfd
      text-align center
      height 600px
      display flex
      flex-direction column
      justify-content center
      color #adadad
      border 1px solid #efefef
</style>
