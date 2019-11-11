<template>
  <div class="count-down-container" v-bind:class="{'finished': currentDuration < 0}">
    <div class="count-down-group">
      <div class="count-down-hour count-down-item">
        <div class="count-down-number">
          <div class="card top">
            <div class="top-half current-count">0</div>
            <div class="back bottom-half">
              <div class="next-count adjuct">0</div>
            </div>
          </div>
          <div class="card middle">
            <div class="top-half next-count">0</div>
          </div>
          <div class="card bottom current-count">0</div>
        </div>
      </div>
      <div class="count-down-hour count-down-item">
        <div class="count-down-number">
          <div class="card top">
            <div class="top-half current-count">0</div>
            <div class="back bottom-half">
              <div class="next-count adjuct">0</div>
            </div>
          </div>
          <div class="card middle">
            <div class="top-half next-count">0</div>
          </div>
          <div class="card bottom current-count">0</div>
        </div>
      </div>
    </div>
    <span>时</span>
    <div class="count-down-group">
      <div class="count-down-minute count-down-item">
        <div class="count-down-number">
          <div class="card top">
            <div class="top-half current-count">0</div>
            <div class="back bottom-half">
              <div class="next-count adjuct">0</div>
            </div>
          </div>
          <div class="card middle">
            <div class="top-half next-count">0</div>
          </div>
          <div class="card bottom current-count">0</div>
        </div>
      </div>
      <div class="count-down-minute count-down-item">
        <div class="count-down-number">
          <div class="card top">
            <div class="top-half current-count">0</div>
            <div class="back bottom-half">
              <div class="next-count adjuct">0</div>
            </div>
          </div>
          <div class="card middle">
            <div class="top-half next-count">0</div>
          </div>
          <div class="card bottom current-count">0</div>
        </div>
      </div>
    </div>
    <span>分</span>
    <div class="count-down-group">
      <div class="count-down-second count-down-item">
        <div class="count-down-number">
          <div class="card top">
            <div class="top-half current-count">0</div>
            <div class="back bottom-half">
              <div class="next-count adjuct">0</div>
            </div>
          </div>
          <div class="card middle">
            <div class="top-half next-count">0</div>
          </div>
          <div class="card bottom current-count">0</div>
        </div>
      </div>
      <div class="count-down-second count-down-item">
        <div class="count-down-number">
          <div class="card top">
            <div class="top-half current-count">0</div>
            <div class="back bottom-half">
              <div class="next-count adjuct">0</div>
            </div>
          </div>
          <div class="card middle">
            <div class="top-half next-count">0</div>
          </div>
          <div class="card bottom current-count">0</div>
        </div>
      </div>
    </div>
    <span>秒</span>
    <!-- <el-button style="margin-left:20px;" @click="reset" type="primary" size="mini">重置</el-button> -->
  </div>
</template>

<script>
/**
 * whether the given date is a valid date object
 * @param  {Date}  date the given date
 * @return {Boolean} the result
 */
let isValidDate = function(date) {
  if (date.getTime) {
    if (isNaN(date.getTime())) {
      return false
    }
    return true
  }
  return false
}
/**
 * format the milliseconds to object
 * @param  {Integer} milliseconds the milliseconds
 * @return {Object} the object after being formatted
 */
let formatMillisecond = milliseconds => {
  milliseconds = milliseconds || 0
  let hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24
  let minutes = Math.floor(milliseconds / (1000 * 60)) % 60
  let seconds = Math.floor(milliseconds / 1000) % 60
  // if (milliseconds % 1000 === 0) {
  //   seconds = Math.floor(milliseconds / 1000) % 60
  // } else {
  //   seconds = Math.floor(milliseconds / 1000) % 60
  // }
  return {
    hour: hours >= 10 ? [Math.floor(hours / 10), hours % 10] : [0, hours],
    minute:
      minutes >= 10 ? [Math.floor(minutes / 10), minutes % 10] : [0, minutes],
    second:
      seconds >= 10 ? [Math.floor(seconds / 10), seconds % 10] : [0, seconds],
  }
}
export default {
  props: ['endTime', 'duration'],
  data() {
    return {
      endTimestamp: 0,
      timeout: null,
      interval: 1000,
      count: 0,
      SPEED: 400,
      currentDuration: 0,
      baseTimestamp: new Date().getTime(),
    }
  },
  created() {
    this.currentDuration = this.duration * 1000
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    reset() {
      clearTimeout(this.timeout)
      this.currentDuration = this.duration * 1000
      this.endTimestamp = 0
      this.baseTimestamp = new Date().getTime()
      this.timeout = -1
      this.count = 0
      this.init()
    },
    init() {
      if (!this.currentDuration) {
        let endTime = new Date(this.endTime)
        if (!isValidDate(endTime)) {
          endTime = new Date()
        }
        this.currentDuration = endTime.getTime() - new Date().getTime()
        this.endTimestamp = endTime.getTime()
      } else {
        this.endTimestamp = new Date().getTime() + this.currentDuration
      }
      if (this.currentDuration > 0) {
        this.updateCountDown(this.currentDuration, false)
        this.countDown()
      } else {
        this.currentDuration = 0
      }
    },
    countDown() {
      let nextTime = 0
      if (this.count === 0) {
        nextTime = this.currentDuration % 1000
        this.baseTimestamp += nextTime
        this.currentDuration -= nextTime
      } else {
        let offset =
          new Date().getTime() -
          this.baseTimestamp -
          (this.count - 1) * this.interval
        nextTime = this.interval - offset
        this.currentDuration -= this.interval
      }
      this.count++
      if (nextTime < 0) {
        nextTime = 0
      }
      if (this.currentDuration < 0) {
        clearTimeout(this.timeout)
        this.$emit('onTimeout')
      } else {
        this.timeout = setTimeout(() => {
          this.updateCountDown(this.currentDuration, true)
          this.countDown()
        }, nextTime)
      }
    },
    updateCountDown(currentDuration, withAnimation) {
      let formatedDuration = formatMillisecond(currentDuration, withAnimation)
      for (let key in formatedDuration) {
        if (formatedDuration.hasOwnProperty(key)) {
          this.renderCountDown(key, 0, formatedDuration[key][0], withAnimation)
          this.renderCountDown(key, 1, formatedDuration[key][1], withAnimation)
        }
      }
    },
    renderCountDown(unit, bit, val, withAnimation) {
      let countDownUI = this.$el.querySelectorAll('.count-down-' + unit)[bit]
      let top = countDownUI.querySelector('.top')
      let nextCounts = countDownUI.querySelectorAll('.next-count')
      let currentCounts = countDownUI.querySelectorAll('.current-count')
      if (val !== +currentCounts[0].innerHTML) {
        if (withAnimation) {
          // top.style.transition = 'transform ' + this.SPEED / 1000 + 's linear'
          // top.style.transform = 'rotateX(180deg)'
          nextCounts[0].innerHTML = val
          nextCounts[1].innerHTML = val
          setTimeout(function() {
            currentCounts[0].innerHTML = val
            currentCounts[1].innerHTML = val
            top.style.transition = 'none'
            top.style.transform = 'rotateX(0deg)'
          }, this.SPEED)
        } else {
          currentCounts[0].innerHTML = val
          currentCounts[1].innerHTML = val
        }
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
$count-down-height = 32px
$count-down-number-height = 32px
$count-down-line-height = 32px
$count-down-width = 13px
$count-font-size = 16px
$border-radius = 5px
.count-down-container
  // height $count-down-height
  // line-height $count-down-line-height
  font-size 0
  display inline-block
  color #ff5d16
  vertical-align bottom
  >span
    font-size $count-font-size
    vertical-align middle
  &.finished
    color #ddd
.count-down-group
  display inline-block
  vertical-align middle
  // margin-right 10px
  &:nth-of-type(3)
    margin-right 0px
  .count-down-item:nth-of-type(2)
    margin-right 0px
.count-down-item
  float left
  min-width $count-down-width
  height 20px
  margin-right 1px
  overflow hidden
.count-down-number
  width 100%
  // height $count-down-number-height
  text-align center
  font-size $count-font-size
  position relative
.card
  position absolute
  left 0px
  top 0px
  right 0px
  bottom 0px
.top
  z-index 3
  -moz-transform-style preserve-3d
  -webkit-transform-style preserve-3d
  transform-style preserve-3d
.middle
  z-index 2
.bottom
  z-index 1
  // background url('./asserts/count-down-bg.png') no-repeat center center
  background-size 30px 48px
.bottom-half, .top-half
  position absolute
  display none
  left 0px
  top 0px
  height 50%
  width 100%
  color #ff5d16
  // background-color #2c3133
  // overflow hidden
  // -webkit-backface-visibility hidden
  // -moz-backface-visibility hidden
  // backface-visibility hidden
.bottom-half
  // background url('./asserts/count-down-bg.png') no-repeat center -24px
  background-size 30px 48px
.top-half
  // background url('./asserts/count-down-half.png') no-repeat center center
  background-size 30px 24px
.back
  transform rotateX(180deg)
  display none \0
.adjuct
  height 100%
  line-height $count-down-line-height - $count-down-number-height
</style>
