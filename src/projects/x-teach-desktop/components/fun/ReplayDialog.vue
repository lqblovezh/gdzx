<script>
export default {
  data() {
    return {
      isOpen: false,
      title: '',
      val: '',
      titleDisabled: false,
      opts: {},
    }
  },
  methods: {
    open({
      resolve,
      reject,
      headname = '添加问题',
      tname = '问题标题',
      valname = '问题描述',
      title,
    }) {
      this.val = ''
      this.resolve = resolve
      this.reject = reject
      this.opts = { headname, tname, valname }
      if (title) {
        this.title = title
        this.titleDisabled = true
      } else {
        this.titleDisabled = false
        this.title = ''
      }
      this.isOpen = true
     //console.log('open')
    },
    cancle() {
      this.isOpen = false
      this.reject({})
      // this.clean()
    },
    clean() {
      this.title = ''
      this.val = ''
    },
    commit() {
     //console.log('x')
      //验证
      if (
        (this.opts.tname && !this.title) ||
        (this.opts.valname && !this.val)
      ) {
        this.$message.error('请输入内容!')
        return
      }
      this.resolve({
        title: this.title,
        val: this.val,
      })

      this.isOpen = false
      this.clean()
    },
  },
}
</script>


<template lang="pug">
.comp-method-replay-dialog(v-if="isOpen")
  .mask   
    .wrap.c_f_bg.c_3
      .conatiner 
        .rhead.bd_line.f18
          .ib {{opts.headname}}
          .fr.cp(@click="cancle")
            .el-dialog__close.el-icon.el-icon-close
        .rbody.f16
          .row(v-if="opts.tname").fix
            span {{opts.tname}} ：
            input.bd_e.c_f5_bg.fr(v-model="title" :disabled="titleDisabled")
          .row.fix(v-if="opts.valname")
            span {{opts.valname}} ：
            textarea.bd_e.c_f5_bg.vt.fr(v-model="val")
        .rfooter
          .btns.fr
            Tbutton(  @click.native="cancle"  type="og" size="small" ) 取消
            Tbutton( @click.native="commit"  type="primary"   size="small"   ) 发送
</template>

<style lang="stylus">
.comp-method-replay-dialog
  >.mask
    >.wrap
      width 1000px
      min-height 500px
      border-radius 4px
      margin auto
      margin-top 100px
      >.conatiner
        >.rhead
          height 52px
          line-height 50px
          padding-left 30px
          >.fr
            height 100%
            width 50px
            text-align center
        >.rbody
          padding 40px
          >.row
            margin-bottom 30px
            >input, textarea
              width 90%
            >textarea
              height 200px
        >.rfooter
          padding-right 40px
          >.btns
            >div
              padding 0 25px
              height 34px
              line-height 32px
</style>
