<script>
import { mapState, mapGetters } from 'vuex'
import Slider from '@/components/common/Slider'
export default {
  data () {
    return {
      playing: false,
      currentTime: 0,
      duration: 0,
      progress: 0
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
  components: {
    Slider
  },
  methods: {
    toggleStatus () {
      this.playing ? this.pause() : this.play()
    },
    play () {
      this.$refs.myAudio.play()
    },
    pause() {
      this.$refs.myAudio.pause()
    },
    onPlay () {
      this.playing = true
    },
    onPause () {
      this.playing = false
    },
    onTimeupdate (evt) {
      this.currentTime = evt.target.currentTime
      if (!this.$refs.slider.drag) {
        this.progress = parseInt(this.currentTime / this.duration * 100)
      }
    },
    onLoadedmetadata (evt) {
      this.duration = evt.target.duration
      evt.target.currentTime = this.courseInfo.end_speed_info.course_time
    },
  },
  filters: {
    formatTime(n) {
      const minute = Math.floor(n / 60)
      const second = Math.round(n % 60)
      const func = (num) => {
        return num > 9 ? num : '0' + num
      }
      return `${func(Math.floor(minute / 60))}:${func(minute)}:${func(second)}`
    },
  },
  watch: {
    progress (newval) {
      if (this.$refs.slider.drag) {
        this.$refs.myAudio.currentTime = parseInt(newval / 100 * this.duration)
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    const current = this.$refs.myAudio && this.$refs.myAudio.currentTime
    const duration = this.$refs.myAudio && this.$refs.myAudio.duration
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
v-wrapper(:title="info.name" :main-type="1")
  .audio-player
    audio(
      :src="info.preview"
      ref="myAudio"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    )
    .audio-img
      img(:src="info.img_src")
      button.center-btn(:class="[playing?'icon-play__pause':'icon-play__audio']" @click="toggleStatus")
    .audio-actions.container
      .audio-control
        p.audio-control__curtime {{currentTime | formatTime}}
        .audio-control__progress
          Slider(v-model.lazy="progress" ref="slider")
        p.audio_control__duration {{duration | formatTime}}
      .audio-name {{info.abs||"hello world"}}
    .audio-ani
</template>
<style lang="stylus" scoped>
.audio-player
  position fixed
  padding-top 0.88rem
  width 100%
  height 100%
  background-color #FFF
  box-sizing border-box
  z-index 8
  .audio-img
    position relative
    height 8rem
    img
      width 100%
      height 100%
    button
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      border none
      outline none
  .audio-actions
    padding-top 0.5rem
    height 3.27rem
  .audio-control
    display flex
    align-items center
    color #3496e1
    font-size 10px
    .audio-control__progress
      flex 1
      margin 0 0.2rem
  .audio-name
    margin-top 0.5rem
    font-size 13px
    color #444444
</style>
