<script>
export default {
  props:['Info'],
  data(){
    return {}
	},
}
</script>

<template lang="pug">
  div
    .title(slot="title") 回复内容：
    .all
      .msgInfo
        .item
          .title 
            b.dy_primary 信件内容
            b.dy_primary 收于：{{msgInfo.create_time}}
          .msg {{msgInfo.content}}
          .reply(v-for="item in msgInfo.reply")
            .title 
              b.dy_primary {{item.from_user_name}} 回复：
              b.dy_primary {{item.create_time}}
            .msg {{item.content}}
</template>



<style lang="stylus" scoped>
.list
  .item
    padding 10px 0 
    
    color #555
    .title
      line-height 30px
      b
        font-weight bold
        margin 0 40px 0 0 
      .m 
        color #44c3aa
    .msg 
      line-height 20px
      padding 10px 10px 25px
      text-indent 2em
    .reply
      padding-left 25px
      .msg 
        padding 5px 10px 10px
        border-bottom 1px dashed #ccc
    .handle
      display flex
      justify-content flex-end
      font-size 15px
      color #666
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
.msgBack
  padding-top 5px
.noMsg 
  margin-top 20px
  color #999
  font-size 15px
  text-align center
.msgInfo
  max-height 600px
  overflow auto
.all 
  margin-top 10px
</style>


