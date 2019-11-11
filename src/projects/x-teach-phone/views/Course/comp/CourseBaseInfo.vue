<template lang="pug">
  .course-base-info.c-bg-f.shadow
    img(:src="info.img_src || info.img")
    .info
      .name.f17.c-3 {{ info.course_name }}
      mt-progress(:value="parseInt(info.user_speed_time_protion)" :bar-height="3" v-if="status")
        span.percentage(slot="end") {{info.user_speed_time_protion}}
      .flex-bs.f13.comment
        star(:num="(info.score )" show-score)
        span {{ info.study_count }}人学过
      .flex-bs(v-if="!status")
        .price.f13.c-6 价格：
          span.f18 {{ info.price|dolar }}
        button.f13.c-bg-theme.c-f(@click="$router.push('join')") 加入班级
      button.c-theme.f13.c-bg-f.score-btn(v-else @click="$emit('score')") 评分
</template>
<script>
export default {
  props: {
    status: Boolean,
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
  @import "~@/assets/css/mixin.styl";
  .course-base-info
    img
      width 100%
      height 4.5rem
    .info
      padding 0.4rem $layout-padding $layout-padding
      color $text-color-a
      .comment
        margin $layout-padding 0
      .price
        span
          color $text-color-o
          font-weight 500
      .percentage
        margin-left 0.2rem
      button
        padding 0.17rem 0.28rem
        border-radius 0.06rem
      .score-btn
        min-width 1.5rem
        border-radius 0.1rem
        border-1px(all, $theme-color)
</style>