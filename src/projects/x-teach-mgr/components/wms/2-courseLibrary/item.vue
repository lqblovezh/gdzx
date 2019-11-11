<script>
export default {
  name: 'items',
  inject: ['thumbsUp', 'backMsg', 'handleClose', 'del'],
  props:['list'],
  data(){
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    isFolder() {
      return this.list.reply && this.list.reply.length
    }
  },
  methods:{
    
  }
}
</script>

<template lang="pug">
.list
  .item
    .parent
      .photo
        img(:src="list.picture||'./bg.png'", alt="alt")
      .content
        .title 
          b(v-if="list.layer>=3") {{list.user_name+'-'+list.user_name}}
          b(v-else) {{list.user_name||'学生姓名'}}
          b {{list.create_time}}
        .msg {{list.content}}
      .handle
        span(@click="thumbsUp(list)") {{list.praise_state?'取消赞':'点赞'}}
        span(@click="backMsg(list)") 回复
        span.danger(@click="del(list.id)") 删除
    .child(v-if='isFolder' :class="{noPadding:list.layer>=3}")
      items(v-for='items in list.reply' :list='items' :key="items.id")
</template>



<style lang="stylus" scoped>
.list
  .item
    color #555
    position relative
    .parent
      border-bottom 1px dashed #ccc
    >.child
      padding-left 40px
      &.noPadding
        padding-left 0
    .photo
      width 100px
      height @width
      display inline-block
      text-align center
      img 
        margin-top 20px
        width 60px
        height @width
        border-radius 50%
        box-sizing border-box
        box-shadow: 0px 0px 6px 2px #ddd
    .content
      display inline-block
      width calc(100% - 100px)
      .title
        line-height 30px
        b
          font-weight bold
          margin 0 40px 0 0 
        .m 
          color #44c3aa
      .msg 
        line-height 20px
        padding 10px
        text-indent 2em
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

