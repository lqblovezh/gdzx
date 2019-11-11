<script>
import IntegralList from '../integral/comp/IntegralList'
import userMixins from './mixins'
import openWindow from 'window-open'
import * as Position from 'projects/common/util/position'

export default {
  mixins: [userMixins],
  components: {
    IntegralList,
  },
  methods: {
    exchange(item) {
      if (item.type == 'resources' && item.url) {
        openWindow(item.url, {
          width: Position.getViewWidth() - 100,
          height: Position.getViewHeight() - 100,
          name: '_blank',
        })
        // window.location.href = item.url
      }
    },
  },
}
</script>

<template lang="pug">
  .page-user-integral
    //- .integral 已有积分：
    //-   span.c_og 250
    IntegralList(:list="list" @click="exchange")
    .page-wrap 
      PageMy(
        @currentChange="pageChangeHandler"
        :total="page.total"
        :pageOffset="page.pageOffset"
        :pageNum="page.pageNum"
      )
</template>

<style lang="stylus">
.page-user-integral
  padding 30px
  >.integral
    margin-bottom 20px
</style>
