<script>
export default {
  props: {
    checked: {
      default: false,
    },
  },
}
</script>


<template lang="pug">
  label.el-checkbox( )
    span.el-checkbox__input(:class="{'is-checked':checked}" )
      span.el-checkbox__inner
</template>

<style lang="stylus">
</style>
