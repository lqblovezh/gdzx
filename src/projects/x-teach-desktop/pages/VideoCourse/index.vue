<script>
import localforage from 'localforage'
import { mapState, mapGetters } from 'vuex'
import VideoList from './comp/VideoList'
import MyVideo from './comp/MyVideo'
import Reader from './comp/Reader'
import mixin from './timer.js'
export default {
  mixins: [mixin],
  components: { VideoList, MyVideo, Reader },
  asyncData({ store, route }) {
    const { course_id } = route.query
    return store.dispatch('exam/getExamData', {
      id: course_id,
    })
  },
  async mounted() {
    try {
      this.isError = false
      await this.$store.dispatch('course/getVideoData', this.$route.query)
    } catch (error) {
      this.isError = true
      if (
        this.toNumber(this.courseDetail.effective_duration_start) >
        this.toNumber(this.courseDetail.the_server_time)
      ) {
        this.$message.warning('学习未开始!')
      } else if (
        this.toNumber(this.courseDetail.effective_duration_end) <
        this.toNumber(this.courseDetail.the_server_time)
      ) {
        this.$message.warning('学习已结束!')
      } else {
        this.$message.warning('没有课程资源!')
      }
      setTimeout(() => {
        this.$go('/home')
      }, 1500)
      return
    }
    this.initEvent()
    const {
      course_id,
      course_hour_id,
      course_teaching_id,
      course_teaching_plan_id,
    } = this.$route.query

    if (!course_teaching_plan_id) {
      // 一些进入方式并没有具体到某个资源
      setTimeout(() => {
        this.$replace('/video', {
          ...this.$route.query,
          ...this.allMedia.ids,
        })
        this.timeShow = true
      }, 0)
    }
    this.$nextTick(() => {
      this.initTimer()
    })
  },
  beforeDestroy() {
    // 离开, 记录 数据
    // this.sendMsg()
    // 注册在非组件元素的事件,需要注销
    window.removeEventListener('beforeunload', this.browserCloseHandler)
    window.removeEventListener('load', this.browserReloadHandler)
  },
  async beforeRouteLeave(to, from, next) {
    // ...
    console.log('leave')
    try {
      this.clearTimer()
      await this.sendMsg()
      // await this.$store.dispatch('course/getDetail', {id: this.$route.query.course_id})
    } catch (error) {}

    next()
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  //
  // 离开播放页面, 改变播放源文件  , 当前播放完成,  强关浏览器和网页  发出进度请求
  //
  data() {
    return {
      startTime: Date.now(), // 当进入当前资源的时间
      timeShow: false,
      jumpToNextPlan: null, // 暂无意义
    }
  },
  computed: {
    ...mapState({
      detail: state => state.course.courseVideoDetail,
      courseDetail: state => state.course.courseDetailInfo,
      papers: state => state.exam.paperList,
    }),
    ...mapGetters({
      allMedia: 'course/allMedia',
    }),
    currMedia() {
      return this.allMedia.citem
    },
    hour() {
      return this.allMedia.pitem.time / 60
    },
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    toNumber(time) {
      return Number(new Date(Date.parse(time)))
    },
    goVideo({ item, pitem, citem }) {
      this.clearTimer()
      let query = {
        course_id: this.$route.query.course_id,
        course_hour_id: item.id,
        course_teaching_id: pitem.id,
        course_teaching_plan_id: citem.id,
      }
      this.$store.dispatch('course/getVideoDetail', query).then(() => {
        this.$replace('/video', query)
        this.startTime = Date.now()
        this.initTimer()
      })
    },
    changeRoute(query) {
      console.log('change route')
      this.clearTimer()
      this.$store.dispatch('course/getVideoDetail', query).then(() => {
        this.$replace('/video', query)
        this.startTime = Date.now()
        this.initTimer()
      })
    },
    sendMsg() {
      let data = this.getSendData()
      if (data.course_time >= 1) {
        return this.$service.course.leaveVideoPonit(data).then(res => {
          console.log(Date.now(), 'send')
          // 時長发送成功后，将本地的当前计划用户学习时长更新，便于其他操作
          this.allMedia.pitem.user_time =
            Number(this.allMedia.pitem.user_time) + data.course_time
        })
      } else {
        return Promise.resolve()
      }
    },
    getSendData() {
      let time = this.getTime()
      let data = {
        ...this.$route.query,
        ...time,
      }
      return data
    },
    getTime() {
      return {
        course_time: (Date.now() - this.startTime) / 1000,
        resources_time: 1,
      }
    },
    initEvent() {
      window.addEventListener('beforeunload', this.browserCloseHandler)
      window.addEventListener('load', this.browserReloadHandler)
    },
    browserCloseHandler(e) {
      this.sendMsg()
      // 不要让用户直接关闭, 执行一些方法
      // e.returnValue = '提示'
    },
    browserReloadHandler(e) {},
    playHandler(e) {
      //console.log('========playHandler==========')
      let player = e.target.player
      //console.log('=============================')
    },
    endedHandler(e) {
      //console.log('========endedHandler=========')
      this.sendMsg()

      // 下一首
      this.next()
    },
    next() {
      const {
        itemList,
        pitemList,
        citemList,
        item,
        pitem,
        citem,
        mediaIndex,
        ids,
      } = this.allMedia
      const itemNext = itemList[mediaIndex.itemIndex + 1]
      const pitemNext = pitemList[mediaIndex.pitemIndex + 1]
      const citemNext = citemList[mediaIndex.citemIndex + 1]
      // send msg
      try {
        if (citemNext) {
          this.goVideo({ item, pitem, citem: citemNext })
        }
        // else if (pitemNext) {
        //   this.goVideo({
        //     item,
        //     pitem: pitemNext,
        //     citem: pitemNext.teaching_plan_info[0],
        //   })
        // }
        // else if (itemNext) {
        //   this.goVideo({
        //     item: itemNext,
        //     pitem: itemNext.teaching_plan[0],
        //     citem: itemNext.teaching_plan[0].teaching_plan_info[0],
        //   })
        // } else {
        //   //console.log('over')
        // }
      } catch (error) {
        console.error('下一首计算错误!')
        console.error(error)
      }
    },
    timeupdateHandler(e) {},
    videoMountedHandler() {},

    // goReader() {
    //   let data = {
    //     book_id: this.currMedia.b_id,
    //     product_id: this.detail.publish_id,
    //   }
    //   debugger
    //   localforage.setItem('access_code', this.currMedia.access_code).then(() => {
    //     this.sendMsg()
    //     this.$go('/reader', data)
    //   })
    // },
  },
  filters: {
    formatTime(val) {
      if (val <= 0) {
        return '已学完'
      }
      const minute = Math.floor(val / 60)
      const second = parseInt(val % 60)
      let str
      str = minute >= 1 ? `${minute}分钟` : ''
      str += second !== 0 ? `${second}秒` : ''
      return str
    },
  },
}
</script>


<template lang="pug">
.page-video.c_3_bg.c_f
  .wrap.ui-video(v-if="detail")
    .head.tc.f20 
      .btns.fl
        Tbutton( @click.native="back" icon="arrow-left" type="b7_plain" size="small") 返回课程
      div.text-center
        span {{currMedia.name}}
    .container.fix.c_5_bg.f13.ui-video-container
      VideoList(
        @sendMsg="sendMsg"
        @goVideo="goVideo"
      )
      .mediaWrap.fl.c_2_bg.tc(ref="videoWrap" :class="{hasPadding: currMedia.type !== 1}")
        div(v-if="$isVideo(currMedia.preview) || $isAudio(currMedia.preview)")
          MyVideo(
            ref="video"
            :src="currMedia.preview"
            :poster="currMedia.img_src"
            :seekTime="currMedia.user_time"
            @play="playHandler"
            @ended="endedHandler"
            @timeupdate="timeupdateHandler"
          )
        div(v-else-if="currMedia.type == 3")
          img(:src="currMedia.preview_path")
        .reader.ib.reader-layout(v-else-if="currMedia.type == 1")
          Reader(:params="{book_id:currMedia.b_id,product_id: detail.publish_id}")
        div(v-else)
          span 错误资源
        .name(v-show="currMedia.type !== 1")  简介: {{currMedia.abs}}
        .timecalculate(:class="{black: currMedia.type === 1}" v-show="timeShow") {{rest_time|formatTime}}
    .other 
  //- MessageBox
</template>
<style lang="stylus">
.text-center
  text-align center
.page-video
  /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */
  ::-webkit-scrollbar
    width 12px
    height 8px
    background-color #000
  /* 定义滚动条轨道 内阴影+圆角 */
  ::-webkit-scrollbar-track
    background-color #333
  /* 定义滑块 内阴影+圆角 */
  ::-webkit-scrollbar-thumb
    border-radius 5px
    background-color #666
    min-width 1200px
  >.wrap
    >.head
      height 60px
      line-height 60px
      >.btns
        margin-left 20px
    >.container
      position relative
      // min-height 800px
      // height 100%
      >.mediaWrap
        position relative
        margin-left 260px
        // min-height 800px
        height 100%
        box-sizing border-box
        width calc(100% - 260px)
        >.timecalculate
          position absolute
          right 20px
          top 20px
          z-index 99
          &.black
            color #000
        &.hasPadding
          padding 30px
        >.name
          position absolute
          left 50%
          margin-top 30px
          bottom 10px
          transform translateX(-50%)
        >.reader
          // margin -15px
          width 100%
          // min-height 800px
          >.read
            >img
              height 400px
              object-fit contain
            >.btn
              font-size 20px
        .reader-layout
          // min-height 800px
          height 100%
    >.other
      min-height 70px
</style>
