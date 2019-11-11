<script>
export default {
  data() {
    return {

    };
  },
  props: ["detailData", "previewDialog"],
  created() {},
  components: {},
  methods: {}
};
</script>

<template lang="pug">
.modelIndex
  img#detailImg(:src="detailData" style='width:300px;')
  
</template>

<style lang="stylus" scoped>
.modelIndex
  margin 20px 0 20px 0
  overflow hidden
  max-height  80vh
  border-top 1px solid #ccc
  border-bottom 1px solid #ccc
  display flex
  justify-content center 
  align-items center
    #detailImg
      width 300px !important
      height 500px
</style>
