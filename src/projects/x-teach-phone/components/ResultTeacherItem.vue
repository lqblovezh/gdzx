<script>
export default {
  props: {
    item: {}
  },
  methods:{
    goDetail(){
      this.$router.push({
        name:"teacher_detail",
        query: {userId: this.item.id}
      })
    }
  },
}
</script>
<template lang="pug">
.teacher-item(@click="goDetail")
  .teacher-item__img
    img.circle(:src="item.picture_absolute")
    span(v-show="item.tags") {{item.tags}}
  .teacher-item__content
    p.teacher-item__name {{item.nick_name}}
    p 职务：{{item.duties}}
    p 单位：{{item.company}}
</template>
<style lang="stylus" scoped>
.teacher-item
  display inline-block
  width 3.2rem
  margin-bottom 0.16rem
  font-size 13px
  box-sizing border-box
  &:nth-child(odd)
    margin-right 0.5rem
  .teacher-item__img
    position relative
    span
      position absolute
      display inline-block
      left 0
      bottom 0
      padding 0.1rem 0.21rem
      font-size 12px
      color #fff
      background-color #cd9c26
      border-bottom-left-radius 5px
  .teacher-item__content
    margin-top 0.2rem
    color #787878
    p
      margin-bottom 0.2rem
    .teacher-item__name
      color #444
      font-size 15px
  img
    width 100%
    height 3.6rem
</style>
