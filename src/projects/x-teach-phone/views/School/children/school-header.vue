<template lang="pug">
.header
  .header-left 
    .icon-back(@click="$back()")
  .header-center
    span {{ title }}
  .header-right
    //- .i-bell(@click="$push('messages')")
</template>
<script>
export default {
  props:{
   title:{
     default: '',
     type: String
   }
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/css/var.styl";
.header
  position fixed
  display flex
  width 100%
  align-items center
  line-height: 0.88rem
  background-color #3496e1
  box-sizing border-box
  padding 0.19rem 0.3rem
  height $header-height
  top 0
  left 0
  .header-left
    width 1rem
    height 0.5rem
    line-height 0.5rem
  .header-center
    flex 1
    color #fff 
    font-size 0.38rem
    text-align center    
  .header-right
    text-align right 
    width 1rem
    height 0.5rem
    line-height 0.5rem
    .i-bell
      // margin-left 0.2rem
      // margin-right 0.32rem    
</style>