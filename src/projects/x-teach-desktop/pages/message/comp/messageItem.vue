<script>
import Item from './item'
export default {
  props: {
    type: String,
    index: Number,
    item: [Object, Number],
  },
  components: {
    Item,
  },
  created() {},
  computed: {
    getText() {
      if (this.type == 'discuss') {
        return '回复了你'
      }
      if (this.type == 'private') {
        return '私信'
      }
      return ''
    },
  },
  data () {
    return {
      reply: null,
      showReply: false
    }
  },
  methods: {
    detail() {
      if (this.showReply) {
        this.showReply = !this.showReply
        return
      }
      try {
        this.getReply().then(res => {
          this.reply = this.sortByTime(res.data)
          this.showReply = this.reply ? true : false
        })
      } catch(e) {}
    },
    async getReply () {
      return await this.$service.message.getPrivateMsg({
        to_user_id: this.item.user_id
      })
    },
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
.comp-message-item
  .top
    img.img(:src="item.from_user_picture||'https://img4.sycdn.imooc.com/szimg/5b17bad10001535305400300.jpg'", alt="alt")
    span.name {{item.from_user_name}}
    span {{getText}}
    span.time {{item.create_time}}
    .btns
      a(href="javascript:void(0)" @click="$parent.del(item.id)") 删除 
      span(v-if="type!='info'")
        span | 
        a(href="javascript:void(0)" @click="detail()") {{reply && showReply?'收起':'查看'}} 
      span(v-if="type=='private'")
        span | 
        a(href="javascript:void(0)" @click="$parent.reply(item, index)") 回复 
  .count
    div.title(v-if="type=='discuss'") {{item.title}}
    div.text {{item.content}}
  .reply(v-if="reply && showReply")
    .item(v-for="items in reply")
      Item(:list="items")
</template>

<style lang="stylus">
.comp-message-item
  >div
    &.top
      color #808080
      line-height 32px
      >.img
        width 32px
        height @width
        border-radius 50%
        vertical-align middle
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
      padding-left 54px
      box-sizing border-box
      color #808080
      >.title
        line-height 34px
        color #737373
      >.text
        margin-top 15px
        line-height 24px
        width 50%
    &.reply
      padding-left 52px
      margin-top 30px
</style>
