<template lang="pug">
v-wrapper(title="在线测评" :main-type="1" class="exam page-exam")
  count-down(
    :time="total_time"
    handleTend="timeEnd"
  )
  .shadow
    cube-scroll-nav-bar(
      :current="current"
      :labels="labels"
      @change="syncCurrent"
    )
  .exam-wrapper
    .exam-body
      exam-title(
        :type="current_question.type_name"
        :content="current_question.question"
        :score="current_question.score"
      )
      component(
        :is="component_name"
        :list="current_question.option"
        :question-type="current_question.type"
        :def="current_question.def_answer"
        :key="`${Date.now().toString(16)}`"
        @comfirm_answer="comfirmAnswer"
      )
      .exam-btns.flex-bs
        span(:class="[hasPrev? 'i-prev_active': 'i-prev']" @click="prev")
        span(:class="[hasNext? 'i-next_active': 'i-next']" @click="next")
</template>
<script>
import { isString, isArray, isBool } from '@/utils/helpers'
import ExamTitle from '@/components/ExamTitle'
import ExamTypeSingle from '@/components/ExamTypeSingle'
import ExamTypeSubjective from '@/components/ExamTypeSubjective'
import CountDown from './comp/CountDown'
export default {
  data () {
    return {
      current: 1,
      labels: [],
      list: []
    }
  },
  components: { ExamTitle, ExamTypeSingle, ExamTypeSubjective, CountDown },
  computed: {
    total_time () {
      let time = 0
      this.list.forEach(item => {
        time += parseInt(item.time)
      })
      return time
    },
    // 获取当前问题
    current_question () {
      return this.list[this.current-1]||{}
    },
    // 根据题型不同，选择不同的组件
    component_name () {
      let name = ''
      switch(this.current_question.type) {
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
    hasPrev () {
      return !!this.list[this.current - 2]
    },
    hasNext () {
      return !!this.list[this.current]
    }
  },
  created () {
    this.queryPaper().then(() => {
      this.labels = this.list.map((item, index) => index + 1)
    })
  },
  methods: {
    async queryPaper () {
      try {
        const res = await this.$service.course.getExercise({
          id: this.$route.query.paper_id
        })
        this.list = res.data
      } catch(e) {
        this.$Toast('获取试题失败')
        this.$router.go(-1)
      }
    },
    handleTimeEnd () {
      this.$Toast("答题时间到，已自动交卷！")
      this.submitPaper()
    },
    // 同步选择的题目索引
    syncCurrent (active) {
      this.current = active
    },
    comfirmAnswer (content) {
      this.$set(this.current_question, 'def_answer', content)
      if (this.current === this.list.length) {
        this.$MessageBox.confirm('确认提交试卷么？').then(action => {
          this.submitPaper()
        })
      } else {
        this.current++
      }
    },
    // 格式化试卷答案
    formatAnswer () {
      const result = []
      for (let item of this.list) {
        const { id, def_answer } = item
        if (isString(def_answer) || isBool(def_answer)) {
          result.push({ id, answer: def_answer })
        } else if (isArray(def_answer)) {
          result.push({ id, answer: def_answer.toString()})
        } else if (def_answer) {
          result.push({ id, answer: def_answer.txt, img: def_answer.url })
        }
      }
      return result
    },
    // 提交试卷
    async submitPaper () {
      const { paper_id } = this.$route.query
      try {
        await this.$service.course.answer({
          id: paper_id,
          data: this.formatAnswer()
        })
      } catch(e) {
        this.$catchError(e)
      } finally {
        this.$back()
      }
    },
    prev () {
      this.hasPrev && this.current--
    },
    next () {
      this.hasNext && this.current++
    }
  }
}
</script>
<style lang="stylus">
@import "~@/assets/css/var.styl";
@import "~@/assets/css/mixin.styl";
.exam
  .btn-exam
    margin-top 0.4rem
    padding 0.25rem 0
    width 100%
    font-size 16px
    border-radius 0.1rem
  .exam-btns
    margin-top 0.4rem
  &-wrapper
    position absolute
    top 1.5rem
    bottom 0
    left 0
    right 0
    > div
      height 100%
      overflow scroll
      box-sizing border-box
</style>