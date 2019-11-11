<script>
import ReplyItem from './replyItem'
export default {
  props: {
    type: String,
    index: Number,
    item: [Object, Number],
  },
  components: {
    ReplyItem,
  },
  created() {},
  computed: {},
  data () {
    return {}
  },
  methods: {
    sortByTime (data) {
      data.sort((a, b) => {
        return Date.parse(b.create_time) - Date.parse(a.create_time)
      })
      data.shift()
      return data
    }
  },
}
</script>


<template lang="pug">
.comp-answer-item
  .question
    .top
      .ib.c_f.icon-question 问
      .answer-item__head.flex.flex-between
        p {{item.from_user_name}} {{ item.title }} 
        p {{ item.create_time }}
    .count
      div.text {{item.content}}
      .del
        //- span.ib.icon-discuss-s(@click="$parent.reply(item, index)")
        span.ib.icon-delete(@click="$parent.del(item.id)")
  .reply(v-if="item.reply")
    .item(v-for="items in item.reply")
      ReplyItem(:list="items")
</template>

<style lang="stylus">
.comp-answer-item
  padding 0!important
  >.question
    padding 20px 10px
    border-bottom 1px solid #e0e0e0
    >div
      &.top
        position relative
        color #808080
        line-height 32px
        >.icon-question
          position absolute
          left 0
          top 4px
          width 24px
          height 24px
          line-height 24px
          border-radius 5px
          background-color #16baff
          text-align center
        >.answer-item__head
          padding-left 34px
        p
          margin 0
          padding 0
        >.name
          margin 0 20px
          color #4c4c4c
        >.time
          margin-left 20px
          color #b2b2b2
        >.btns
          float right
          a
            color #999
            &:hover
              color #309fc3
      &.count
        padding-left 34px
        box-sizing border-box
        color #808080
        >.del
          text-align right
          > span
            margin-left 15px
        >.title
          line-height 34px
          color #737373
        >.text
          margin-top 15px
          line-height 24px
      &.reply
        padding-left 52px
        margin-top 30px
</style>
