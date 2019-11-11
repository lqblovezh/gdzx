<script>
export default {
  props: {
    val: {
      type: String,
      default: '',
    },
    tag: {
      type: [String, Array],
      default: '',
    },
  },
  computed: {
    res() {
      let str = this.val
      let arr
      if (!this.tag) {
        return str
      } else if (typeof this.tag === 'string') {
        arr = [this.tag]
      } else if (Array.isArray(this.tag)) {
        arr = this.tag
      }
      arr.forEach(item => {
        str = str.replace(
          new RegExp(item, 'g'),
          `<span class="txt-high" >${item}</span>`
        )
      })
      return str
    },
  },
  methods: {
    // hight(txt) {
    //   return <span class="higth" />
    // },
  },
  // render() {
  //   // if (Array.isArray(this.tag)) {
  //   //   tag.foreach(item => {
  //   //     this.val = this.val.replace(item)
  //   //   })
  //   // }

  //   return (
  //     <span class="comp-compare-txt">
  //       <span>{this.hight()}</span>
  //     </span>
  //   )
  // },
}
</script>

<template lang="pug">
  span.comp-compare-txt(v-html="res" v-if="val")
</template>


<style lang="stylus">
.comp-compare-txt
  .txt-high
    color #ff8d00
</style>
