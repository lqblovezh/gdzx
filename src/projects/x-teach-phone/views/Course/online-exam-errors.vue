<script>
import { mapMutations } from 'vuex'
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  data () {
    return {
      errorList: null,
      isExpand: false,
      expandItemId: '',
      options: {
        click: true
      }
    }
  },
  mounted () {
    this.fetch(true)
  },
  methods: {
    ...mapMutations('course', ['SET_ERROR_LIST']),
    queryList (params) {
      return this.$service.course.getHistory({
        id: this.$route.params.course_id,
        ...params
      })
    },
    expandMyErrors (cur) {
      if (cur === this.expandItemId) {
        this.isExpand = !this.isExpand
        return
      }
      this.getDetailErrors(cur)
    },
    async getDetailErrors (id) {
      const res = await this.$service.course.getDetailErrors({id})
      this.expandItemId = id
      this.errorList = res.data
      this.isExpand = true
    },
    jumpToError (paper_id, question_idx) {
      this.SET_ERROR_LIST(this.errorList)
      this.$router.push({ path: 'online-exam-errors-detail', query: {id: paper_id, index: question_idx} })
    }
  }
}
</script>
<template lang="pug">
v-wrapper(title="历史错题集" :main-type="1" class="history-errors")
  cube-scroll(
    ref="scroll"
    class="error-list"
    :options="options"
    @pulling-up="onPullUp"
  )
    .error-item(v-for="item in list")
      .error-title(@click="expandMyErrors(item.id)") {{item.name}}
      .error-body.container(v-show="item.id === expandItemId && isExpand")
        .error-body__item.ell(v-for="error,index in errorList" @click="jumpToError(item.id,index+1)") {{error.question.replace(/<[^>]+>/g, '')}}
</template>
<style lang="stylus" scoped>
.error-item
  font-size 14px
  box-shadow 0 1px 3px #ccc
  .error-title
    padding 0.3rem
    color #333
    background-color #F4F5F7
  .error-body__item
    height 1.1rem
    line-height 1.1rem
    color #666666
    &:not(:last-child)
      border-bottom 1px solid #d1dce4
</style>