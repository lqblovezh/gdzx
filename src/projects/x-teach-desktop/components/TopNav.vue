<script>
import HomeMenu from '../pages/Home/HomeMenu'

export default {
  components: { HomeMenu },
  props: {
    activeIndex: {},
  },
  data() {
    return {
      navList: [
        // {
        //   name: '教学导师',
        //   path: '/teacher-list',
        // },
        // {
        //   name: '教学直播',
        //   num: 0,
        //   path: '/lives',
        // },
        {
          name: '课程',
          path: '/category',
          active: false,
        },
        {
          name: '院校云',
          path: '/colleges',
          active: false,
        },
        {
          name: '自学课程',
          path: '/category?effective_status=2',
          active: false,
        },
        {
          name: '免费课程',
          path: '/category?effective_status=3',
          active: false,
        },
        {
          name: '商城',
          path: '/integral-mall',
          active: false,
        },
      ],
      scrollTop: 0,
    }
  },
  methods: {
    go(item) {
      this.$go(item.path)
    },
    handlerActive(to) {
      this.navList.forEach(item => (item.active = false))
      let path = ''
      if (to.path == '/category') {
        let name = ''
        switch (to.query.effective_status) {
          case '2':
            name = '自学课程'
            break
          case '3':
            name = '免费课程'
            break
          default:
            name = '课程'
            break
        }
        path = this.navList.find(item => item.name == name)
      } else {
        path = this.navList.find(item => to.fullPath.indexOf(item.path) > -1)
      }
      if (path) {
        path.active = true
      }
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        this.handlerActive(to)
      },
      immediate: true,
    },
  },
}
</script>


<template lang="pug">
.top-nav-wrap
  .content 
    .item( :class="{active:item.active}" @click="go(item)" v-for="item,index in navList" )
      el-popover(
        placement="top-start"
        popper-class="course"
        trigger="hover"
        content=""
        v-if="item.path=='/category'"
      )
        .download-panel
          HomeMenu
        .btn(slot="reference")
          span {{item.name}}
          .icon.icon-open
      .exp(v-else)
        .name {{item.name}}
        .tip(v-if="item.num") {{item.num}}
    .search
      HomeSearch
</template>


<style lang="stylus">
.top-nav-wrap
  height 60px
  >.content
    margin 0px auto
    height 100%
    display table
    position relative
    >div
      display inline-block
      // height 100%
      // line-height 52px
      color #fff
      font-size 16px
    >.main-item
      cursor pointer
      >.icon
        width 36px
    >.item
      // margin-right 30px
      padding 0 15px
      text-align center
      cursor pointer
      position relative
      transition all 0.2s ease-in-out
      &.active
        background #2885a3
      .tip
        position absolute
        top 10px
        right 5px
    >.search
      width 280px
      margin-left 40px
      vertical-align middle
</style>
