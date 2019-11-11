<script>
export default {}
</script>



<template lang="pug">
  .comp-course-search 
    .wrap 
      input.course_inp(placeholder="班级名称")
      .ib
        Tbutton(icon="search-white" )

</template>


<style lang="stylus">
.comp-course-search
  display inline-block
  >.wrap
    >.ib
      margin-left 22px
      >div
        height 34px
        line-height 28px
        width 52px
        text-align center
        padding 0px
</style>
