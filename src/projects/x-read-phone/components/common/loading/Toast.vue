<script>
export default {
  data(){
    return {
      show:false,
      text:'',
    }
  },
  methods:{
    confirm(answer){
      this.show = false 
    },
  }
}
</script>

<template lang="pug">
div(v-if="show")   
  .mask
    .content 
      .top {{text}}
      .line-single
      .bottom 
        .left(@click="confirm(true)") 确定 

</template>

<style lang="stylus" scoped>
.mask
  position absolute
  top 0 
  left 0
  right 0
  bottom 0
  z-index 10000000
  background rgba(0,0,0,0.8)
  .content
    text-align center
    width 5.5rem
    background #fff
    margin auto
    margin-top 35vh
    border-radius 0.15rem
    overflow hidden
    .top 
      height 2.2rem
      line-height 2.2rem
      font-size 17px
      color #555
      font-weight 500
    .bottom
      display flex 
      >div 
        flex auto   
        height 0.85rem
        line-height 0.85rem
        font-size 15px
      .left 
        background   #3cb4ff
        color #fff

</style>
