<script>
export default {
  data() {
    return {}
  },
  props: {
    items: {
      type: Object,
      default: {},
    },
  },
}
</script>

<template lang="pug">
HomeBox(
  rightName="更多"
  :title="items.name" url="/category?effective_status=2"
)
  .home-box-classic
    .item(v-for="item,index in items.children" :key="item.name" :class="`classic_${index+1}`")
      .box
        .cell-box
          img.img(:src="item.img_src")
          .name {{item.name}}
      .list-box
        .list(v-for="itemss in item.info" @click="$go('/course/detail' , {id:itemss.recommend_id})")
          HomeCard(
            type="simple" 
            :imgUrl="itemss.info.img"
            :name="itemss.info.course_name" 
            :time="itemss.info.create_time"
            :des="itemss.info.teacher_user+' | '+itemss.info.university_name"
            :isStar="false"
            :studied="itemss.info.study_count"
          )
</template>

<style lang="stylus" scoped>
.home-box-classic
  overflow hidden
  >.item
    display flex
    float left
    overflow hidden
    &.classic_1, &.classic_2
      width 50%
      height 430px
      .list-box
        .list:nth-of-type(2n)
          margin-right 0
    &.classic_3, &.classic_4
      width 100%
      height 209px
      margin-top 15px
      .list-box
        .list:nth-of-type(5n)
          margin-right 0
    &.classic_1 .box
      background-image url('./img/classic_1.png')
    &.classic_2
      padding-left 6px
      box-sizing border-box
      .box
        background-image url('./img/classic_2.png')
    &.classic_3 .box
      background-image url('./img/classic_3.png')
    &.classic_4 .box
      background-image url('./img/classic_4.png')
    .box
      width 190px
      flex 0 0 190px
      height 100%
      display table
      background-repeat no-repeat
      background-size contain
      .cell-box
        display table-cell
        vertical-align middle
        text-align center
      .img
        width 40px
        height @width
        object-fit contain
      .name
        font-size 22px
        color #ffffff
    .list-box
      padding-left 12px
      .list
        width 190px
        display inline-block
        margin-right 12px
        margin-bottom 12px
        >>> .comp-card
          min-width 190px
          // height 209px
          .img
            height 112px
            object-fit cover
          .simple
            padding 0
</style>

