<script>
export default {
  props: {
    imgUrl: {
      default: '',
    },
    title: {
      default: '',
    },
    name: {
      default: '',
    },
    job: {
      default: '',
    },
    education: {
      default: '',
    },
    abstract: {
      default: '',
    },
    email: {
      default: '',
    },
  },
}
</script>


<template lang="pug">
  .comp-user-teacher-card 
    .wrap.fix
      .img.c_e0_bg.fl
        img(:src="imgUrl").vm
      .msg 
        .name.c_theme.f18 {{name}}
        .p 
          span 学历：
          span {{education}}  
        .p 
          span 职称：
          span {{title}}  
        .p 
          span 职务：
          span {{job}}  
        .p 
          span 简介：
          span {{abstract}}  
        .p 
          span 邮箱：
          span {{email}}  

</template>
<style lang="stylus">
.comp-user-teacher-card
  >.wrap
    >.img
      width 230px
      height 230px
      text-align center
      line-height 230px
      border-radius 50%
      >img
        border-radius 50%
        width 210px
        height 210px
    >.msg
      padding-left 260px
      padding-top 20px
      line-height 30px
      >.p
        >span:first-child
          color #666
        >span:last-child
          color #444
</style>
