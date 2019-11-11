<script>
export default {
  props: {
    val: {},
    name: {
      default: '标题',
    },
    time: {
      default: '2018-10-11',
    },
    type: {
      default: 'question', // answer
    },
    to_fromUserName:{}
  },
  data() {
    return {
      items: {
        question: {
          name: '问',
          timeName: '提问时间',
          class: 'c_blue2_bg',
        },
        answer: {
          name: '答',
          timeName: '解答时间',
          class: 'c_gn2_bg',
        },
      },
    }
  },
}
</script>


<template lang="pug">
  .comp-answer-item 
    .wrap 
      .type.f16.c_f(:class="items[type].class") {{items[type].name}} 
      .content
        .name 
          span.f13.fr.c_6 {{items[type].timeName}} ：{{time}}
          div.f16 {{to_fromUserName}}  {{name}}
        .val.c_3.f14 {{val}}
</template>
<style lang="stylus">
.comp-answer-item
  >.wrap
    position relative
    >.type
      position absolute
      width 24px
      height 24px
      border-radius 4px
      text-align center
      line-height 24px
    >.content
      padding-left 40px
      >.name
        padding 0
      >.val
        line-height 20px
        margin 20px 0
</style>
