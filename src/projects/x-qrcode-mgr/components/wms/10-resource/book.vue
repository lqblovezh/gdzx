<script>
import {
  main
} from '@/util/mixins'
import {
  qrcodeMixins
} from './qrcodeMixins'

export default {
  mixins: [main, qrcodeMixins],
  data() {
    return {
      product_type: 'books',
    }
  },
  methods: {},
}
</script>

<template lang="pug">
.index.clearfix
	include ./pug/tpl.pug
</template>


<style lang="stylus" scoped >
.tableWrap
	width 97%
.icon-publish
	color #44c3aa
</style>
