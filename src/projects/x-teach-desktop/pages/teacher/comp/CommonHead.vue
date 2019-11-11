<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    curr: {
      default: 'course',
    },
  },
  data() {
    return {
      navs: {
        course: {
          name: '课程',
          path: '/teacher/course',
        },
        clazz: {
          name: '班级',
          path: '/teacher/clazz',
        },
        // live: {
        //   name: '直播',
        //   path: '/teacher/live',
        // },
      },
    }
  },
  methods: {
    go(item) {
      if(this.$route.path.indexOf(item.path) == -1) {
        this.setList([])
        this.setPage()
        this.$go(item.path,{id:this.$route.query.id})
      }
    },
    ...mapMutations('teacher/',[
      'setList',
      'setPage',
    ])
  },
}
</script>


<template lang="pug">
.comp-teacher-common-head
  .wrap.bd_line
    .ls 
      .item.active_border(
        v-for="item,key in navs"  
        @click="go(item)"
        :key="key"
        :class="{active:curr === key}"
      ) {{item.name}} 
</template>
<style lang="stylus">
.comp-teacher-common-head
  .wrap
    height 56px
    line-height 56px
    >.ls
      transform translateY(-2px)
      >.item
        padding 0 20px
        margin 0 20px
</style>
