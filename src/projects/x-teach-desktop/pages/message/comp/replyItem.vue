<script>
export default {
  name: 'replyItem',
  props:['list'],
  data(){
    return {
      maxLength: 300,
      toggle: false
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    isFolder() {
      return this.list.reply && this.list.reply.length
    },
    compareWithMax () {
      return this.list.content && this.list.content.length > this.maxLength
    }
  },
  methods:{
    maxSlice (str) {
      return this.compareWithMax ? `${str.substr(0, this.maxLength)}...` : str
    }
  }
}
</script>

<template lang="pug">
.list
  .item
    .parent
      .content
        .ib.c_f.answer.c_gn2_bg 答
        .title.flex.flex-between
          span.name {{list.from_user_name||'教师'}}
          span.time {{list.create_time}}
        .msg {{ toggle ? list.content : (list.content && maxSlice(list.content))}}
        .showmore.f14.tc(v-show="compareWithMax" @click="toggle = !toggle") {{ toggle?'收起':'更多'}}
          span.ib.icon-expand(:class="{rotate: toggle}")
      .handle
    .child(v-if='isFolder' :class="{noPadding:list.layer>=3}")
      replyItem(v-for='items in list.reply' :list='items' :key="items.id")
</template>

<style lang="stylus" scoped>
.list
  background #f5f5f5
  padding 20px 10px 0
  font-size 14px
  border-bottom 1px solid #e6e6e6
  .item
    color #555
    position relative
    .parent
      border-bottom 1px dashed #ccc
      &:last-child
        border none
    >.child
      padding-left 34px
      &.noPadding
        padding-left 0
    .content
      position relative
      display inline-block
      width 100%
      >.showmore
        color #3AA3c5
        padding-bottom 10px
        cursor pointer
        >span
          line-height 19px
          margin-left 5px
          transition all .3s ease
          &.rotate
            transform rotate(180deg)
      >.answer
        position absolute
        left 0
        top 0
        width 24px
        height 24px
        line-height 24px
        border-radius 5px
        text-align center
      .title
        padding-left 34px
        .name
          font-weight bold
          margin-right 20px
          color #5c99ad
        .time 
          color #b3b3b3
      .msg 
        line-height 20px
        padding 20px 10px 20px 34px
        color #808080
    .handle
      justify-content flex-end
      font-size 15px
      color #666
      position absolute
      top 16px
      right 0
      span 
        padding 0 8px
        border-right 1px solid #999
        cursor pointer
        &:last-child
          border none
        &:hover 
          color #44c3aa
      .danger:hover 
        color #f00
</style>

