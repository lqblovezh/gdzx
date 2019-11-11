<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    des: {
      default: '',
    },
    star: {},
    studied: {
      default: 0,
    },
    imgUrl: {},
    peopleType: {},
    price: {},
    teacher: {},
    isBuy: {}, //user_speed_buy_status
    isAddClass: {},
    isStudied: {},
    percentage: {
      default: 0,
    },
    startTime: {},
    endTime: {}
  },
  data() {
    return {
      starNum: 0,
      murl: ''
    }
  },
  computed: {
    studyName() {
      if (this.percentage == 100) {
        return '重新学习'
      } else if (this.isStudied) {
        return '继续学习'
      }
      return '开始学习'
    },
  },
  watch: {
    star() {
      this.starNum = this.star
    },
  },
  created() {
    this.starNum = this.star
  },
  mounted() {
    // const {
    //   id
    // } = this.$route.query
    // this.murl = location.href.replace(/course(\S*)/, `h5/course/${id}`)
  },
  methods: {
    addCart() {
      this.$emit('addCart')
    },
    directBuy() {
      this.$emit('directBuy')
    },
    addCourse() {
      this.$emit('addCourse')
    },
    study() {
      this.$emit('study')
    },
    async starChange(num) {
      if (!this.$isUser()) {
        this.val = this.star
        return
      }
      let course_id = this.$route.query.id
      await this.$service.course
        .setScore({
          course_id,
          score: num * 2,
        })
        .then(res => {
          this.$message.success('评分成功!')
        })
        .catch(err => {
          this.$message.error(err.payload.message)
        })
      //console.log('xxxxxxxxxxx')
      this.$service.course.getScore({ course_id }).then(res => {
        //console.log(res)
        this.starNum = res.data
      })
    },
  },
  filters: {
    time (val) {
      if (!val) return val
      let matched = val.match(/\d{4}-\d{2}-\d{2}/)
      return matched ? matched[0] : val
    }
  }
}
</script>

<template lang="pug">
  .comp-detail-card.pr
    .img
      img(:src="imgUrl")
    .other.ib.vt.f14.c_6
      .name.f18.c_3 {{name}}
      .progress
        //- MyProgress
        MyProgress(
          type="line"
          color="#00b43c"
          :percentage="percentage"
          :showText="true"
          :width="80"
        )
      .star(v-if="star || star == 0")
        el-rate(
          @change="starChange"
          :allow-half="true"
          :value="starNum/2"
        )
        //- span.cp.ml20.f14 评分
      div(v-if="teacher")
        span 教师名称：
        span {{teacher}}
      div
        span.mr15 已学人数：{{studied}}
        span 课程学习时段：{{startTime|time}} ~ {{endTime|time}}
      div(v-if="!isBuy")
        span 价格：
        span.price.c_price.f26 {{$price(price)}}
      div.price.c_price.f20(v-else-if="Number(price) === 0")
        span 免费
      div(v-else)
        span.price.c_price.f20 已购买
      .btns.f18
        .gp(v-if="!isBuy")
          Tbutton( @click.native="addCart" type="og" icon="cart-white") 加入购物车
          Tbutton( @click.native="directBuy" type="og_plain" ) 直接购买
        .gp(v-if="isBuy")
          Tbutton( @click.native="study" type="primary" ) {{studyName}}
        .ib.gp
          Tbutton( @click.native="addCourse" type="primary_plain" v-if="!isAddClass" ) 班级加入
          //- Tbutton( @click.native=" " type="og" icon="cart-white") 已购买
    .share.pa
      ShareMy(
        :description="des"
        :title="name"
        image="imgUrl"
        :murl="murl"
      )
</template>

<style lang="stylus">
.comp-detail-card
  padding 30px
  >.img
    display inline-block
    width 420px
    height 237px
    overflow hidden
    >img
      height 100%
  >.other
    padding-left 30px
    width 520px
    >div
      margin-bottom 17px
    >.btns
      >.gp
        display inline-block
        >div
          &:first-child
            margin-right 15px
          &:nth-child(2)
            margin-right 50px
  >.share
    bottom 10px
    right 10px
</style>
