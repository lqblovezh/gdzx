<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      isPlay: false,
      progress_focus: false,
      videoConfig: {
        currentTime: '00:00:00',
        totalTime: '00:00:00',
        progress: '0'
      },
      progressConfig: {
        x0: 0,
        x1: 0
      }
    }
  },
  computed: {
    ...mapState('course', {
      courseInfo: 'info'
    }),
    ...mapGetters('course', {
      get_info: 'resourse_info'
    }),
    info () {
      return this.get_info({ ...this.$route.query })
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.courseInfo && this.courseInfo.end_speed_info && this.$route.query.continue) {
        this.$refs.video.currentTime = parseFloat(this.courseInfo.end_speed_info.course_time)
      }
    })
  },
  methods: {
    formatTime(n) {
      const minute = Math.floor(n / 60)
      const second = n % 60
      const func = (num) => {
        return num > 9 ? num : '0' + num
      }
      return `${func(Math.floor(minute / 60))}:${func(minute)}:${func(second)}`
    },
    togglePlayStatus () {
      this.isPlay = !this.isPlay
      this.isPlay ? this.$refs.video.play() : this.$refs.video.pause()
    },
    canplay () {
      this.videoConfig.currentTime = this.formatTime(Math.round(this.$refs.video.currentTime))
      
      this.videoConfig.totalTime = this.formatTime(Math.round(this.info.length))
    },
    changeProgressByTime () {
      this.videoConfig.progress = (this.$refs.video.currentTime/this.$refs.video.duration*100).toFixed(1)
    },
    timeupdate () {
      this.videoConfig.currentTime = this.formatTime(Math.round(this.$refs.video.currentTime))
      this.changeProgressByTime()
    },
    timeend () {
      this.isPlay = false
    },
    start (e) {
      this.progress_focus = true
      this.progressConfig.x0 = e.touches[0].clientX
    },
    move (e) {
      if (this.progress_focus) {
        let x = ((e.touches[0].clientX - this.$refs.myProgress.offsetLeft)/this.$refs.myProgress.offsetWidth).toFixed(2)
        if (x > 1) {
          x = 1
        }
        if (x < 0) {
          x = 0
        }
        this.videoConfig.progress = x*100
        this.$refs.video.currentTime = parseInt(this.$refs.video.duration * x)
      }
    },
    stop () {
      this.progress_focus = false
    },
    back() {
      this.$router.go(-1)
    },
  },
  beforeRouteLeave (to, from, next) {
    const current = this.$refs.video.currentTime
    const duration = this.$refs.video.duration
    if (current === 0) {
      next()
      return
    }
    const { c_id: course_id, h_id: course_hour_id, p_id: course_teaching_id, r_id: course_teaching_plan_id } = this.$route.query
    this.$service.course.leaveVideoPonit({
      course_id, course_hour_id, course_teaching_id, course_teaching_plan_id,
      course_time: current,
      resource_time: duration
    }).then(res => {
      next()
    })
  }
}
</script>
<template lang="pug">
v-wrapper(:title="info.name" class="player-video" :main-type="1")
  .wrapper
    video(ref="video" id="video" :src="info.preview" 
      controlsList="nodownload"
      preload='auto'
      :poster='info.img_src'
      webkit-playsinline='true' 
      playsinline='true'
      x-webkit-airplay='true' 
      x5-video-player-type='h5' 
      x5-video-player-fullscreen='true'
      x5-video-ignore-metadata='true' 
      controls
      )
    button.exit(@click="back") 退出
</template>
<style lang="stylus" scoped>
.player-video
  .wrapper
    position relative
    height 100%
    background-color #FFF
    video
      position absolute
      top 50%
      width 100%
      height 4.84rem
      object-fit fill
      transform translateY(-50%)
    .exit
      position absolute
      bottom 0
      height 1rem
      width 100%
      color #3496e1
      background-color #f0f0f0
      border none
      outline none
      font-size 14px
</style>
