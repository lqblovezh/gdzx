<script>
export default {
  props: {
    type: {
      type: String,
      default: 'vertical', // ['vertical','level' ,'people' , 'simple','simple-big']
    },
    name: {
      type: String,
      default: '标题',
    },
    des: {
      type: String,
      default: '30天快速学习插画',
    },
    star: {
      default: 0,
    },
    isStar: {
      default: true,
    },
    studied: {
      type: [Number, Boolean, String],
      default: false,
    },
    integral: {
      type: [Number, Boolean, String],
      default: false,
    },
    imgUrl: {
      type: String,
      default:
        'https://img4.sycdn.imooc.com/szimg/5b17bad10001535305400300.jpg',
    },
    peopleType: {
      // 老师类型
      type: String,
    },
    time: {
      type: [String, Boolean],
    },
  },
  mounted() {},
  data() {
    return {}
  },
  computed: {
    showLines() {
      // if (this.type == 'people') {
      //   return 'ellipsis-2'
      // }
      return 'ellipsis'
    },
    studyCount() {
      if (this.studied && this.studied * 1 > 999) {
        return '999+'
      } else {
        return this.studied
      }
    },
  },
  filters: {
    cutTime(val) {
      return val.substr(0, 10)
    },
  },
}
</script>

<template lang="pug">
  .comp-card
    .wrap(:class="type") 
      .img.f0.ib(:class="type")
        img(:class="type" :src="imgUrl")
        .cover.f20.c_f.tc( v-if="peopleType") {{peopleType}}
      .other.f13
        .txt.f16 
          .title.c_3.ellipsis(:title="name") {{name}}
          .des(:class="showLines") {{des}}
        .star.ib(v-if="isStar") 
          el-rate(
            :value="star/2"
            disabled
            text-color="#ff9900"
          )
          .num.ib.ml3 {{star/2}}
        .time.ib.f13(v-if="time!==false") {{time|cutTime}}
        .studied.vt.ib.c_6.f13(v-if="studied !== false")
          .icon.icon-studied
          span {{studyCount}}
        .integral.vt.ib.c_6.f13(v-if="integral")
          .icon.icon-integration {{integral}}积分
</template>
<style lang="stylus">
.comp-card
  min-width 200px
  cursor pointer
  &:hover
    >.wrap
      background-color #ffffff
      box-shadow 0px 4px 8px 0px rgba(4, 0, 0, 0.25)
      transform translateY(-5px)
      >.other
        >.txt
          >.title
            color #ff8d00
  >.wrap
    transition all 0.2s ease-in-out
    font-size 0
    >.img
      position relative
      width 205px
      height 128px
      overflow hidden
      &.simple
        width 100%
        height 130px
      &.people
        height 197px
        width 100%
        >img
          height 100%
          width 100%
      &.sourse
        height 168px
        width 100%
        background-color #dae4e7
        padding 10px 0
        >img
          height 100%
          width 100%
          object-fit contain
      >.cover
        position absolute
        left 0
        bottom 0
        right 0
        height 53px
        background-color rgba(216, 161, 54, 0.6)
        border-radius 0px 0px 4px 4px
        line-height 53px
      >img
        border-radius 4px
        width 100%
        height 100%
        object-fit cover
    >.other
      position relative
      padding 10px
      background #fff
      border-bottom-left-radius 4px
      border-bottom-right-radius 4px
      >.txt
        margin-bottom 10px
        width 100%
        >.title
          transition all 0.2s ease-in-out
          line-height 20px
        >.des
          color #757575
          font-size 14px
          margin-top 10px
          line-height 20px
      >.studied
        color #878787
        float right
        transform scale(0.9)
        >span
          margin-left 5px
      >.time
        color #878787
      >.star
        >.num
          color #2e2e2e
          position absolute
          margin-top 4px
        .el-icon-star-on
          &::before
            font-size 16px
    &.level
      >.img
        color red
        display inline-block
        width 220px
        height 130px
        overflow hidden
        >.img
          height 100%
          width 100%
      >.other
        width 300px
        color red
        display inline-block
        vertical-align top
        padding-left 30px
        position relative
        >.txt
          color red
        >.studied
          position relative
          display block
</style>
