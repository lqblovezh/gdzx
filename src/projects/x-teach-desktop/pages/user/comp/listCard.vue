<script>
export default {
  props: {
    item: {
      default: '',
    },
    percentage: {
      default: 10,
    },
    name: {
      default: 'test',
    },
    time: {
      default: '0',
    },
    img: {
      default:
        'https://img4.sycdn.imooc.com/szimg/5b17bad10001535305400300.jpg',
    },
    score: {
      default: '0',
    },
    course: {
      default: '课时3',
    },
    teacher: {
      default: '橘子老师',
    },
    type: String,
  },
  computed: {
    getBtnText() {
      if (this.type == 'talk') {
        return '查看'
      }
      return '继续学习'
    },
  },
}
</script>

<template lang="pug">
.comp-user-list-card
  .left.ib.vm.f14
    img(:src="img")
  .center.ib.vm.f14.pl20
    .name.f18.c_4 {{name}}
    .progress(v-if="type!='talk'") 
      span.c_8 学习进度:
      MyProgress.c_5(:percentage="percentage")
    .time.f14.c_8(v-if="type!='talk'") 最后学习时间：
      span.c_5 {{time}}
    .progress(v-if="type=='talk'")
      span.c_8 {{course}}
    .time.f14.c_8(v-if="type=='talk'")
      span 分数：
        span.c_price {{score}}
      span.ml90 阅卷老师：
        span {{teacher}}
  .right.ib.vm.f14.fr
    Tbutton( 
      @click.native.stop="$parent.del([item.id])" 
      type="primary_plain" 
      size="small" 
      v-if="type=='class'"
    ) 删除学习进度
    .icon.icon-delete(
      v-else
      @click.stop="$parent.del([item.id])"
    )
    Tbutton( 
      @click.native.stop="$emit('goTest',item)" 
      type="primary_plain" 
      size="small"
      v-if="type === 'talk'"
    ) 查看
    Tbutton( 
      v-else
      @click.native.stop="$emit('goStudy')" 
      type="primary_plain" 
      size="small"
    ) 继续学习
</template>

<style lang="stylus">
.comp-user-list-card
  >.left
    line-height 1
    img
      width 200px
      height 112px
      object-fit contain
  >.center
    >.progress
      >div
        display inline-block
        width 250px
        margin-left 20px
      width 500px
  >.right
    >div
      display block
      margin 0 auto
      &:last-child
        margin-top 55px
  >div
    line-height 35px
</style>
