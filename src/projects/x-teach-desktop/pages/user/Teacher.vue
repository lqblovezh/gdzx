<script>
import TeacherCard from './comp/TeacherCard'
import userMixins from './mixins'

export default {
  mixins: [userMixins],
  components: {
    TeacherCard,
  },
  methods: {
    open(id) {
      this.$go(`/user/talk/`, { id, type: 'answer' })
    },
    detail(id) {
      //console.log(id)
    },
    cancel(id) {
      //console.log(id)
    },
  },
}
</script>

<template lang="pug">
  .page-user-teacher 
    .group.ib(  v-for="item,index in list" :key="item.id")
      TeacherCard(
        @click.native="$go('/teacher/course',{id:item.id})"
        :name="item.name"
        :des="item.abs"
        :organization="item.company"
        :imgUrl="item.picture_absolute"
        :item="item"
      )
    .no-data(v-if="!list.length")
      span 暂无关注教师
    .page-wrap 
      PageMy(
        @currentChange="pageChangeHandler"
        :total="page.total"
        :pageOffset="page.pageOffset"
        :pageNum="page.pageNum"
      )
</template>

<style lang="stylus">
.page-user-teacher
  >.no-data
    margin 30px
  .group
    width 250px
    margin 30px 10px 0px 34px
</style>
