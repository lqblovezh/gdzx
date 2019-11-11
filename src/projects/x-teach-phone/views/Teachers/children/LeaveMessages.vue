<template lang="pug">
.leave-messages
  .full-layout(v-show="isShow" @click="isShow=false")
    transition(name="slide-up")
      .leave-messages--container.c-bg-f(v-show="isShow" @click.stop)
        .f15.title.container 共{{page.total}}条留言
        .leave-messages--content
          .wrapper.container
            cube-scroll(
              ref="scroll"
              :options="options"
              @pulling-up="onPullUp"
            )
              leave-messages-item(
                v-for="(item, index) in list"
                :item="item"
                :key="item.id"
                @reply="replyUser"
              )
                leave-messages-item(
                  v-for="(reply, index) in item.reply"
                  :item="reply"
                  :key="reply.id"
                  @reply="replyUser"
                )
        div(:class="{'full-layout--edit': isFocus}" @click="layerFocusHandler")
          .leave-messages--bottom(@click.stop)
            button.btn-img
              span.i-img
            textarea.f14.hide-scrollbar.c-bg-f(
              :placeholder="placeholder"
              ref="field"
              rows="1"
              v-model="content"
              @input="resizeField"
              @focus="isFocus = true"
            )
            a.send(@click="reply") 发送
</template>
<script>
import { debounce } from '@/utils/helpers'
export default {
  data() {
    return {
      list: [],
      isShow: false,
      isFocus: false,
      content: '',
      page: {
        pageStart: 0,
        pageOffset: 10,
        total: 0,
      },
      placeholder: '发表留言',
      loaded: false,
      replyInfo: {},
      options: {
        pullUpLoad: {
          txt: {
            more: '',
            noMore: '没有更多数据了~',
          },
        },
      },
    }
  },
  computed: {
    teacher_id() {
      const { userId } = this.$route.query
      return userId
    },
  },
  methods: {
    // 组件显示时，监听窗口的大小更改事件，用于输入框的逻辑处理
    show() {
      this.isShow = true
      this.getList(true)
      this.prev_height = document.body.clientHeight
      window.addEventListener('resize', this.resizeHandler)
    },
    changeHandler() {
      window.removeEventListener('resize', this.resizeHandler)
    },
    // 当移动端下，输入法隐藏时，
    // 就让输入框失焦，并手动触发隐藏背景层的句柄
    resizeHandler() {
      if (document.body.clientHeight === this.prev_height) {
        this.$refs.field.blur()
        this.layerFocusHandler()
      }
    },
    layerFocusHandler() {
      if (this.isFocus) {
        this.isFocus = false
        this.replyInfo = {}
        this.placeholder = '发表留言'
      }
    },
    async onPullUp() {
      if (!this.loaded) {
        await this.getList()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
    async getList(clear) {
      if (clear) {
        this.page.pageStart = 0
      }
      try {
        const { data, page } = await this.$service.teacher.getTeacherMessage({
          to_user_id: this.teacher_id,
          ...this.page,
        })
        this.page.total = page.total
        if (data) {
          this.list = clear ? data : [...this.list, ...data]
          this.page.pageStart = this.list.length
          if (page.total <= this.list.length) {
            this.loaded = true
          }
        }
      } catch (e) {
        this.$catchError(e)
      }
    },
    replyUser({ id: pid, from_user_id: to_user_id, from_user_name } = {}) {
      this.replyInfo = { pid, to_user_id }
      this.placeholder = `回复：${from_user_name}`
      this.$refs.field.focus()
    },
    async reply() {
      try {
        await this.$service.message.sendMsg({
          type: 'leave_word',
          to_user_id: this.teacher_id,
          content: this.content,
          ...this.replyInfo,
        })
        this.content = ''
        this.getList(true)
      } catch (e) {
        this.$catchError(e)
      } finally {
        this.layerFocusHandler()
      }
    },
    resizeField: debounce(function() {
      const { field } = this.$refs
      field.setAttribute('rows', 1)
      const { scrollHeight } = field
      let {
        'line-height': lineHeight,
        'padding-top': pt,
        'padding-bottom': pb,
      } = document.defaultView.getComputedStyle(field)
      let rows = Math.round(
        (scrollHeight - parseFloat(pt) - parseFloat(pb)) /
          parseFloat(lineHeight)
      )
      field.setAttribute('rows', rows >= this.maxLine ? this.maxLine : rows)
    }, 100),
  },
}
</script>
<style lang="stylus">
.leave-messages
  &--container
    position absolute
    bottom 0
    width 100%
    left 0
    height 90%
    border-top-left-radius 0.2rem
    border-top-right-radius 0.2rem
    .title
      padding 0.2rem 0
      color #4d4d4d
  &--content
    position absolute
    top 0.8rem
    bottom 1rem
    width 100%
    .wrapper
      height 100%
      .leave-messages-item
        .leave-messages-item
          &:last-child
            border-bottom none
          img
            width 0.4rem
            height 0.4rem
  &--bottom
    position absolute
    bottom 0
    left 0
    width 100%
    padding 0.07rem 1rem
    box-sizing border-box
    background-color #f0f0f0
    textarea
      width 100%
      padding 0.15rem 0.1rem
      line-height 0.5rem
      border-radius 0.1rem
      border-width 0
      resize none
      outline none
      box-sizing border-box
      word-break break-all
      transition height 0.1s cubic-bezier(0.29, 0.14, 0.49, 0.64)
    .send, .btn-img
      position absolute
    .send
      right 0.1rem
      bottom 0.2rem
      padding 0.1rem
    .btn-img
      left 0.3rem
      bottom 0.35rem
</style>
