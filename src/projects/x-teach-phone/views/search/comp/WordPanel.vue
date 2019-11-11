<script>
export default {
  props: {
    title: {},
    list: {
      type: Array
    },
  },
  filters: {
    formatName (name) {
      return typeof name === 'object' ? (name ? name.name : name) : name
    }
  },
  methods: {
    searchByName (itm) {
      const name = typeof itm === 'object' ? (itm ? itm.name : itm) : itm
      this.$addWordToHistory(name)
      this.$go('search/result', { name, type: 1 })
    }
  }
}
</script>
<template lang="pug">
.comp-word-panel
  .title.flex.flex-bs
    .text {{ title }}
    slot
  .content.f12
    .item(v-for="item in list" @click="searchByName(item)") {{ item | formatName }}
    p(v-show="!list || list.length === 0") 暂无数据
</template>
<style lang="stylus">
.comp-word-panel
  padding-top 0.44rem
  >.title
    position relative
    font-weight bold
    margin-bottom 0.2rem
    font-size 15px
  >.content
    color #282b39
    >.item
      display inline-block
      margin-right 0.2rem
      margin-bottom 0.2rem
      width 1.52rem
      height 0.6rem
      line-height 0.6rem
      border-radius 5px
      background-color #f5f5f5
      text-align center
</style>