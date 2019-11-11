<template lang="pug">
  .message-textarea.c-bg-f
    .message-textarea--bottom
      .message-textarea--static.clearfix
        .fl
          span.i-img
          span.text.f15(@click="handleShow") 发表评论
        .fr.c-theme 发布
    ev-overlay(
      v-model.sync="edit"
      allow-click-hide
      @change="handleClose"
      transition="fade-in"
    )
      .message-textarea-block.c-bg-f(@click.stop="")
        .fr
          a.i-close.close(@click="handleClose")
        input.question-title.f15(
          v-show="fieldType !== 'normal'"
          ref="title"
          v-model="title"
          placeholder="标题"
        )
        textarea.c-3.f15(
          ref="myInput"
          :placeholder="placeholder"
          v-model="text"
        )
        .message-textarea--static.clearfix
          .fl.i-img
          .fr.c-theme(@click="send") 发布
</template>
<script>
export default {
  name: 'message-textarea',
  props: {
    placeholder:{
      type: String,
      default:'请输入内容'
    },
    fieldType: {
      type: String,
      default: 'normal'
    }
  },
  data () {
    return {
      edit: false,
      title: '',
      text: ''
    }
  },
  methods: {
    handleShow () {
      this.edit=true
      this.$nextTick(() => {
        if (this.fieldType === 'normal') {
          this.$refs.myInput.focus()
        } else {
          this.$refs.title.focus()
        }
      })
    },
    // 清除数据
    handleClose() {
      this.title = ''
      this.text = ''
      this.edit = false
      this.$emit('close')
    },
    send () {
      if (this.text) {
        let temp = this.fieldType === 'normal'? this.text:{title: this.title, content: this.text }
        this.$emit('send', temp)
      } else {
        this.$Toast({
          message: '数据不能为空',
          iconClass: 'icon-failed',
          duration: 1000
        })
      }
    }
  }
}
</script>
<style lang="stylus">
@import '~@/assets/css/var.styl'
.message-textarea
  &--bottom
    position fixed
    bottom 0
    left 0
    width 100%
    height $textarea-height
    padding 0 $layout-padding
    box-sizing border-box
    box-shadow 0 0 0.04rem rgba(0,0,0,.2)
  &--static
    margin-top (($textarea-height - 0.4rem)/2)
    line-height 0.4rem
    .text
      color #808080
      margin-left $layout-padding
  &-block
    position fixed
    bottom 0
    width 100%
    padding $layout-padding
    box-sizing border-box
    .question-title
      padding 0.3rem 0
      width 100%
    textarea
      height 2.65rem
      width 100%
      line-height 1.5
      box-sizing border-box
      resize none
      border-width 0
      outline none
</style>