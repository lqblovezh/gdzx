<script>
import Detail from '../integral/comp/Detail'
import { mapState } from 'vuex'

export default {
  components: {
    Detail,
  },
  data() {
    return {
      currentNave: '',
      currentItem: {},
      detailDialog: false,
    }
  },
  props: {
    items: {
      type: Object,
      default: {},
    },
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  created() {
    this.currentNave = this.items.children && this.items.children[0].type
  },
  methods: {
    setName(item) {
      return item.book_name || item.resources_name || item.course_name
    },
    setAuthor(item) {
      if (item.type == 'course') {
        return item.info.teacher_user + ' | ' + item.info.university_name
      }
      return item.info.author_name || ''
    },
    shopClick(item) {
      // console.log(item, this.currentNave, this.user)
      if (this.currentNave == 'course') {
        this.$go('/course/detail', { id: item.info.id })
      } else {
        if (!this.user) {
          return this.$message.warning('请先登录')
        }
        this.detailDialog = true
        this.currentItem = item.info
      }
    },
  },
}
</script>

<template lang="pug">
HomeBox(
  rightName="更多"
  :title="items.name" url="/integral-mall"
)
  Detail(
    :item="currentItem"
    :currentNave="currentNave"
    :detailDialog.sync="detailDialog"
    v-if="detailDialog"
  )
  span.nav(slot='nav-btn')
    el-radio-group(v-model="currentNave" size="mini")
      el-radio-button(:label="item.type" v-for="item,index in items.children" :key="item.name+'_nav'") {{item.name}}
  .home-box-shop
    .list-box(v-for="item,index in items.children" :key="item.name")
      .box(v-show="currentNave==item.type")
        .item.ib(v-for="itemss in item.info" @click="shopClick(itemss)")
          HomeCard(
            :type="item.type=='course'?'simple':'sourse'"
            :name="setName(itemss.info)"
            :des="setAuthor(itemss)"
            :integral="itemss.info.integral"
            :imgUrl="itemss.info.img"
            :time="item.type=='course'?itemss.info.create_time:''"
            :studied="itemss.info.study_count"
            :isStar="false"
          )
          //- HomeCard(
          //-   type="simple" 
          //-   :imgUrl="item.img"
          //-   :name="item.course_name" 
          //-   :time="item.create_time"
          //-   :des="item.teacher_user+' | '+item.university_name"
          //-   :isStar="false"
          //-   :studied="item.study_count"
          //- )
</template>

<style lang="stylus" scoped>
.home-box-shop
  white-space nowrap
  .list-box
    .box
      .item
        width 220px
        // height 360px
        margin-right 25px
        &:nth-of-type(5n)
          margin-right 0
        >>> .integral
          color #878787
          .icon
            padding-left 20px
            background-position left
</style>

