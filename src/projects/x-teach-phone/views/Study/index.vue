<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import loadmoreMixin from '@/mixins/loadmore'
import HomeSpecCourse from '@/components/HomeSpecCourse'
export default {
  mixins: [loadmoreMixin],
  data() {
    return {
      barHeight: 2,
      list: [],
      sortMethod: 'update_time',
      options: {
        pullDownRefresh: {
          txt: '刷新成功',
        },
        click: true,
      },
      isShow: false,
    }
  },
  components: {
    HomeSpecCourse,
  },
  async mounted() {
    if (this.userInfo) {
      this.fetch(true)
    }
  },
  computed: {
    ...mapGetters('common', ['spec_course']),
    ...mapState('user', {
      userInfo: state => state.userInfo,
    }),
    clone_list() {
      return this.list.map(item => ({
        ...item,
        btns: [{ action: 'clear', text: '删除', color: 'red' }],
      }))
    },
  },
  methods: {
    queryList(params) {
      return this.$service.userCenter.courseList({
        order: this.sortMethod,
        ...params,
      })
    },
    sortMethodChange() {
      this.fetch(true)
    },
    del(btn, index) {
      const { id } = this.clone_list[index]
      this.$service.course
        .delCourse({ id: [id] })
        .then(res => {
          this.fetch(true)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  watch: {
    userInfo() {
      if(this.userInfo){
        this.fetch(true)
      }
    },
  },
}
</script>
<template lang="pug">
v-wrapper(title="我的学习" class="page-of-study" :main-type="3" hide-back isAuto=true)
  template(v-if="userInfo&&clone_list.length")
    .study-management
      div
        span 排序：
        .select-box
          select(v-model="sortMethod" @change="sortMethodChange")
            option(value="update_time") 最新学习
            option(value="create_time") 最新买入
      span 课程
    .study-wrapper
      cube-scroll(
        ref="scroll"
        class="study-list"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullUp"
      )
        cube-swipe
          transition-group(name="swipe" tag="ul")
            li.swipe-item-wrapper(
              v-for="(item, index) in clone_list"
              :key="item.id"
            )
              cube-swipe-item(
                ref="swipeitem"
                :btns="item.btns"
                :index="index"
                @btn-click="del"
              )
                .study-item(@click="$goByName('course', { params: {course_id: item.id}})")
                  .img-wrap.circle.shadow.text-center
                    img(:src="item.img")
                  .study-content
                    .study-content__title {{item.course_name}}
                    .study-content__progress
                      img(src="../../assets/img/learn@2x.png")
                      span 学习进度：
                      .study-content__bar
                        mt-progress(:value="parseInt(item.user_speed_time_protion)" :bar-height="barHeight")
                          p(slot="end") {{item.user_speed_time_protion}}
                    .loststudy
                      p 最后学习时间：{{item.end_speed_time||"未知"}}
    //- .study-empty(v-show="list.length === 0")
    //-   .bg-empty
  template(v-else)
    .noUserInfo
      .top.text-center(:class="{'icon-user_bg bg':!userInfo}")
        template(v-if="!userInfo")
          .login
            span.loginBtn(@click="$go('login')") 登录
            span.text 登录后同步系统个人学习课程与进度
          .text-title
              img.img(src="../../assets/img/learn@2x.png")
              span 学习进程为空
          .btn-group
            span.btn(@click="$go('market')") 逛逛商城
            span.split
            span.btn(@click="$go('category')") 查看推荐
        template(v-else)
          img(src="../../static/img/study.png")
      .recommend
        img.img(src="../../assets/img/recommend.png")
        span.text 为你推荐
      home-spec-course(:info="spec_course" :isShow="isShow")
</template>
<style lang="stylus" scoped>
@import '~@/assets/css/mixin.styl'

.page-of-study
  >>> section
    background-color #fff
  .study-empty
    position fixed
    width 100%
    let 0
    right 0
    top 1.87rem
    bottom 1rem
    .bg-empty
      position absolute
      width 100%
      top 50%
      left 0
      transform translateY(-50%)
  .study-wrapper
    position absolute
    top 1.01rem
    bottom 0
    left 0
    right 0
  .study-management
    display flex
    align-items center
    justify-content space-between
    padding 0.4rem 0.3rem 0.17rem
    border-1px(bottom, #F0F0F0)
    span
      display inline-block
      margin-top 0.05rem
    .select-box
      display inline-block
      width 1.86rem
      height 0.44rem
      border 1px solid #d1dce4
      position relative
      select
        border none
        outline none
        width 100%
        height 0.44rem
        line-height 0.44rem
        font-size 12px
        appearance none
        -webkit-appearance none
        -moz-appearance none
        background-color #FFF
        padding-right 0.3rem
        padding-left 0.2rem
      &:after
        content ''
        position absolute
        right 0.2rem
        top 45%
        pointer-events none
.study-item
  display flex
  padding 0.33rem 0.3rem
  font-size 12px
  color #888
  border-1px(bottom, #f0f0f0)
  .img-wrap
    width 2.7rem
    height 1.8rem
    margin-right 0.2rem
    img
      max-width 100%
      height 100%
  .study-content
    flex 1
  .study-content__title
    margin-bottom 0.2rem
    height 0.75rem
    font-size 14px
    color #333
    line-height 0.5rem
  .study-content__progress
    display flex
    align-items center
    margin-top -10%
    font-size 14px
    margin-bottom 0.1rem
    span
      display inline-block
      width 1.65rem
    .study-content__bar
      flex 1
      p
        margin-left 0.2rem
.loststudy
  font-size 10px
.cell_swipe
  background-image none
  width 100%
.cell_swipe >>> .mint-cell-wrapper
  background-image none !important
.cell_swipe >>> .mint-cell-swipe-button
  line-height 6.4
.noUserInfo
  margin 0
  .top
    height 3.54rem
    display flex
    flex-direction column
    color #fff
    &.bg
      padding-top 0.5rem
      box-sizing border-box
    >img
      height 100%
      object-fit contain
    .login
      height 0.8rem
      line-height 0.8rem
      .text
        font-size 12px
      .loginBtn
        background-color #ffffff
        border-radius 50px
        color #2daaf5
        display inline-block
        padding 0rem 0.5rem
        margin-right 0.3rem
    .text-title
      margin 0.32rem 0
      line-height 0.5rem
      height 0.5rem
      .img
        width 0.5rem
        height 0.5rem
        margin-right 0.2rem
    .btn-group
      margin-top 0.3rem
      .btn
        padding 0.14rem 0.7rem
        background rgba(33, 157, 220, 1)
      .split
        margin 0 0.4rem
  .recommend
    margin 0.3rem auto
    line-height 0.5rem
    height 0.5rem
    text-align center
    position relative
    img
      width 0.5rem
      height 0.5rem
    .text
      margin-left 0.15rem
    &:before, &:after
      content ''
      position absolute
      bottom 50%
      width 2.3rem
      height 1px
      background #c9c9c9
    &:before
      left 0.3rem
    &:after
      right 0.3rem
</style>
