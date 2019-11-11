<script>
import { mapState } from 'vuex'
export default {
  props: {
    tabInfo: {
      type: Array,
      default() {
        return []
      },
    },
    isBuy: Boolean,
  },
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapState('course', {
      detail: state => state.info,
    }),
  },
  methods: {
    go(item) {
      if (!this.userInfo) {
        this.$router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath },
        })
        return
      }
      if (
        this.toNumber(this.detail.effective_duration_start) >
        this.toNumber(this.detail.the_server_time)
      ) {
        return this.$Toast('学习未开始!')
      }
      if (
        this.toNumber(this.detail.effective_duration_end) <
        this.toNumber(this.detail.the_server_time)
      ) {
        return this.$Toast('学习已结束!')
      }
      this.isBuy
        ? this.$router.push({
            path: 'keshi',
            query: { course_hour_id: item.id },
          })
        : this.$Toast('请先购买！')
    },
    toNumber(time) {
      return Number(new Date(Date.parse(time)))
    },
  },
}
</script>
<template lang="pug">
.course-padding.step-container
  .step-list
    .step-item(v-for="i,index in tabInfo" :key="i.id" @click="go(i)")
      .step-item__keshi 课时{{index+1}}
      .step-item__title {{i.name}}
      .step-item__intro.ell3 {{i.abs}}
</template>
<style lang="stylus" scoped>
.step-container
  .step-item
    padding-bottom 0.6rem
    font-size 13px
    .step-item__keshi
      color rgb(51, 51, 51)
      margin-bottom 0.18rem
    .step-item__title
      color rgb(52, 150, 225)
      font-size 16px
      margin-bottom 0.2rem
    .step-item__intro
      color rgb(69, 69, 69)
      opacity 0.9
      line-height 0.4rem
</style>
