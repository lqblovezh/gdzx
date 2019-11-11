<script>
export default {
  data () {
    return {
      x0: 0,
      len: 0,
      score: 1,
      isShowScore: false
    }
  },
  computed: {
    scoreList () {
      let i = 1
      let state
      const stateArr = []
      do {
        if (this.score >= 2 * i ) {
          state = 2
        } else if (this.score == 2 * i - 1) {
          state = 1
        } else {
          state = 0
        }
        stateArr.push({
          state
        })
        i++
      } while (i <= 5)
      return stateArr
    }
  },
  methods: {
    hideScoreLayer (evt) {
      if (typeof evt ==='symbol' || (evt && evt.target.classList.contains('scoreLayer'))) {
        this.isShowScore = false
        this.score = 1
      }
    },
    showScoreLayer () {
      this.isShowScore = true
    },
    touchStart (evt) {
      if (evt && evt.touches.length === 1) {
        this.len = this.$refs.star.offsetWidth
        this.x0 = evt.touches[0].clientX
      }
    },
    touchMove (evt) {  
      this.score = 0
      if (evt) {
        let score = parseInt((evt.touches[0].clientX - this.x0)/this.len * 10)
        if (score < 1) {
          score = 1
        }
        this.score = (score > 10 ? 10 : score)
      }
    },
    async submit () {
      await this.$service.course.setScore({
        course_id: this.$route.params.course_id,
        score: this.score
      }).then(res => {
        this.$Toast('评分成功')
        this.$emit('modifyScore')
      }).catch(e => {
        this.$Toast('不能重复评分')
      })
      this.hideScoreLayer(Symbol('close'))
    }
  }
}
</script>
<template lang="pug">
.scoreLayer.full-layer__fixed(v-show="isShowScore" @click="hideScoreLayer($event)")
  .center-box.text-center
    .star-box.flex.flex-center-sb
      ul.star-list(@touchstart="touchStart" @touchmove="touchMove" ref="star")
        li.star-item.icon-star_empty-large(
          v-for="i in scoreList"
          :class="{'icon-star_half-large': i.state == 1, 'icon-star_full-large': i.state == 2}"
        )
      p.star-num {{score /2 }}分
    button.btn-confirm(@click="submit") 确定
</template>
<style lang="stylus" scoped>
.scoreLayer
  display flex
  align-items center
  justify-content center
  background-color rgba(0,0,0,.3)
  .center-box
    padding-top 0.4rem
    padding-bottom 0.4rem
    width 50%
    background-color #FFF
    border-radius 5px
    box-shadow 0 0 5px #ccc
    .star-box
      padding 0 0.2rem
      align-items center
  .btn-confirm
    margin-top 0.2rem
    padding 0.15rem 0
    width 75%
    background-color #3496e1
    color #FFF
    border none
    outline none
    line-height 1
</style>
