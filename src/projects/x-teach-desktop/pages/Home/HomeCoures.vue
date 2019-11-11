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
  @leftChlickHandler="$emit('leftChlickHandler','course')"
  @rightChlickHandler="$emit('rightChlickHandler','course')"
  :title="items.name" url="/category"
)
  #home-box-course.swiper-container
    .swiper-wrapper
      .item.swiper-slide(
        v-for="item in items.info" 
        @click="$go('/course/detail' , {id:item.info.id})" 
        :key="item.id"
      ) 
        HomeCard(
          type="level" 
          :name="item.info.course_name" 
          :des="item.info.abs"
          :imgUrl="item.info.img"
          :star="item.info.score"
          :time="item.info.create_time"
          :studied="item.info.study_count"
        )
</template>

<style lang="stylus" scoped>
#home-box-course
  .swiper-wrapper
    >>> .item
      .comp-card
        .wrap
          font-size 0
          .other
            padding 15px
            width 292px
            .star
              display block
              margin-bottom 15px
            .txt
              // margin 25px 0
              margin-bottom 10px
              .title
                font-size 18px
              .des
                margin-top 10px
          .img
            height 147px
            width 262px
            img
              height 100%
              object-fit cover
              border-radius initial
</style>

