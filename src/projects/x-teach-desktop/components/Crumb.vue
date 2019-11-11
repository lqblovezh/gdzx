<script>
export default {
  props: {
    name: {},
  },
  data() {
    return {
      innerName: '',
    }
  },
  created() {},
}
</script>


<template lang="pug">
.comp-crumb 
  .wrap.c_9 
    .cbox
      .item.ib.cp.mr20
        .name.f14.vm.ib.pr10.active_normal(@click="$go('/home')") 首页
        .icon.icon-arrow-right(v-if="name")
      .item.ib.cp.mr20
        .name.f14.vm.ib.pr10 {{name}}

</template>


<style lang="stylus">
.comp-crumb
  height 60px
  line-height 60px
</style>
