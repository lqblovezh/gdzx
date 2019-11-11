<template lang="pug">
  .spec-course
    index-panel-title(
      v-if="isShow"
      :label="info.name"
      icon-class="spec-course"
      to="/category"
    )
    layout-grid
      course-item(
        v-for="item, index in info.info"
        :key="`${index}_${Date.now()}`"
        :info="item.info"
      )
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    },
    isShow:{
      type: Boolean,
      default: true,
    }
  },
  mounted() {
    console.log(this.isShow)
  },
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .spec-course
    overflow hidden
</style>