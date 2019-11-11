<script>
export default {
  props: ['item', 'type'],
  data() {
    return {
      icon: null,
    }
  },
  created() {
    console.log(this.$props, 111111)
    if (this.type) {
      this.icon = 'success'
    } else {
      this.icon = 'failure'
    }
  },
}
</script>

<template lang="pug">
  .comp-integral-status
    .type.c_og_2
      .img.ib.vt.icon(:class="'icon-'+ icon")
      span.f22 {{type?'兑换成功':'兑换失败'}}
    .text.c_2(v-if="type")
      .resources(v-if="item&&item.type=='resources'")
        a(:href="item.url") 点击查看你的资源
      .books(v-else-if="item&&(item.type=='books'||item.type=='pod_book')")
      .coupon(v-else)
        span 请去你的 
        span.cp.c_blue0(@click="$go('/user/integral')") 个人中心
        span  查看吧
    .text.c_2(v-else)
      span 非常抱歉，您的积分不足
    .btns.tc
      el-button(type="primary" @click="$emit('close')" size="small") 确定
</template>

<style lang="stylus">
.comp-integral-status
  text-align center
  .type
    margin-bottom 45px
    >.img
      width 30px
      height @width
      margin-right 14px
  >.btns
    margin-top 50px
    button
      width 100px
</style>
