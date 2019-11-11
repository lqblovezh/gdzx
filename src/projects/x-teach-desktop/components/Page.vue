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
    pageSize: 10,
    currentPage: 1,
  },
  methods: {},
  data() {
    return {}
  },
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
  render() {
    return (
      <div class="comp-page tc">
        <div>
          <el-pagination
            background
            currentPage={this.currentPage}
            total={this.total}
            layout={this.layout}
            pageSize={this.pageSize}
          />
        </div>
      </div>
    )
  },
}
</script>
<template lang="pug">
//- .comp-page.tc
//-   div
//-     el-pagination(backgorund :currentPage="currentPage" :total="total" :layout="layout" :pageSize="pageSize")
</template>

<style lang="stylus">
.comp-page
  padding 70px 0
</style>
