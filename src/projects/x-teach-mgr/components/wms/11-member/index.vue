<script>
import { main } from '@/util/mixins'
import * as service from "services/x-teach/member"
import * as msg from "services/x-teach/msg"
export default {
  mixins: [main],
  data(){
    return {
      service,
      query:{
         name:'',
         phone:'',
         time_start:'',
         time_end:'',
      },
      form:{
        pass:'',
        id:'',
      },
      msg:'',
      ids:[],
      dialogVisible:false,
      pt:{teach:true,read:true},
    }
  },
  methods:{
    sendMessage(){
      msg.save({
				to_user_id:this.form.id,
				type:'private_message',
				content:this.msg,
			}).then(res=>{
				 this.$message.success("消息发送成功")
				 this.msg=" "
			},err=>{
         this.$message.err(err.payload.message)
      })
    },
    writeMsg(id){
      this.service.detail({id}).then(res => {
        this.detailData = res.data
        this.form.id = res.data.id
      })
      this.dialogVisible= true
    },
    disabled(type,id){
      service[type]({id}).then(res=>{
        this.getList({...this.query,...this.page})
        this.$message.success('操作成功')
      },err=>{
        this.$message.error(err.payload.message) 
      })
    },
    resetPwd(){
      this.form.pass = 1
    },
    getMsg(){
      
    },
    save(){
      this.service.save({...this.form,...this.detailData}).then(res=>{
         if(res.status){
					 this.$message.success('保存成功')
           this.getList({...this.query,...this.page});
           this.$refs.child.dialogVisible= false
         }
      },err=>{
				  this.$message.error(err.payload.message)
			});
    }
  }
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="姓名"  clearable v-model="query.name")
    el-input.dy_inputWidth(placeholder="电话" clearable v-model="query.phone")
    el-select.dy_inputWidth(v-model="query.lock_status")
      el-option(label="全部" value="")
      el-option(label="正常" value="normal")
      el-option(label="冻结" value="locked")
    el-button(type="primary" @click="seareHandeler(query)") 搜索
    el-button(type="danger" @click="del(ids)" ) 批量删除
  .list(slot="list")
    el-table(ref="table"
            stripe
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"  
            @selection-change="handleSelectionChange"
            )
      el-table-column(type="selection" width="55" fixed)
      el-table-column( prop="name" label="姓名")
      el-table-column( prop="phone" label="电话" )
      el-table-column( prop="credits" label="积分")
      //el-table-column(  label="分销金额")
      el-table-column( label="状态" )
        template(slot-scope="scope")
          span {{scope.row.lock_status=='normal'?'正常':'冻结'}}
      el-table-column(label="操作" fixed="right")
        template(slot-scope="scope")
          Icon(title="详情" @click="detail(scope.row.id)")
          Icon(title="私信" @click="writeMsg(scope.row.id)")
          Icon(title="点击冻结" @click="disabled('lock', scope.row.id)" v-if=" scope.row.lock_status =='normal'")
          Icon(title="点击解冻" @click="disabled('unlock', scope.row.id)" v-else)
          Icon(title="删除" @click="del([scope.row.id])")  
    el-dialog(:visible.sync="dialogVisible" width="500px" :before-close="handleClose")
      .message 
        .title 发送私信
        .p.showInfo 
          span {{detailData.nick_name}}
          a(@click="$router.push({path:'/wms/message/show',query:{id:detailData.id}})") 查看私信记录
        el-input.content(
          type="textarea"
          :autosize="{ minRows: 7}"
          v-model = "msg"
          placeholder="私信内容"
        )
      .footer(slot="footer" class="dialog-footer")
        el-button.right(type="primary" @click="sendMessage()" size="small") 确定
  .detail(slot="detail")
    .head
      .cover
        .img
          img(:src="detailData.picture_absolute" ref="img")
      .info
        .group
          .item 
            span 用户名：
            el-input.width(size="small" v-model="detailData.name")
          .item 
            span 昵称：
            el-input.width(size="small" v-model="detailData.nick_name")
          .item 
            el-button(size="small" @click="resetPwd") 重置密码
            span.tips 重置保存后密码修改为123456
          .item 性别:
            span.sex
              el-radio(v-model="detailData.sex" label="男") 男
              el-radio(v-model="detailData.sex" label="女") 女
              el-radio(v-model="detailData.sex" label="保密") 保密 
          .item 
            span 出生年月：
            el-date-picker.width(size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="detailData.date_of_birth")
          .item 
            span 绑定手机号：
            el-input.width(size="small" v-model="detailData.phone")
          .item 
            span 联系邮箱：
            el-input.width(size="small" v-model="detailData.email")    
          .item 消费金额： {{ 0 || 0 }}
          .item 积分： {{detailData.credits || 0 }}
          .item 订单数： {{ 0 || 0 }}
    .group 
      el-tabs
        el-tab-pane(label="x-teach拥有产品")
          .list
            .item(v-for="vo in 0")
              img.pic(src="vo.img")
              .txt(title="vo.txt") {{vo.txt}}
</template>



<style lang="stylus" scoped>
.message 
  color #444
  .title 
    text-align center
    font-size 20px
    padding 15px 0 30px 0
  .showInfo
    display flex
    justify-content space-between
    padding-bottom 20px
    a 
      color #0084ff
  .content
    margin-bottom 20px
.detail
  .head 
    display flex
  .group
    display flex
    flex-wrap wrap
  .cover
    text-align center
    .img
      height 150px
      width 150px
      display block
      background #e8e8e8
      margin-bottom 30px
      img
        width 150px
        height 150px
        object-fit contain
  .item 
    margin 5px  10px
    .sex 
      margin 10px 0 0 10px
      display inline-block
      height 20px
    .tips 
      font-size 12px 
      color #999
      margin-left 10px
  .width
    width 155px
  .num 
    width 50px
  .list 
    display flex
    .item 
      height 180px
      width 150px
      border 1px solid #e8e8e8
      margin-bottom 5px
      .pic 
        height 150px 
        max-width 150px
      .txt 
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
.footer 
  text-align right
</style>

