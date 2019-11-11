<template lang="pug">
.container
  SchoolHeader(:title="headerTitle")
  .school-detail
    cube-scroll(
      ref="scroll"
      :options="options"
      @pulling-up="onPullUp"
    )
      school-info(:info="info")
      .content.container
        school-intro(:abs="info.abs")
        .school-detail-course
          .title 课程
          course-item-cell(
            v-for="item in list"
            :key="item.id"
            :item="item"
            type="college"
          )
</template>
<script>
import SchoolInfo from './children/school-info'
import SchoolIntro from './children/school-intro'
import SchoolHeader from './children/school-header'
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  components: { SchoolInfo, SchoolIntro,SchoolHeader },
  data () {
    return {
      headerTitle:'院校详情',
      info: {},
      options: {
        click: true
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init() {
      this.queryCollegeInfo()
      this.fetch(true)
    },
    async queryCollegeInfo () {
      const { id } = this.$route.params
      try {
        const { data } = await this.$service.university.detail({ id })
        this.info = data
      } catch(e) {
        this.$catchError(e)
      }
    },
    queryList (params) {
      const { id } = this.$route.params
      return this.$service.university.getInfoList({ _id: id, ...params })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .school-detail
    height 100%
    .content
      overflow hidden
    > div
      background-color #fff
      .title
        font-size 15px
        color #222
    &-course
      margin-bottom 0.3rem
</style>
