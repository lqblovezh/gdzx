<template lang="pug">
  .page-layout
    ev-header(
      :hide-right="hideRight"
      :user-define="userDefine"
      is-fixed
      @back="$emit('back')"
    ) {{ title }}
      template(#right)
        slot(name="head")
    div(:class="'full-'+pageType")
      slot
</template>
<script>
export default {
  name: 'teach-page',
  props: {
    title: String,
    hideRight: Boolean,
    pageType: {
      type: String,
      default: 'top'
    },
    userDefine: Boolean
  }
}
</script>
<style lang="stylus" scoped>
.page-layout
  background-color #f4f5f7
</style>