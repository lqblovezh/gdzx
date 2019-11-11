<template lang="pug">
  .slide-teacher-panel.slide-panel.slide-wrapper
    index-panel-title(
      :label="info.name"
      :icon-class="'famous-teacher'"
      to="/teachers"
    )
    .slide-container
      ul.slide-list
        li(
          v-for="item, index in info.info"
          :key="`${index}_${Date.now()}`"
          @click="$push('teacherDetail', { userId: item.info && item.info.id})"
        )
          .img-box
            img(v-lazy="item.info && item.info.picture_absolute")
            .tag.c-f.f12(v-show="item.name") {{ item.name }}
          .info
            .name.f15.ell {{ item.info && item.info.nick_name }}
            .abs.f13.ell {{ item.info && item.info.duties }}
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .slide-teacher-panel
    padding-bottom 0.4rem
    .slide-container
      height 4.2rem
    ul
      box-sizing border-box
      padding 0.2rem 0
      li
        width 2.9rem
        box-shadow 0 0 0.1rem rgba(0, 0, 0, .2)
        border-radius 0.1rem
        overflow hidden
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
        .abs
          color #777
</style>
