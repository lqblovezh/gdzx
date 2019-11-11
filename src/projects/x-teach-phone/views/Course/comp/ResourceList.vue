<script>
import localforage from 'localforage'
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['menuData'],
  computed: {
    ...mapState('course', {
      courseInfo: 'info'
    })
  },
  methods: {
    resourceHandler ({ id, type, b_id } = {}) {
      const { course_id: c_id } = this.$route.params
      const { course_hour_id: h_id } = this.$route.query
      const p_id = this.menuData.id
      this.$goPlayer({ type, book_id: b_id, product_id: this.courseInfo.publish_id, c_id, h_id, p_id, r_id: id })
    }
  }
}
</script>
<template lang="pug">
.dialog
  .center-box
    .dialog-title 资源列表
    ul.dialog-content(v-if="menuData && menuData.teaching_plan_info")
      li.dialog-item.clearfix(v-for="item in menuData.teaching_plan_info" @click="resourceHandler(item)")
        p.fl {{item.name}}
        p.fr {{item.type_name}}
      li.dialog-info(v-if="menuData.teaching_plan_info.length === 0") 暂无资源
</template>
<style lang="stylus" scoped>
.dialog
  position absolute
  top 50%
  left 50%
  width 77%
  transform translate(-50%, -50%)
  background-color rgba(0,0,0,.3)
  .center-box
    min-height 3rem
    padding 0.2rem
    background-color #FFF
    box-shadow 0 0 3px #ccc
    border-radius 5px
    .dialog-title
      padding-bottom 0.2 rem
      color #333
      border-bottom 1px solid #f3eded
    .dialog-content
      max-height 5rem
      overflow-x auto
    .dialog-info
      margin-top 0.2rem
      font-size 14px
      color #444
    .dialog-item
      line-height 0.6rem
      p
        &:last-child
          color #999
          font-size 12px
</style>

