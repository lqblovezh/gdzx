<template lang="pug">
.dy_layout
  slot(name="content")
  .tpl(v-if="!nav")
    .dy_search(v-if="!ctl.search")
      slot(name="search")
    .container
      slot(name="buttons")
      .dy_body(:class="{group:showGroup}")
        .tableTop(v-if="total")
          .title.vel-line
            span 全部 <span v-if="total" class="totalNum">({{total}})</span>
            .btns
              el-button(size="mini" type="primary" @click="del(false)" plain v-if="ctl.del") 删除
        slot(name="list")
        .page
          el-pagination(
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,50,100]"
            :page-size="10"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          )
        el-dialog.dialog(
          :visible.sync= "dialogVisible"
          :before-close="handleClose"
          :lock-scroll="false"
          :close-on-click-modal="false"
          :width="detailWidth||'1100px'"
        )
          .header(slot="title")
            el-tabs(value="detail" type="card" )
              el-tab-pane(label="详情" name="detail")
                slot.detailColor(name="detail")
          div(slot="footer" class="dialog-footer")
            el-button(type="info" @click="handleClose" size="small" ) 取消
            el-button(type="primary" @click="$parent.save()" size="small") 确定
      .dy_body_right(v-if="showGroup")
        slot(name="groupWrap")
          span asdfsadfadf
</template>

<script>
export default {
  props: ['closed', 'total', 'showGroup', 'nav', 'detailWidth'],
  data() {
    return {
      ctl: null,
      currentPage: 1,
      dialogVisible: false,
    }
  },
  created() {
    this.ctl = this.closed || {}
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('sizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('currentChange', val)
    },
    handleClose() {
      this.dialogVisible = false
    },
    del(type) {
      this.$parent.del(type)
    },
  },
}
</script>

<style lang="stylus" scoped>
.dy_primary.el-icon-edit
  color red
.dy_layout
  padding 20px
  min-width 1400px
  font-size 14px
  >.tab-nav
    .header
      display block
      margin-bottom 20px
      padding 20px
      background #fff
    .container
      background #fff
      padding 20px
  .dy_search
    padding 15px
    line-height 30px
    background #fff
    margin-bottom 15px
    border-radius 5px
    .search
      >div
        display inline-block
        margin-right 8px
        &.right
          // float right
    .dy_inputWidth
      width 145px
  .container
    .dy_body
      width 100%
      padding 15px
      background #fff
      display inline-block
      box-sizing border-box
      &.group
        width calc(100% - 230px)
    .dy_body_right
      border-radius 5px
      margin-left 20px
      overflow hidden
      display inline-block
/* icon dy color */
.page
  text-align center
  padding 40px 0
  overflow auto
.dialog
  color #555
.tableTop
  height 50px
  line-height @height
  margin-top -15px
  .vel-line
    position relative
    &:before
      content ' '
      position absolute
      width 4px
      height 20px
      z-index 10
      top 50%
      background #39baa1
  >.title
    padding-left 15px
    &:before
      margin-left -16px
      margin-top -10px
  .btns
    float right
  input[type='checkbox']
    vertical-align middle
    margin-left 20px
  .totalNum
    color #44c3aa
</style>