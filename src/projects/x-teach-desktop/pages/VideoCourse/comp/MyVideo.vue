<script>
import { addLinks } from 'projects/common/util'
import { throws } from 'assert'
import { error } from 'util'

export default {
  props: {
    src: {},
    poster: {},
    seekTime: {},
  },
  created() {
    // 获取资源list, 定位上次, 播放的视频, 转跳到上次的资源
   //console.log('video created')
   //console.log('created URL', baseUrl)
  },
  beforeDestroy() {
    // videojs 需要销毁实例
    this.player.dispose()
  },

  async mounted() {
    try {
      await this.addVideoJs()
    } catch (error) {
      console.error('video.js   加载失败')
    }
    this.initVideo()
    this.initEvent()
  },
  watch: {
    src() {
      // 因为
      ////console.log('change')
      // // 如果是相同的资源, 没有监听  就不会不跳转
      this.player.src(this.src)
      setTimeout(() => {
        // 似乎src 不是同步的,导致seek会先执行, 因此放在异步里面
        // this.seek()
        this.player.play()
      }, 20)
    },
  },
  methods: {
    next() {
     //console.log('change')
      // 如果是相同的资源, 似乎不跳转
      setTimeout(() => {
        this.player.src(this.src)
        // 似乎src 不是同步的,导致seek会先执行, 因此放在异步里面
        // this.seek()
        this.player.play()
      }, 20)
    },
    getTime() {
      let time = {
        course_time: this.player.currentTime().toFixed(2),
        resources_time: this.player.duration().toFixed(2),
      }
      return time
    },
    initVideo() {
      this.player = videojs('myvideo', {
        muted: false,
        controls: true,
        loop: false,
        preload: 'auto',
        autoplay:true,
        poster: this.poster,
        src: this.src,
        language: 'zh-CN',
        sources: [
          {
            src: this.src,
          },
        ],
        techOrder: ['html5'],
      })
    },
    seek() {
      if (this.seekTime) {
       //console.log('this.seekTime', this.seekTime)
        let during = this.player.duration().toFixed(2)
        let div = Math.abs(during - this.seekTime)
        if (div < 1.3) {
          // 说明满了, 就不seek
        } else {
          this.player.currentTime(this.seekTime)
        }
      }
    },
    initEvent() {
      let player = this.player
      player.on('play', e => {
        ////console.log('开始/恢复播放')
        this.$emit('play', e)
      })
      player.on('pause', e => {
        ////console.log('暂停播放')
        this.$emit('pause', e)
      })
      player.on('ended', e => {
        ////console.log('结束播放')
        this.$emit('ended', e)
      })
      player.on('timeupdate', e => {
        ////console.log('timeupdate', e)
        this.$emit('timeupdate', error)
      })
      player.on('loadedmetadata', e => {
       //console.log('loadedmetadata')
        this.seek()
      })
    },
    async addVideoJs() {
      // 防止无限添加
      if (window.videojs) return
      try {
        addLinks(
          'https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video-js.min.css',
          'css'
        )
        await addLinks(
          'https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/video.js'
        )
        await addLinks(
          'https://cdnjs.cloudflare.com/ajax/libs/video.js/7.3.0/lang/zh-CN.js'
        )
      } catch (error) {
       //console.log(baseUrl + '/static/video/video.min.js')
        addLinks(baseUrl + '/static/video/video-js.min.css', 'css')
        await addLinks(baseUrl + '/static/video/video.min.js')
        await addLinks(baseUrl + '/static/video/zh-CN.js')
      }
    },
  },
}
</script>


<template lang="pug">
  .comp-my-video.pr
    .wrap 
      video.video-js(id="myvideo" )
</template>
<style lang="stylus">
.comp-my-video
  >.wrap
    >.video-js
      width 100%
      height 720px
      margin auto
</style>
