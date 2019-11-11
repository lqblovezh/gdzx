<template lang="pug">
  .ordinary-course
    index-panel-title(
      :label="info.name"
      icon-class="study-course"
      to="/category"
    )
    .container
      mt-navbar(v-model="selected")
        mt-tab-item(:id="index" v-for="tab, index in info.children") {{ tab.name }}
      .ordinary-course-list
        course-item-cell(
          v-for="item, index in sub_list"
          :key="`${Date.now().toString(16)}_${index}`"
          :item="item"
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
    }
  },
  computed: {
    sub_list () {
      return this.info.children && this.info.children[this.selected].info
    }
  },
  data () {
    return {
      selected: 0
    }
  },
  mounted () {}
}
</script>
<style lang="stylus">
  @import "~@/assets/css/var.styl";
  .ordinary-course
    overflow hidden
    .container
      .mint-navbar
        .mint-tab-item
          padding 0.16rem 0.19rem
      .is-selected
        margin-bottom 0
        background-color #edf3f8
        color #3496e1
        border-radius 999px
        border-bottom none
    &-list
      margin-bottom 0.3rem
</style>