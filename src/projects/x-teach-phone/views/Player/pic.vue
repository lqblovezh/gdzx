<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isScale: false,
      canDrag: false,
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      style: null
    }
  },
  computed: {
    ...mapGetters('course', {
      get_info: 'resourse_info'
    }),
    info () {
      return this.get_info({ ...this.$route.query })
    }
  },
  methods: {
    scale() {
      this.isScale = !this.isScale
      this.style = null
    },
    start (e) {
      if (e.touches.length == 1 && this.isScale) {
        this.canDrag = true
        this.x0 = e.touches[0].clientX
        this.y0 = e.touches[0].clientY
      }
    },
    stop(e) {
      this.canDrag = false
    },
    move(e) {
      if (this.canDrag) {
        this.x1 = e.touches[0].clientX
        this.y1 = e.touches[0].clientY

        let x = this.x1 - this.x0
        let y = this.y1 - this.y0
        let img = this.$refs.myImg
        this.style = `left:${img.offsetLeft+x}px;top:${img.offsetTop+y}px`
        this.x0 = this.x1
        this.y0 = this.y1
      }
    },
    back () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    const { c_id: course_id, h_id: course_hour_id, p_id: course_teaching_id, r_id: course_teaching_plan_id } = this.$route.query
    this.$service.course.leaveVideoPonit({
      course_id, course_hour_id, course_teaching_id, course_teaching_plan_id,
      course_time: (Date.now()-this.$parent.startTime)/1000,
      resource_time: 1
    }).then(res => {
      next()
    })
    next()
  }
}
</script>
<template lang="pug">
v-wrapper(:title="info.name" :main-type="1")
  .picLayer
    .imgLayer(:class="{scaleTo: isScale}")
      img(
        :style="style"
        :src="info.preview_path"
        ref="myImg"
        @dblclick="scale"
        @touchstart="start"
        @touchend="stop"
        @touchmove="move"
      )
</template>
<style lang="stylus" scoped>
.picLayer
  position fixed
  padding-top 0.88rem
  width 100%
  height 100%
  background-color black
  box-sizing border-box
  z-index 8
.imgLayer
  position relative
  display flex
  align-items center
  height 100%
  padding-bottom 1rem
  box-sizing border-box
  &.scaleTo
    img
      height 100%
      width none
  img
    position absolute
    width 100%
</style>
