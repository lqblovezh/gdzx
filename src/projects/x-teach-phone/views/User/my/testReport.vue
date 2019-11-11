<script>
import { mapMutations } from 'vuex'
import { isEmptyObj } from '@/utils/algorithm'
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  data () {
    return {}
  },
  mounted () {
    this.fetch(true)
  },
  methods: {
    queryList (params) {
      return this.$service.userCenter.talkListList({...params})
    },
    view (item) {
      this.$goByName('report-result', {
        query: {
          paper_id: item.id
        },
        params: {
          course_id: item.course_id
        }
      })
    },
    del (item) {
      this.$MessageBox.confirm('确认删除？').then(action => {
        this.$service.userCenter.talkListDel({id: [item.id]}).then(() => {
          this.fetch(true)
        }).catch(err => {
          this.$catchError(err)
        })
      }).catch(console.warn)
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="课程数据" class="page-of-report" :main-type="1")
  cube-scroll(
    ref="scroll"
    class="report-list"
    :options="options"
    @pulling-up="onPullUp"
  )
    .container
      .report-item(v-for="item in list")
        .img-wrap.circle
          img(:src="item.src_img")
        .report-content
          .report-content__title {{item.course_name}}
          .report-content__keshi {{item.name}}
          .report-content__actions.text-right
            button.btn-primary.circle(@click="view(item)") 查看
            button.circle(@click="del(item)") 删除
      .study-empty(v-show="list.length === 0")
        .bg-empty
</template>
<style lang="stylus" scoped>
.report-item
  display flex
  padding 0.34rem 0
  border-bottom 1px solid #d1dce4
  .img-wrap
    width 2.25rem
    height 1.4rem
    border 1px solid #EEE
  .report-content
    flex 1
    margin-left 0.2rem
    .report-content__keshi
      margin-top 0.3rem
      color #666666
      font-size 14px
    .report-content__actions
      button
        width 1.2rem
        height 0.44rem
        margin-left 0.2rem
        border 1px solid #3496e1
        font-size 12px
        background-color #FFF
        outline none
        &.btn-primary
          color #FFF
          background-color #3496e1
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
</style>
