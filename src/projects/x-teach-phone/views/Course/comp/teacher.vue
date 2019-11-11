<script>
export default {
	props: {
    teachUser: {
      type: Object,
      default() {
        return {}
      }
    },
    courseRelev: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    viewTeacherInfo () {
      this.$goByName('teacher_detail', {
        query: {
          userId: this.teachUser.id
        }
      })
    }
  }
}
</script>
<template lang="pug">
.course-padding
  .teacher-info
    .teacher-info__head
      img.circle(:src="teachUser.picture_absolute" @click="viewTeacherInfo")
      .teacher-info__detail
        .teacher-info__name {{teachUser.nick_name}}
        p 学历：
          span {{teachUser.education}}
        p 职称：
          span {{teachUser.duties}}
        p 职务：
          span 院长
        p 邮箱：
          span {{teachUser.email}}
    .teacher-info__intro
      p 简介：
        span {{teachUser.summary}}
  .line-part
  .related-courses.c-bg-f(v-show="courseRelev && courseRelev.length>0")
    p 相关课程
    layout-grid
      course-item(v-for="item in courseRelev" :info="item" :key="item.id")
</template>
<style lang="stylus" scoped>
.line-part
  margin-left -0.3rem
  margin-right -0.3rem
.teacher-info
  padding 0 0.3rem 0.4rem
  .teacher-info__head
    display flex
  img
    margin-right 0.2rem
    width 2.1rem
    height 2.4rem
  .teacher-info__detail
    .teacher-info__name
      margin-bottom 0.2rem
  p
    line-height 0.46rem
    font-size 14px
    span
      color #808080
.related-courses
  margin-left -0.3rem
  margin-right -0.3rem
  p
    padding 0.4rem 0.3rem 0.4rem
    color #212121
    font-size 14px
</style>
