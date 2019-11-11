<script>
import { mapState, mapGetters } from 'vuex'

export default {
  async asyncData({ store, route }) {
    const id = route.params.id
    return true
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      detail: state => state.course.courseDetail,
    }),
  },
  methods: {},
}
</script>


<template lang="pug">
  .page-course-detail 
    //- .group 
      .name.f18.c_3 适用人群
      .des.f14.c_5 对Android应用和框架开发有兴趣的在职开发人员、应届毕业生或基础良好的在校大学生
    .group 
      .name.f18.c_3 课程概述
      .des.f14.c_5 {{detail.abs}}
</template>
<style lang="stylus">
.page-course-detail
  padding 30px
  >div
    margin-bottom 20px
    >div
      line-height 40px
</style>
