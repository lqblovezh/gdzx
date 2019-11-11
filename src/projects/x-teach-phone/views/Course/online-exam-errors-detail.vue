<template lang="pug">
v-wrapper(title="在线测评" class="page-exam exam-error-detail" :main-type="1")
  .shadow
    cube-scroll-nav-bar(
      :current="current"
      :labels="labels"
      @change="syncCurrent"
    )
  .full-topic
    .exam-body.scroll
      topic-title(
        :type="cur_question.type_name"
        :content="cur_question.question"
        :score="cur_question.score"
      )
      topic-of-single(
        v-show='showTopicChoice'
        :list='cur_question.option'
        :question-type="cur_question.type"
        :item="cur_question"
        is-result-type
      )
      topic-analysis(
        :data="cur_question"
      )
</template>
<script>
export default {
  data () {
    return {
      list: [],
      current: 0
    }
  },
  computed: {
    labels () {
      return this.list.map(item => item.sort) || []
    },
    cur_question () {
      return this.list.find(item => item.sort === this.current) || {}
    },
    component_name () {
      let name = ''
      switch(this.cur_question.type) {
        case 'single':
        case 'judgment':
        case 'multi':
          name = 'ExamTypeSingle'
          break
        case 'fill':
        case 'subjective_item':
          name = 'ExamTypeSubjective'
          break
      }
      return name
    },
    showTopicChoice() {
      const { type } = this.cur_question
      return ['single', 'multi', 'judgment'].includes(type)
    }
  },
  mounted () {
    const { index } = this.$route.query
    this.getList().then(() => {
      this.current = this.labels[index-1]
    })
  },
  methods: {
    async getList () {
      const { id } = this.$route.query
      const res = await this.$service.course.getDetailErrors({id})
      this.list = res.data
    },
    syncCurrent(index) {
      this.current = index
    }
  }
}
</script>
<style lang="stylus" scoped>
.exam-error-detail
  .full-topic
    top 1.1rem
</style>
