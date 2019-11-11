<script>
import DetailCard from './comp/DetailCard'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { DetailCard},
  created() {
  },
  data() {
    return {
      userNav: {
        course: {
          name: '课程学习',
          path: '/user/course',
        },
        class: {
          name: '班级记录',
          path: '/user/class',
        },
        message: {
          name: '消息',
          path: '/user/message',
        },
        talk: {
          name: '测试报告',
          path: '/user/talkList',
        },
        teacher: {
          name: '关注教师',
          path: '/user/teacher',
        },
        integral: {
          name: '积分物品',
          path: '/user/integral',
        },
        order: {
          name: '订单记录',
          path: '/user/order',
        },
      },
    }
  },
  methods: {
    go(item) {
      if(this.$route.path.indexOf(item.path) == -1) {
        this.setList([])
        this.setPage()
        this.$go(item.path)
      }
    },
    edit() {
     //console.log('edit')
    },
    ...mapMutations('userCenter/',[
      'setList',
      'setPage',
    ])
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    currActive() {
      return this.$route.path
    },
  },
}
</script>


<template lang="pug">
  div
    NormalWrap
      .page-user-base.c_f5_bg
        .detail-card.cbox
          DetailCard
        .tabs.cbox
          .conatiner.c_f_bg 
            .nav
              .ls.c_e0_bd 
                .item.ib.active_border(
                  v-for="item,index in userNav"
                  :key="item.name"
                  @click ="go(item)"
                  :class="{active: currActive.indexOf(index) > 0}"
                  ) {{item.name}}
            .router
              router-view
</template>


<style lang="stylus">
.page-user-base
  >.detail-card
    padding-top 30px
  >.tabs
    padding-bottom 70px
    padding-top 20px
    >.conatiner
      >.nav
        >.ls
          border-bottom 1px solid #e0e0e0
          box-sizing border-box
          height 57px
          >.item
            text-align center
            line-height 55px
            margin 0 25px
            padding 0 5px
            cursor pointer
            box-sizing border-box
      >.router
        min-height 300px
        >div
          >.no-data
            background #fdfdfd
            text-align center
            height 200px
            display flex
            flex-direction column
            justify-content center
            color #adadad
            border 1px solid #efefef
        .page-user-course
          padding 30px
          >.group
            padding 20px 0
            border-bottom 1px solid #e9eef0
            &:first-child 
              padding-top 0
</style>
