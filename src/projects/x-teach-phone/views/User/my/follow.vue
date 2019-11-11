<script>
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  data() {
    return {
      request_status: 'res',
      options: {
        pullDownRefresh: {
          threshold: 60,
          txt: '更新成功',
        },
        click: true,
      },
    }
  },
  mounted() {
    this.fetch(true)
  },
  computed: {
    clone_list() {
      return this.list
    },
  },
  methods: {
    queryList(params) {
      return this.$service.teacher.getMyFollowList({ ...params })
    },
    viewTeaccherInfo(item) {
      this.$router.push({ path: 'teacherDetail', query: { userId: item.id } })
    },
    async cancelMyFollow(item) {
      const { id } = item
      this.request_status = 'pending'
      const method = item.is_cancel
        ? 'sendFollowRequest'
        : 'cancelFollowedRequest'
      try {
        await this.$service.teacher[method]({ id })
        this.$set(item, 'is_cancel', !item.is_cancel)
        this.fetch(true)
      } catch (e) {
        this.$catchError(e)
      } finally {
        this.request_status = 'res'
      }
    },
  },
}
</script>
<template lang="pug">
v-wrapper(title="关注教师" :main-type="1" class="page-of-follow")
  cube-scroll.cube-scroll-wrapper(
    ref="scroll"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullUp"
  )
    .c-bg-f(:class="{fullPage:clone_list&&clone_list.length==0}")
      .container(v-if="clone_list.length")
        .teacher-item(v-for="(item,index) in clone_list" :key="item.id")
          img(:src="item.picture_absolute" @click="viewTeaccherInfo(item)")
          .teacher-info
            p.techer-info__name.ell {{item.name}}
            p.teacher-info__intro.ell 简介：{{item.tags}}
            p.teacher-info__company 单位名称：{{item.company||"未知"}}
          v-button(@click="cancelMyFollow(item)" :status="request_status" :active="!item.is_cancel") {{ item.is_cancel ? '+ 关注':'已关注'}}
      .container(v-else @click="$go('/teachers')")
        .img
</template>
<style lang="stylus" scoped>
@import '~@/assets/css/mixin.styl'

.cube-scroll-wrapper
  >>> .cube-scroll-list-wrapper
    position relative
.fullPage
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  .container
    height 100%
    background-image url('./img/follow.png')
    background-position center
    background-size cover
.teacher-item
  display flex
  padding 0.29rem 0
  border-1px(bottom, #d1dce4)
  img
    width 1.36rem
    height 1.36rem
    border-radius 50%
  .teacher-info
    flex 1
    margin-left 0.19rem
    color #444
    font-size 14px
    .techer-info__name
      color #333
      font-size 16px
    .teacher-info__intro
      margin-top 0.2rem
      margin-bottom 0.16rem
  a.btn
    padding 0 0.1rem
    height 0.48rem
    line-height 0.48rem
    color #3496e1
    border 1px solid #3496e1
    font-size 14px
    background-color #FFF
    &.btn-selected
      border 1px solid transparent
      color #555555
      background-color #d9d8db
</style>
