<script>
export default {
  props: {
    imgUrl: {
      default: '',
    },
    name: {
      default: '',
    },
    des: {
      default: '',
    },
    tag: {
      default: '', // 高亮文本
    },
    num: {
      default: '',
    },
    teacher: {
      default: '',
    },
    organization: {
      default: '', // 组织单位
    },
    star: {
      default: false,
    },
    studied: {},
    price: {
      default: false,
    },
    isBdLine: {
      default: false,
    },
    teachNum: {
      default: false,
    },
    tiem: {},
    url: {},
  },
}
</script>


<template lang="pug">
  .comp-card-horizon
    .wrap.vt-all
      .img
        img(:src="imgUrl", alt="alt")
      .content.ib.f14
        .name.f600.f16.c_3 {{name}}
        .des.ellipsis.c_6
          span 简介：
          span {{des}}
        .time.c_8
          span 开始时间：
          span {{tiem}}
        .btns 
          .mybtn.bd.vm-all
            a(:href="url" target="_blank") 
              .ib.theme.c_theme 进入直播
            //- .icon.icon-cart
</template>
<style lang="stylus">
.comp-card-horizon
  >.wrap
    width 100%
    >.img
      width 250px
      height 208px
      display inline-block
      overflow hidden
      >img
        object-fit contain
        height 100%
        width 100%
    >.content
      display inline-block
      width calc(100% - 300px)
      margin-left 30px
      line-height 40px
      >.name
        line-height 50px
      >.btns
        margin 10px 0
        >.mybtn
          border-radius 20px
          color #309fc3
</style>
