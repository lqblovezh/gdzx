<script>
import { mapState, mapGetters } from 'vuex'

export default {
  created() {},
  beforeDestroy() {},
  data() {
    return {
      courseHour: null
    }
  },
  computed: {
    // ...mapState({
    //   detail: state => state.course.courseVideoDetail,
    //   hourList: state => {
    //     return state.course.courseVideoDetail.course_period_list
    //   },
    //   study: state => state.course.study,
    // }),
    ...mapGetters({
      allMedia: 'course/allMedia',
    }),
    ...mapState('course', {
      detail: state => state.courseVideoDetail,
      hourList: state => state.courseVideoDetail.course_period_list,
      study: state => state.study
    })
  },
  beforeMount () {},
  methods: {
    back() {
     //console.log('离开页面  back')
      this.$router.go(-1)
    },
    initEvent() {
      window.addEventListener('beforeunload', this.browserCloseHandler)
      window.addEventListener('load', this.browserReloadHandler)
    },
    browserCloseHandler(e) {
     //console.log('onbeforeunload 关闭')
      // 不要让用户直接关闭, 执行一些方法
      // e.returnValue = '提示'
    },
    browserReloadHandler(e) {
     //console.log('onloadF5  刷新')
    },
    goVideo(item, pitem, citem) {
      // 先保存目前视频的进度
     //console.log(citem.name)
      this.$emit('sendMsg')
      setTimeout(() => {
        this.$emit('goVideo', { item, pitem, citem })
      }, 20)
    },
    getPercentage(citem) {
      const { user_time, resources_time } = citem
      if (user_time && resources_time) {
        return (user_time * 100) / resources_time
      }
      return 0
    },
  },
  filters: {
    formatTime (val) {
      const minute = Math.floor(val / 60)
      const second = val % 60
      let str
      str = minute >= 1 ? `${minute}分钟` : ''
      str += second !== 0 ? `${second}秒`:''
      return str
    }
  }
}
</script>


<template lang="pug">
.comp-study-video-menu-list
  .left.fl()
    .mtop 
      .ib.active_border.active 目录
    .ls
      .item( 
        v-for="item,index in hourList"
        :key="item.id" 
        v-if="item.id === allMedia.ids.course_hour_id"
      ) 
        .gp
          //- .name.c_e0.cp.f16(:class="{c_price : item.checkedVideo}") 计划{{index+1}}
          .pitem(
            v-for="pitem, index in item.teaching_plan"
          ) 
            .gp
              .f15(:class="{c_og_2:pitem.checkedVideo}") 计划{{index+1}}
                span.ib.f13 {{pitem.name}}
                span.f14.fr {{pitem.time|formatTime}}
              .citem(
                v-for="citem in pitem.teaching_plan_info"
                :key="citem.id"
              )
                .gp.cp(@click="goVideo(item,pitem,citem) ")
                  .name.cp.f14.ellipsis(:class="{c_theme:citem.checkedVideo}") {{citem.name}}
                  //- .progress 
                  //-   el-progress( :showText="false" :percentage="getPercentage(citem)")

</template>
<style lang="stylus">
.comp-study-video-menu-list
  width 260px
  box-sizing border-box
  overflow auto
  position absolute
  top 0
  bottom 0
  >.left
    width 100%
    >.mtop
      padding 0 20px
      height 50px
      line-height 50px
      border-bottom 1px solid #5d6066
      >div
        height 51px
        padding 0 10px
    >.ls
      padding 0 20px
      >.item
        margin 30px 0
        line-height 20px
        >.gp
          >.pitem
            margin 20px 0
            >.gp
              >.name
                span
                  &:first-child
                    margin-left 10px
                    width 100px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    line-height 1
              >.citem
                margin 20px 0
                padding-right 10px
                padding-left 15px
        >div
          margin 10px 0
</style>
