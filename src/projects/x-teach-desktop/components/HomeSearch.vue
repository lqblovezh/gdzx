<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      list: state => state.search.list,
      formdata: state => state.search.formdata,
    }),
  },
  methods: {
    submit(e) {
      if (!this.formdata.name) {
        this.$message.error('搜索参数不能为空!')
        return
      }
      this.$go('/search', this.formdata)
    },
  },
}
</script>

<template lang="pug">
  .comp-homesearch.f14.vm-all(@keyup.enter="submit") 
    select.txt.c_4.ib.tc(v-model="formdata.type")
      option(v-for="item in list" :value="item.type") {{item.name}}
    //- .txt.c_4.ib.tc 课程
    input.ml10.bbox(name="key" placeholder="搜索" v-model="formdata.name") 
    .icon.icon-search.cp.ml10(@click="submit($event)")
</template>

<style lang="stylus">
.comp-homesearch
  width 280px
  background #f7fbfc
  border-radius 6px
  height 36px
  border solid 1px rgba(45, 145, 178, 0.66)
  line-height 34px
  overflow hidden
  >input
    height 30px
    transform translateY(-1px)
  >.txt
    width 66px
    position relative
    border none
    outline none
    text-indent 10px
    height 36px
    >option
      width 66px
      text-indent 20px
      height 36px
      line-height 36px
    &::after
      content '|'
      position absolute
      right 0
      color #b6cad9
</style>
