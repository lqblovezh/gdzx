<template lang="pug">
v-wrapper(title="课程分类" class="category" :main-type="1")
  ev-dropdown
    ev-dropdown-item(v-model="mode" :options="mode_list" @change="handleChange")
  .category-school.ib
    .text(@click="openSide") {{ college_info.name || '选择院校' }}
  .category-content
    .category-content-wrapper
      sidebar-list(
        :side-list="categoryList"
        @query-class="handleChange"
      )
      .right.c-bg-f
        cube-scroll(
          ref="scroll"
          :options="options"
          @pulling-up="onPullUp"
        )
          layout-grid
            .course-item(
              v-for="item in list"
              :key="item.id"
              @click="$goWithName('course', { course_id: item.id })"
            )
              img(v-lazy="item.img")
              .name.ell.f13 {{ item.course_name }}
              .info.f12.ell {{item.teacher_user}} | {{item.university_name}}
  ev-overlay(
    v-model="visible"
    transition="fade-in"
    allow-click-hide
  )
    side-school-list(
      @change="handleChange"
      ref="schoolScroll"
    )
</template>
<script>
import { mapState, mapActions } from 'vuex'
import EvDropdown from '@/components/EvDropdown'
import EvDropdownItem from '@/components/EvDropdownItem'
import SidebarList from './children/sidebar-list'
import SideSchoolList from './children/side-school-list'
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  data() {
    return {
      visible: false,
      college_info: {},
      cate_text: '选择课程类型',
      mode: '默认',
      mode_id: 1,
      mode_list: [
        { text: '默认', value: '默认', id: 1 },
        { text: '自学', value: '自学', id: 2 },
        { text: '公开', value: '公开', id: 3 },
      ],
      categoryList: [], // 分类列表
      nav: -1,
      options: {
        click: true,
      },
    }
  },
  computed: {
    sub_list() {
      const current_cate = this.categoryList.find(
        item => item.name === this.cate_text
      )
      return current_cate ? current_cate.children : []
    },
  },
  components: { SidebarList, EvDropdown, EvDropdownItem, SideSchoolList },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.getCategoryList()
      await this.fetch(true)
    },
    // 获取分类列表
    async getCategoryList() {
      try {
        const { data } = await this.$service.course.getCategoryTree()
        this.categoryList = data
        let [item] = this.categoryList
        if (item) {
          this.$set(item, 'expand', true)
          this.class_id = item.id
        }
      } catch (e) {
        this.$catchError(e)
      }
    },
    queryList(params) {
      return this.$service.search.search({
        university_id: this.college_info.id,
        effective_status: this.mode_id,
        class_id: this.class_id,
        type: 1,
        ...params,
      })
    },
    handleChange(data) {
      switch (typeof data) {
        case 'number':
          this.mode_id = data
          break
        case 'string':
          this.class_id = data
          break
        case 'object':
          this.college_info = data
      }
      this.fetch(true)
    },
    openSide() {
      this.visible = true
      setTimeout(() => {
        this.$refs.schoolScroll.refresh()
      }, 20)
    },
  },
}
</script>
<style lang="stylus">
@import '~@/assets/css/var.styl'
@import '~@/assets/css/mixin.styl'

.category
  &-school
    padding 0.2rem 0
    .text
      padding 0.15rem 0.17rem
      border 1px solid #DDD
      color #4d4d4d
  .select-box
    padding 0.2rem 0.3rem
    background-color #fff
  .category-content
    position absolute
    left 0
    right 0
    bottom 0
    top 1.02rem
    &-wrapper
      height 100%
      border-1px(top)
      .right
        position absolute
        top 0
        bottom 0
        left 1.92rem
        right 0
        .course-item
          margin-top 0.3rem
          margin-bottom 0.3rem
          img
            width 100%
            height 1.49rem
            border-radius 0.1rem
          .name
            margin 0.18rem 0 0.13rem
            color #444
          .info
            color #777
</style>
