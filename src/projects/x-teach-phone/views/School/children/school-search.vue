<template lang="pug">
header.school-search.clearfix
  form.f12(@submit.prevent="search")
    input(type="text" placeholder="搜索院校" v-model="keyword")
    .i-search--gray
    .i-cancel(v-show="keyword" @click="keyword=''")
  .ico.i-back(@click="$back()")
  .ico.i-bell(v-if="showBell" @click="$push('messages')")
  a.c-f.fr(v-else @click="cancel()") 取消
</template>
<script>
import urlJoin from 'url-join'
export default {
  data () {
    return {
      keyword: '',
      showBell: true,
      cancelBtn: false,
    }
  },
  mounted () {
    const { name } = this.$route.query
    if (!this.keyword) {
      this.keyword = name
    }
  },
  methods: {
    search() {
      const { path } = this.$route
      let func_name = path === '/school/search' ? 'replace':'push'
      this[`$${func_name}`]('/school/search', { name: this.keyword })
    },
    cancel(){
      this.keyword = ''
      this.showBell = true;
    }
  },
  watch: {
    keyword(val){
      if(this.keyword){
        this.showBell = false;
      }
    },
    '$route' (to, from) {
      const { path, name } = to
      this.showBell = urlJoin(baseUrl, 'school/search') === path ? false : true
      if (name === 'school-detail') {
        this.keyword = ''
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
.school-search
  position relative
  position fixed
  padding 0.19rem 0.3rem
  width 100%
  height $header-height
  top 0
  left 0
  box-sizing border-box
  background-color $theme-color
  .ico
    position absolute
  .i-back
    left 0.3rem
    top 0.23rem
  .i-bell
    right 0.3rem
    top 0.24rem
  a
    position absolute
    right 0.3rem
    top 0.3rem
  form
    position relative
    padding 0 0.8rem
    width 100%
    height 100%
    box-sizing border-box
    input
      width 100%
      height 100%
      border-radius 0.25rem
      text-indent 2em
    .i-search--gray
      position absolute
      top 0.11rem
      left 0.91rem
    .i-cancel
      position absolute
      right 0.9rem
      top 0.1rem
</style>