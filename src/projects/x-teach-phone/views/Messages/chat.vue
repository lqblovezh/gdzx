<template lang="pug">
teach-page(:title="name" class="chat" page-type="center" hide-right)
	.content.c-bg-f
		cube-scroll(
			ref="scroll"
			:options="optoins"
			@pulling-down="onPullingDown"
		)
			.msg-container.c-bg-f(ref="wrapper")
				.msg-box(v-for="item in chatList")
					MsgFrom(v-show="item.from_user_id !== userInfo.id" :msg="item")
					MsgTo(v-show="item.from_user_id === userInfo.id" :msg="item")
		.chat-page--bottom
			button.btn-img
				span.i-img
			textarea.f14.hide-scrollbar.c-bg-f(@input="resizeField" ref="field" rows="1" v-model="content")
			a.send(@click="sendMsg") 发送
</template>
<script>
import { debounce } from '@/utils/helpers'
import { mapState } from 'vuex'
import MsgFrom from '@/components/messages/msgFrom'
import MsgTo from '@/components/messages/msgTo'
import loadmore from '@/mixins/loadmore'
export default {
  components: {
    MsgFrom,
    MsgTo,
  },
  data() {
    return {
      chatList: [],
      maxLine: 4,
      content: '',
      optoins: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '加载ing',
        },
      },
      page: {
        pageStart: 0,
        pageOffset: 10,
      },
      loaded: false,
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    name() {
      return this.$route.query.name
    },
    tid() {
      return this.$route.params.id || ''
    },
  },
  mounted() {
    this.getChatList()
  },
  methods: {
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
    getChatList(flag) {
      if (flag) {
        this.page.pageStart = 0
      }
      this.$service.message
        .getPrivateMsg({
          to_user_id: this.tid,
          ...this.page,
        })
        .then(res => {
          const { data, page } = res
          if (data && data.length) {
            this.chatList = flag ? data : [...data, ...this.chatList]
            this.page.pageStart = this.chatList.length
            if (page.total <= this.chatList.length) {
              this.loaded = true
            }
          }
        })
        .catch(console.info)
    },
    onPullingDown() {
      if (!this.loaded) {
        // do something
        this.getChatList()
      }
      this.$refs.scroll.forceUpdate(true, true)
    },
    sendMsg() {
      this.$service.message
        .sendMsg({
          type: 'private_message',
          from_user_id: this.userInfo.id,
          to_user_id: this.tid,
          content: this.content,
        })
        .then(res => {
          this.content = ''
          this.getChatList(true)
        })
    },
  },
}
</script>
<style lang="stylus">
@import '~@/assets/css/var.styl'

.chat-page
  background #f7f7f7
  height 100vh
  &--bottom
    position fixed
    left 0
    bottom 0
    width 100%
    padding 0.07rem 1rem
    box-sizing border-box
    background-color #f0f0f0
    z-index 2
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
  .content
    background #f7f7f7
    .pr
      width 100%
      height 100%
      .msg-container
        width 100%
        overflow auto
        bottom 0
        padding-bottom 1rem
        background-color #f7f7f7
        padding 0 0.2rem 1rem
        box-sizing border-box
</style>


