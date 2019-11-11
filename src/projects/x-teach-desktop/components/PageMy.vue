<script>
export default {
  props: {
    background: {
      default: true,
    },
    layout: {
      default: 'prev, pager, next, jumper',
    },
    total: {
      default: 1000,
    },
    pageOffset: {
      default: 1,
    },
    pageNum: {
      default: 1,
    },
  },
  methods: {
    currentChange(page) {
      this.$emit('currentChange', page)
    },
  },
  data() {
    return {}
  },
  created() {
    // console.log(this.$props,1);
  },
  // on: {
  //   currentChange: () => this.currentChange,
  // },
  // <Pagination background layout="prev, pager, next" total={1000} />
  computed: {
    newProps() {
      return {
        background: true,
        layout: 'prev, pager, next',
        total: 1000,
      }
    },
  },
  // render() {
  //   console.log('-------');
  //   return (
  //     <div class="comp-page tc">
  //       <div>
  //         <el-pagination
  //           on-current-change={this.currentChange}
  //           background
  //           layout={this.layout}
  //           currentPage={this.pageNum}
  //           pageSize={this.pageOffset}
  //           total={this.total}
  //         />
  //       </div>
  //     </div>
  //   )
  // },
}
</script>
<template lang="pug">
.comp-page.tc
  div
    el-pagination(@current-change="currentChange" :layout="layout" :currentPage="pageNum" :pageSize="pageOffset" :total="total")
</template>

<style lang="stylus">
.comp-page
  padding 60px 0
</style>
