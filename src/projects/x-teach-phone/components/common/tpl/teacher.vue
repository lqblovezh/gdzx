<script>
export default {
  props: ['tLists'],
  data() {
    return {}
  },
  methods: {}
}
</script>
<template lang="pug">
.section-teachers.ui-slide.f14.pb40.pt10(v-if="tLists.length")
  .section-teacher(v-for="item in tLists" @click="$go('teacherDetail', {userId: item.teacher_info.id})")
    .seciton-teacher__pic
      img(v-lazy="item.teacher_info.picture_absolute")
      .section-teacher__label.c-f.f12(v-show="item.teacher_info.tags") {{item.teacher_info.tags}}
    .section-teacher__text
      p {{item.teacher_info.nick_name}}
      p {{item.teacher_info.duties}}
</template>
<style lang="stylus" scoped>
.section-teachers
  .section-teacher
    width 2.9rem
    margin-left 0.3rem
    border-radius 5px
    overflow hidden
    box-shadow 0 3px 2px rgba(0,0,0,.1)
    .seciton-teacher__pic
      position relative
    .section-teacher__label
      position absolute
      left 0
      bottom 0
      padding 0.1rem
      background-color #cd9c26
    img
      width 100%
      height 2.7rem
    .section-teacher__text
      padding 0.2rem
      p
        &:first-child
          margin-bottom 0.12rem
          color #444
          font-weight 500
          font-size 14px
        &:last-child
          font-size 12px
</style>
