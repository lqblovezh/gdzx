<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      messageNav: {
        answer: {
          name: '教师答疑',
          path: '/user/message/answer',
        },
        discuss: {
          name: '学习讨论',
          path: '/user/message/discuss',
        },
        private: {
          name: '私信',
          path: '/user/message/private',
        },
        info: {
          name: '消息',
          path: '/user/message/info',
        },
      },
    }
  },
  methods: {
    go(item) {
      if (this.$route.path.indexOf(item.path) == -1) {
        this.setList([])
        this.setPage({})
        this.$go(item.path)
        item.num = null
      }
    },
    edit() {
     //console.log('edit')
    },
    setClass(index) {
      if (this.$route.path.indexOf(index) > 0) {
        return 'icon-' + index + '-s'
      }
      return 'icon-' + index
    },
    ...mapMutations('userCenter/', ['setList', 'setPage']),
  },
  mounted() {
    this.$service.userCenter.messageStatus().then(res => {
      for (let key in this.messageNav) {
        let item = res.data.find(item => key === item.type)
        // this.messageNav[key].num = item ? item.total : null
        item && this.$set(this.messageNav[key], 'num', item.total || '0')
        
      }
    })
  },
  computed: {
    currActive() {
      return this.$route.path
    },
  },
}
</script>


<template lang="pug">
  div
    .page-message-base
      .conatiner
        .nav
          .item.c_blue0_bg.c_f(
            v-for="item,index in messageNav"
            :key="item.name"
            @click ="go(item)"
            :class="{active: currActive.indexOf(index) > 0}"
          ) 
            span.icon(:class="setClass(index)")
            span {{item.name}}
            span.tip(v-if="item.num") {{item.num}}
        .router
          router-view
</template>


<style lang="stylus">
.page-message-base
  overflow hidden
  padding 30px
  >.conatiner
    >div
      display inline-block
      float left
    >.nav
      width calc(100% - 920px)
      padding 0 20px
      box-sizing border-box
      .item
        width 140px
        height 42px
        line-height @height
        text-align center
        margin-bottom 20px
        border-radius 5px
        cursor pointer
        position relative
        padding-left 20px
        box-sizing border-box
        >.tip
          top 50%
          margin-top -7px
          right 5px
        >span.icon
          position absolute
          left 20px
          top 50%
          margin-top -10px
        &.active
          background-color #c5f1ff
          color #309fc3
    >.router
      width 920px
      min-height 300px
      >div
        >.no-data
          background #fdfdfd
          text-align center
          height 300px
          display flex
          flex-direction column
          justify-content center
          color #adadad
          border 1px solid #efefef
      >.page-message-discuss
        min-height 300px
        >.item
          border 1px solid #e0e0e0
          padding 20px
          margin-bottom -1px
</style>
