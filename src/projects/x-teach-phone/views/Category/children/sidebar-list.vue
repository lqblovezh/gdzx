<template lang="pug">
  .category-sidebar-list
    .category-sidebar-scroll.hide-scrollbar
      ul.category-nav-list.f15
        li.ell(
          v-for="item, index in list"
          :key="`${index}_${Date.now().toString(16)}`"
        )
          p(
            :class="{active: sub_cate && sub_cate.id === item.id }"
            @click="handleChange(item)"
          ) {{ item.name }}
          ul(v-show="item.expand")
            li(v-for="subItem in item.children" :key="subItem.id")
              p(
                :class="{active: sup_cate && sup_cate.id === subItem.id }"
                @click="handleChange(subItem)"
              ) {{ subItem.name }}
</template>
<script>
export default {
  props: {
    sideList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    list () {
      return this.sideList
    },
    sub_cate () {
      return this.list.find(item => item.expand)
    }
  },
  data () {
    return {
      sup_cate: null
    }
  },
  methods: {
    handleChange (item) {
      if ((this.sup_cate && item.id === this.sup_cate.id) || (this.sub_cate && this.sub_cate.id === item.id && !this.sup_cate)) {
        return
      }
      if (item.pid === '0') {
        this.sub_cate && this.$set(this.sub_cate, 'expand', false)
        // this.sub_cate = item.expand ? null : item
        this.sup_cate = null
        this.$set(item, 'expand', !item.expand)
      } else {
        this.sup_cate = item
      }
      this.$emit('query-class', item.id)
    }
  }
}
</script>
<style lang="stylus">
@import "~@/assets/css/var.styl";
@import "~@/assets/css/mixin.styl";
.category-sidebar-list
  position absolute
  top 0
  bottom 0
  left 0
  width 1.92rem
  background-color #eee
  box-sizing border-box
  .category-sidebar-scroll
    height 100%
    overflow-y auto
  ul
    color #222
    &.category-nav-list.f15
      margin-top 0.02rem
      ul
        background-color #FFF
        font-size 14px
        p
          height 0.8rem
          line-height 0.8rem
          &.active
            &::before
              background-color #f00
    p
      height 1.08rem
      line-height 1.08rem
      text-align center
      &.active
        position relative
        background-color #fff
        &::before
          content ''
          display inline-block
          position absolute
          height 100%
          width 0.04rem
          left 0
          background-color $theme-color
</style>