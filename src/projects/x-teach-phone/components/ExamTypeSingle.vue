<template lang="pug">
  .exam-single
    .exam-single-test(v-if="!isResultType")
      .exam-choice.clearfix(v-for="{label, title}, index in options" :key="`${index}_${Date.now()}`")
        .input-box.fl
          input(
            :type="inputType"
            name="choice"
            :value="label"
            ref="myInput"
            @change="handleChange"
          )
          label {{ label }}
        .option-content.c-3.oh(v-html="title")
      button.btn-exam.c-f.c-bg-theme(@click="$emit('comfirm_answer', user_answer)") 确定
    .exam-single-test(v-else)
      .exam-choice.clearfix(v-for="{ label, title } in options")
        .input-box.fl
          .input-box-label.flex-center(:class="{active: setAnswer(label)}") {{ label }}
        .option-content.c-3.oh(v-html="title")
</template>
<script>
export default {
  name: 'topic-of-single',
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
    isResultType: Boolean,
    // 用户选择的答案
    def: {},
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    questionType: String,
  },
  computed: {
    options() {
      if (this.questionType !== 'judgment') {
        let initStr = 'A'
        return this.list.map((item, index) => ({
          ...item,
          label: String.fromCharCode(initStr.charCodeAt() + index),
        }))
      } else {
        return [{ title: '正确', label: 'A' }, { title: '错误', label: 'B' }]
      }
    },
    inputType() {
      return this.questionType !== 'multi' ? 'radio' : 'checkbox'
    },
  },
  mounted() {
    this.initInputStatus()
  },
  data() {
    return {
      user_answer: null,
    }
  },
  methods: {
    setAnswer(label) {
      if (this.questionType == 'judgment') {
        return this.item.user_answer == 'true' ? label == 'A' : label == 'B'
      }
      return this.item.user_answer.includes(label)
    },
    initInputStatus() {
      if (!this.def) {
        return
      }
      let answer = typeof this.def === 'string' ? [this.def] : this.def
      console.log('fdf')
      for (let input of this.$refs.myInput) {
        if (answer.includes(input.value)) {
          input.checked = true
        }
      }
    },
    handleChange() {
      let temp = this.questionType === 'multi' ? [] : ''
      for (let input of this.$refs.myInput) {
        if (input.checked) {
          typeof temp === 'string'
            ? (temp = input.value)
            : temp.push(input.value)
        }
      }
      this.user_answer = temp
    },
  },
}
</script>
<style lang="stylus">
@import '~@/assets/css/var.styl'

.exam-single
  .exam-choice
    margin 0.3rem 0
  .option-content
    padding-top 0.22rem
</style>
