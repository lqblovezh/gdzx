<script>
import MessageItem from './comp/messageItem'
import userMixins from '../user/mixins'

export default {
  mixins: [userMixins],
  components: {
    MessageItem
  },
  methods: {
    detail(item) {
     //console.log('detail',item)
    },
  }
}
</script>


<template lang="pug">
  .page-message-discuss
    .item.f14(v-for="item in list")
      MessageItem(type="info" :item="item")
    .no-data(v-if="!list.length")
      span 暂无数据
</template>
<style lang="stylus">
</style>
