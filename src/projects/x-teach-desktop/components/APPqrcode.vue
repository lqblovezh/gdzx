<script>
export default {
  mounted() {},
  props: {
    data: {
      default: () => {
        return {
          img: 'https://img10.360buyimg.com/da/jfs/t7525/251/1899038567/28110/d5764256/59a51bf6Nb8e478cc.png',
          name: 'APP下载',
        }
      },
    },
  },
}
</script>


<template lang="pug">
.comp-qrcode.ib.tc
  .top.f22 {{data.name}}
  .qrimg.ib.c_f.bbox
    img(:src="data.img")
  .txt.c_f 
    .t1.f14 扫码下载
    .t2.f18 随时随地学习
</template>


<style lang="stylus">
.comp-qrcode
  width 210px
  .top
    color #1d7b99
    height 54px
    line-height 50px
  .qrimg
    width 150px
    padding 20px
    >img
      width 110px
      height @width
      object-fit contain
  .txt
    padding-bottom 15px
    color #72848a
    .t1
      height 25px
      line-height 30px
    .t2
      height 30px
      line-height 30px
</style>
