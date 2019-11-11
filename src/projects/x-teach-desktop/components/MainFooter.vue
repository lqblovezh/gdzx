<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      bottom: state => state.home.bottom,
      application: state => state.application,
    }),
  },
}
</script>

<template lang="pug">
  .main-footer.c_f(v-if="bottom")
    .content.cbox
      .logo-box.ib
        img.img(:src="application.logo_absolute")
        .abs.f12 {{application.exp}}
      .right-box.ib
        .qrs.ib
          .des.f16 关注我们
          .item.ib.tc
            el-popover(
              placement="top"
              trigger="hover"
              popper-class="follow"
              content=""
            )
              .download-panel(v-if="bottom&&bottom.ewm")
                img(:src="bottom.ewm[0].img", alt="")
              .btn(slot="reference")
                .icon.icon-weibo
          .item.ib.tc
            el-popover(
              placement="top"
              trigger="hover"
              popper-class="follow"
              content=""
            )
              .download-panel(v-if="bottom&&bottom.ewm")
                img(:src="bottom.ewm[1].img", alt="")
              .btn(slot="reference")
                .icon.icon-weixin
        .links.ib.f14
          .des.f16 友情链接
          .item.ib.ellipsis(v-for="item,index in bottom.outLink" :key="item.name + index" v-show="index<4")
            a(:href="item.src" target="_blank") {{item.name}}
    .bottom.tc.f12 {{bottom.copyright}}

</template>

<style lang="stylus" scoped>
.main-footer
  background-color #309fc3
  >.bottom
    height 42px
    line-height @height
    color #ffffff
    opacity 0.5
  >.content
    .logo-box
      width 50%
      vertical-align top
      margin-top 45px
      font-size 0
      .img
        // background #dae4e7
      .abs
        color #fff
        margin-top 15px
        opacity 0.8
        padding-right 100px
        box-sizing border-box
        line-height 1.5em
    .right-box
      width 50%
      padding-top 34px
      .des
        line-height auto
        margin-bottom 20px
      >.links
        width 50%
        min-height 150px
        >.item
          line-height 30px
          width 100%
          opacity 0.8
      >.qrs
        width 50%
        vertical-align top
        >.item
          margin-right 12px
          >.txt
            font-size 14px
            margin-top 15px
          >.wrap
            width 100px
            height 100px
            >img
              width 100px
              height 100px
          >.ps
            width 100px
            height 100px
  a:link
    color #fff
  a:visited
    color #fff
  a:hover
    color #fff
  a:active
    color #fff
</style>
