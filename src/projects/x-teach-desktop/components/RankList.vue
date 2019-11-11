<script>
export default {
  props: {
    rankFree: Array,
    rankPay: Array,
  },
  data() {
    return {
      type: 'free',
    }
  },
  methods: {
    change(type) {
      this.type = type
    },
    single(i) {
      return i < 10 ? '0' + i : i
    },
  },
}
</script>


<template lang="pug">
  .comp-rank-list.bbox
    .wrap 
      .top.f18.tc.c_9 
        .right.active_border_og(
          :class="{active:type=='free'}"
          @click="change('free')")    免费排行
        .left.active_border_og(
          :class="{active:type=='pay'}"
          @click="change('pay')")   付费排行
      .container
        .ls(v-if="type== 'free'")
          .item(v-for="item,i in rankFree" :key="item.id") 
            .inner(@click="$go('/course/detail',{id:item.course_id})")
              Tbutton(
                size="small"
                :type=" i<3 ? 'og' : 'og_plain'"
              ) {{single(i+1)}}
              .name.ellipsis.c_3.vm.ib {{item.course_name}}
        .ls(v-if="type== 'pay'")
          .item(v-for="item,i in rankPay" :key="item.id") 
            .inner(@click="$go('/course/detail',{id:item.course_id})")
              Tbutton(
                size="small"
                :type=" i<3 ? 'og' : 'og_plain'"
              ) {{single(i+1)}}
              .name.ellipsis.c_3.vm.ib {{item.course_name}}
</template>

<style lang="stylus">
.comp-rank-list
  box-shadow 0px 0px 17px 1px #e5e5e5
  width 250px
  >.wrap
    >.top
      height 50px
      line-height 50px
      border-bottom 2px solid #e0e0e0
      >div
        display inline-block
        width 50%
    >.container
      padding 10px 0px 30px 0
      >.ls
        >.item
          cursor pointer
          height 42px
          line-height 42px
          padding-left 15px
          >.inner
            >.name
              width 180px
              text-indent 20px
</style>
