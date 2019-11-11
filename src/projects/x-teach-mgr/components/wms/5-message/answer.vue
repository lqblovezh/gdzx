<script>
import { main } from '@/util/mixins'
import { pub } from "./js/public"
import * as service from "services/x-teach/msg"
export default {
  mixins: [main,pub],
  data(){
    return {
      query:{
         name:'',
         type:'answering_question',
         time_start:'',
         time_end:'',
      },
      service,
      
      form:{
        type:'answering_question',
        from_user_id:'',
        to_user_id:'',
        content:'',
        pid:'',
      },
    }
  },
  methods:{
    
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="用户"  clearable v-model="query.name")
    TimePick(@getTime="getTime" :placeholder="['创建时间','结束时间']")
    el-button(type="primary" class="el-icon-search"  @click="seareHandeler(query)" ) 搜索
  .list(slot="list")
    .item(v-for="item in tableData")
      .title 
        b {{item.from_user_name}}
        b {{item.title}}
        b {{item.course_name}}
        b {{item.create_time}}
        span.m(v-if="item.reply&&!item.reply.length") 新疑问
      .msg {{item.content}}
      .handle
        span(@click="detail(item,true)") 查看对话
        span(@click="detail(item,false)") 回复
        span.danger(@click="del(item.id)") 删除
    el-dialog.dialog(:visible.sync="dialogVisible" width="1000px" :before-close="handleClose")
      .title(slot="title" v-if="!active") 回复内容：
      .all
        .msgInfo(v-if="active")
          .item
            .title 
              b.dy_primary 问题内容
              b.dy_primary 收于：{{msgInfo.create_time}}
            .msg {{msgInfo.content}}
          .item.reply(v-for="item in msgInfo.reply")
            .title 
              b.dy_primary {{item.from_user_name}} 回复：
              b.dy_primary {{item.create_time}}
            .msg {{item.content}}
        .msgBack(v-else)
          el-input(type="textarea" v-model="form.content" :rows="7" placeholder="请输入回复内容")
      div(slot="footer" class="dialog-footer" v-if="active" )
        el-button(type="primary" @click="tabs" size="small" ) 回复
      div(slot="footer" class="dialog-footer" v-else )
        el-button( @click="tabs" size="small") 返回
        el-button(type="primary" @click="send" size="small" ) 发送
    .noMsg(v-if="!tableData.length") 暂无数据
  .detail(slot="detail")
    .group
      .item
</template>



<style lang="stylus" scoped>
.list
  .item
    padding 10px 0 
    border-bottom 1px solid #e8e8e8
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
  .reply
    .msg
      padding 10px
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

