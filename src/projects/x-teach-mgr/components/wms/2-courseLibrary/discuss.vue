<script>
import { main } from '@/util/mixins'
import Item from "./item"
import * as service from "services/x-teach/comment"
// import * as service from "services/x-teach/lives"

export default {
  mixins: [main],
  components: {
    Item
  },
  data() {
    return {
      service,
      active: true,
      query:{
        course_id: this.$route.query.id,
      },
      currentItem: null,
    }
  },
  created () {
    if(!this.$route.query.id){
      this.$router.back()
      return
    }
  },
  methods:{
    tabs(){
      this.active = !this.active 
    },
    add() {
      const {id,course_id,contents} = this.currentItem
      service.add({
        pid:id,
        course_id,
        content:contents,
      }).then(res => {
        this.dialogVisible = false
        this.getList({...this.page,...this.query})
      })
    },
    thumbsUp(item){
      service.thumbsUp({comment_id:item.id}).then(res => {
        this.getList({...this.page,...this.query})
        this.$message.success(res.message)
      })
    },
    backMsg(item){
      this.currentItem = item
      this.active = false
      this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible= false
    }
  },
  provide() {
    return {
      thumbsUp: this.thumbsUp,
      backMsg: this.backMsg,
      handleClose: this.handleClose,
      del: this.del
    }
  } 
}
</script>

<template lang="pug">
TPL(@sizeChange="handleSizeChange" @currentChange="handleCurrentChange"  :total="total" ref="child" :closed="{search:true}")
  //- .tab-nav(slot="content")
  //-   el-button-group.header
  //-     el-button(type="primary" plain) 学习讨论
  .list(slot="list")
    .item(v-for="item in tableData")
      Item(:list='item')
    el-dialog.dialog(:visible.sync="dialogVisible" width="1000px" :before-close="handleClose")
      .title(slot="title" v-if="!active") 回复内容：
      .all
        .msgInfo(v-if="active")
          .item(v-for="item in 2")
            .title 
              b.dy_primary 私信发起者名称
              b.dy_primary 2018-5-5 14:22:50
            .msg Loremcs ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
        .msgBack(v-else)
          el-input(type="textarea" :rows="7" v-model="currentItem.contents" placeholder="请输入回复内容")
      div(slot="footer" class="dialog-footer"  )
        el-button( @click="handleClose" size="small") 取消
        el-button(type="primary" @click="add" size="small" ) 回复
  .detail(slot="detail")
    .group
      .item
  
</template>



<style lang="stylus" scoped>
.list
  .list
    >>>.item
      >.child
        background #f3f3f3
.msgBack
  padding-top 5px
</style>

