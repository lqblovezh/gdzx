<template lang="pug">
  .index-course-item.between-layout(@click="$goWithName('course', { course_id: course_info.id })")
    img(v-lazy="course_info.img")
    .index-course-info
      .name
        h3.ell.f15 {{ course_info.course_name }}
        .teacher.f13 {{ course_info.teacher_user||course_info.teacher }} | {{ course_info.university_name || course_info.name }}
      .flex-bs.info.f12
        .time {{ course_info.create_time|dateFormat }}
        .right.inline-flex
          .icon.i-persons
          | {{ course_info.study_count }}
</template>
<script>
export default {
  name: 'course-item-cell',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default: 'course'
    }
  },
  computed: {
    course_info () {
      return this.type === 'college'?this.item: (this.item.info || {})
    }
  },
  filters: {
    dateFormat (value) {
      let matched = null
      if (value) {
        matched = value.match(/\d{4}-\d{2}-\d{2}/)
      }
      return matched?matched[0]:value
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .index-course-item
    margin-top 0.3rem
    img
      margin-right 0.2rem
      width 2.85rem
      height 1.8rem
      border-radius 0.1rem
    .index-course-info
      h3
        margin 0.1rem 0 0.13rem
        color $text-color-4
      .teacher
        color #777
      .info
        margin-bottom 0.04rem
        color #7c8089
        .right
          > div
            margin-right 0.1rem
</style>