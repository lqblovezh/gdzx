<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<template lang="pug">
a.live-item(:href="item.url")
  .img-wrap.shadow
    img(:src="item.img")
  p.live-item__title.ell {{item.title}}
  p.live-item__teacher 老师：{{item.teacher_name}}
  p.live-item__intro.ell {{item.introduce}}
  p.live-item__time {{item.start_time}}
</template>
<style lang="stylus">
a
  text-decoration none
.live-item
  display block
  width 3.3rem
  margin-bottom 0.3rem
  font-size 12px
  line-height 0.4rem
  color #666
  .img-wrap
    width 100%
    height 2.06rem
    border-radius 3px
  .live-item__title
    color #454545
    margin-top 0.12rem
    font-size 14px
    line-height 0.5rem
  .live-item__teacher
    color #4d4d4d
</style>