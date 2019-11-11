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
      @leftChlickHandler="$emit('leftChlickHandler','teacher')"
      @rightChlickHandler="$emit('rightChlickHandler','teacher')"
      :title="items.name" url="/teacher-list"
    )
      #home-box-teacher.swiper-container
        .swiper-wrapper
          .item.swiper-slide(
            v-for="item in items.info"
            :key="item.id"
            @click="$go('/teacher/course',{id:item.info.id})"
          ) 
            HomeCard(
              type="people" 
              :name="item.info.nick_name"
              :des="item.info.summary"
              :peopleType="item.name"
              :imgUrl="item.info.picture_absolute"
              :isStar="false"
              :time="false"
            )
</template>

<style lang="stylus" scoped>
#home-box-teacher
  .swiper-wrapper
    >>> .people
      .other
        height 80px
        overflow hidden
        box-sizing border-box
</style>