<script>
export default {
  name: 'items',
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
      .content
        .title
          span.name {{list.from_user_name||'学生姓名'}}
          span.time {{list.create_time}}
        .msg {{list.content}}
      .handle
    .child(v-if='isFolder' :class="{noPadding:list.layer>=3}")
      items(v-for='items in list.reply' :list='items' :key="items.id")
</template>



<style lang="stylus" scoped>
.list
  background #f5f5f5
  padding 20px 20px 0
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
      padding-left 40px
      &.noPadding
        padding-left 0
    .content
      display inline-block
      width 100%
      .title
        .name
          font-weight bold
          margin-right 20px
          color #5c99ad
        .time 
          color #b3b3b3
      .msg 
        line-height 20px
        padding 20px 0
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

