<script>
import Player from './Player'
export default {
  components: {
    Player
  }
}
</script>
<template lang="pug">
.comp-learn-body
  .learn-body__bg
    .learn-content.pr.tc
      //- img(src="http://xnjd.xnjd.xc4.kf.gli.cn/files/view/common_release_files/8bd22ed6-9f31-4ae6-b2f3-9ac901a1593e/2018/11/20181112160814_5be934ee45706.jpg")
      Player(src="http://qmt.xc4.gli.cn/files/view/common_release_files/8c813e21098541fb99f2b52a13a96b69/2019/03/20190307173740_5c80e6640da24.mp4" poster="")
      .learn-time.pa.c_f 学习时长：58分钟
    .learn-intro 计划简介：一个国家的发展需要国民辛勤地耕耘；一个民族的振兴需要民众的自尊自强一个中国的年轻学者
  //- .
</template>
<style lang="stylus">
.comp-learn-body
  padding-left 258px
  height 100%
  background-color #303036
  .learn-body__bg
    padding 40px
    padding-bottom 90px
    height 100%
    box-sizing border-box
    .learn-content
      height 100%
      background-color #2b2b2b
    .learn-time
      top 10px
      right 10px
    .learn-intro
      margin-top 27px
      color #dadcde
</style>