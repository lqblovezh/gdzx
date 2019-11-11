<template lang="pug">
  .grid-teacher-item(
    :class="{'static-height': itemType === 'result'}"
    @click="$push('teacherDetail', { userId: info.id})"
  )
    .img-box
      img(v-lazy="info.picture_absolute")
      .tag.c-f.f12(v-show="info.tags") {{ info.tags }}
    .info(v-if="itemType==='item'")
      .name.f15 {{ info.nick_name }}
      .abs.f13 {{ info.duties }}
    .info.f14(v-else)
      .name.f15 {{ info.nick_name }}
      .job.ell 职务：{{ info.duties }}
      .company.ell 单位：{{ info.company }}
</template>
<script>
export default {
  name: 'teacher-item',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
    itemType: {
      type: String,
      default: 'item',
    },
  },
}
</script>
<style lang="stylus">
@import '~@/assets/css/var.styl'

.grid-teacher-item
  height 4rem
  width 2.9rem
  margin-bottom 0.2rem
  box-shadow 0 0 0.1rem rgba(0, 0, 0, 0.2)
  border-radius 0.1rem
  overflow hidden
  &.static-height
    height 4.1rem
  .img-box
    position relative
    > div
      position absolute
      bottom 0
      left 0
      padding 0.08rem 0.14rem
      background #cd9c26
  img
    width 100%
    height 2.7rem
    object-fit cover
  .info
    margin 0.2rem 0 0.3rem 0.2rem
    .name
      margin-bottom 0.12rem
      color $text-color-4
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .abs
      color #777
    .job, .company
      color #787878
      margin 0.1rem 0
</style>
