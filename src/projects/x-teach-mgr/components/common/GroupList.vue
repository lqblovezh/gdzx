<script>
export default {
  props:['groupList' , 'currGroup'],
  data(){
    return {
      newGroupDialogOpen:false,
      updateGroupDialogOpen:false,
      currEditGroup:null,
    }
  },
  created(){
  },
  computed:{
  },
  methods:{
    groupChange(id){
      log(11111)
      this.$emit('groupChange' , id) // 向父组件发送事件和数据
    },
    addGroupDialog(){

    },
    delGroup(item){
      this.$confirm("是否删除分组:"+item.name).then(res=>{
        dir(res)//confirm
        this.$emit("delGroup",item.id)
      }).catch(res=>{
        dir(res)//cancle
      })
    },
    updateGroupDialog(item){
      this.currEditGroup = item
      log(item)
      this.updateGroupDialogOpen = true
    },
    // 添加分组
    addGroup(){
      var flag = this.$refs.addGroupForm.valiAll()
      if(!flag) return
      var node = document.querySelector('#addGroupForm' )

      this.$emit('addGroup',node)
      this.newGroupDialogOpen = false
    },
    updateGroup(){
      var flag = this.$refs.updateGroupForm.valiAll()
      if(!flag) return
      var node = document.querySelector('#updateGroupForm' )
      this.$emit('updateGroup',node)
      this.updateGroupDialogOpen = false
    },
    moveToSubmit(){ //移动数据到分组
      this.$emit('moveGroup')
    },
  },
}
</script>

<template lang="pug">
.div
  .groupWrap
    p.name 课程分组
    .list
      ul
        li.licontent( :class="{red: item.id == currGroup }"  v-for="item in groupList" )
          .name.ellipsis(  @click="groupChange(item.id)"   :title="`${item.name}(${item.num})` "  )
            span.title {{item.name}}
            span {{`(${item.num})`}}
</template>


<style lang="stylus" scoped>
.groupWrap
  display inline-block
  width 209px
  min-height 545px
  background #fff
  position relative
  >.name
    height 50px
    text-align center
    background #e4fbf6
    line-height 50px
    font-size 14px
    color #666666
    &.red
      background #efefef
.formWrap
  text-align center
.red
  background #efefef
.licontent
  height 50px
  line-height 50px
  padding-left 13px
  position relative
  cursor pointer
  &:first-child
    text-indent 10px
    font-size 16px
    color #424857
    font-weight 500
    &:after
      border-bottom 1px solid #e3e6ec
      z-index 10
    .name
        font-size 16px
        display initial
        // font-weight 600
    &:before
      content " "
      width 3px
      height 19px
      background #39baa1
      position absolute
      z-index 10
      margin-top 15px
      margin-left -10px
  .name
    display inline-block
    height 100%
    width 100%
    overflow hidden
    width 150px
    font-size 14px
    position relative
    .title
      max-width 110px
      display inline-block
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  &:after
      content " "
      position absolute
      width 188px
      border-bottom 1px dashed #e3e6ec
      bottom 0
      left 10px
</style>


