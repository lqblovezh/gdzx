<script>
import { main } from '@/util/mixins'
import { pub } from "./js/public"
import * as service from "services/x-teach/msg"
export default {
  mixins: [main,pub],
  data(){
    return {
      service,
      form:{
        type:'private_message',
        from_user_id:'',
        to_user_id:'',
        content:'',
        pid:'',
      },
      query:{
        to_user_id: this.$route.query.id
      }
    }
	},
  methods:{
    getList(obj){ 
      obj.to_user_id = this.$route.query.id
      this.service.getMsgInfo(obj).then(res=>{
          this.tableData = res.data
          this.total = res.page.total
      })
    },
    detail(item,active){
      this.form.content=" ";
      this.msgInfo = item;
      this.form.from_user_id = item.from_user_id;
      this.form.to_user_id = item.to_user_id;
      this.form.pid = item.id;
      this.active = active;
      this.dialogVisible = true
    },
    async send(){
      if(!this.form.content){
        this.$message.error("消息内容不能为空");
        return 
      }
      await this.service.save(this.form).then(res=>{
          if(res && res.status){
            this.$message.success("发送成功");
            this.active = !this.active 
            this.form.content='';
            this.dialogVisible = false;
            this.getList({to_user_id:this.$route.query.id,...this.page})
          }
        })
    },
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" closed="{search:true}" @currentChange= "handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="用户"  clearable v-model="query.user_name")
    TimePick(@getTime="getTime")
    el-button(type="primary" class="el-icon-search"  @click="seareHandeler(query)" ) 搜索
  .list(slot="list")
    .item(v-for="item in tableData")
      .title 
        b.dy_primary {{item.from_user_name}}
        b {{item.create_time}}
        //el-badge(:value="12")
          span.m 新消息
      .msg {{item.content}}
      .handle
        //span(@click="detail(item,true)") 查看对话
        span(@click="detail(item,false)") 回复
    el-dialog.dialog(:visible.sync="dialogVisible" width="1000px" :before-close="handleClose")
      .title(slot="title" v-if="!active") 回复内容：
      .all
        .msgInfo(v-if="active")
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
    border-bottom 1px dashed #ccc
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

