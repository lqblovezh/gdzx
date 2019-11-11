<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as authority from 'services/x-publish/menu'
import {getUserInfo} from 'services/x-publish/common'
import * as common from 'services/x-publish/common'

export default {
  name: "App",
  async created(){
    let user =  getUserInfo()
    await this.getAuthority()//获取权限列表
  },
  methods: {
    async getAuthority() {
      await authority.menu().then(res => {
        this.updateAuthority(res.data)
        this.updateUser(getUserInfo())
      }).catch(({payload}) => {
        if(!payload) return
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    ...mapMutations(['updateUser','updateAuthority'])
  }
};
</script>

<style lang="stylus">
// #app
//   font-family "Avenir", Helvetica, Arial, sans-serif
//   -webkit-font-smoothing antialiased
//   -moz-osx-font-smoothing grayscale
body .el-tabs__content
  font-size 14px
.dy_icon
  padding 0 4px
  cursor pointer
  // font-size 16px
.dy_primary
  color #44c3aa
.dy_danger
  color #F56C6C
#app .el-dialog__body
  padding 0 20px 20px
#app .el-tabs__item
  line-height 35px
#app .el-switch__label *
  // font-size 16px
#app .is-active
  color #44c3aa
#app .el-table
  color #000
  thead
    color #000
    th
      background-color #efefef
    // .cell
    //   line-height 25px
    //   font-size 16px
  tbody
    .cell
      font-size 14px
#app .hight.el-table .cell
  line-height 20px
  font-size 14px
#app .search .el-range-input
  width 80px
#app .search .el-date-editor
  padding-top 0
  width 255px
#app .el-tree-node__content
  height 35px
.el-table--striped .el-table__body tr.el-table__row--striped td
  background #efefef
.cell
  .cover-photo
    max-width 47px 
    max-height 59px
    vertical-align middle
  .bookName
    width calc(100% - 55px)
    display inline-block
    padding-left 5px
    vertical-align middle
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
