<script>
import AnswerItem from './comp/answerItem'
import userMixins from '../user/mixins'

export default {
  components: { AnswerItem },
  mixins: [userMixins],
  provide() {
    return {}
  },
}
</script>


<template lang="pug">
  .page-message-answer
    .item(v-for="item in list")
      AnswerItem(type="answer" :item="item")
    .no-data(v-if="!list.length")
      span 暂无数据
</template>
<style lang="stylus">
.page-message-answer
  min-height 300px
  >.item
    border 1px solid #e0e0e0
    margin-bottom 30px
    >div
      padding 20px
    >.answer
      border-top 1px solid #e0e0e0
</style>
