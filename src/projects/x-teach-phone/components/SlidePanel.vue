<template lang="pug">
  .slide-panel.slide-course-panel.slide-wrapper(v-show="showStatus")
    index-panel-title(
      label="今日课程"
      icon-class="today-course"
      btn-type="close"
      @click-event="showStatus = false"
    )
    .slide-container
      ul.list
        li(
          v-for="item, index in list"
          :key="`${index}_${Date.now()}`"
          @click="$goWithName('course', { course_id: item.course_id })"
        )
          img(:src="item.img")
          .f14.tc.ell {{ item.course_name }}
</template>
<script>
import Swiper from 'swiper'
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
  },
  data () {
    return {
      showStatus: true
    }
  }
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .slide-course-panel
    .slide-container
      height 3rem
      ul
        li
          width 2.85rem
          div
            margin 0.2rem 0 0.4rem
            color #444
    img
      width 100%
      height 1.8rem
      box-shadow 0 0.04rem 0.1rem rgba(0, 0, 0, .1)
      border-radius 5px
</style>