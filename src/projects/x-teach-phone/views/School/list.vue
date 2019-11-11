<template lang="pug">
.home
  SchoolSearch
  .index-list
    banner-swiper(:banners="banners")
    .school-list.c-bg-f
      cube-scroll(
        ref="scroll"
        :options="options"
        @pulling-up="onPullUp"
      )
        school-item(
          v-for="item in list"
          :key="item.id"
          :item="item"
        )
</template>
<script>
import qs from 'qs'
import SchoolItem from './children/school-item'
import SchoolSearch from './children/school-search'
import BannerSwiper from '@/components/common/BannerSwiper'
import loadmoreMixin from '@/mixins/loadmore'
export default {
  mixins: [loadmoreMixin],
  components: { SchoolItem, BannerSwiper, SchoolSearch },
  data () {
    return {
      banners: [],
      options: {
        click: true
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init () {
      this.queryBanners()
      this.fetch(true)
    },
    async queryBanners () {
      try {
        const { data } = await this.$service.home.getHomeSettings({ type: 'colleges_mobile' })
        if (data && data.value) {
          let temp = [], d = qs.parse(data.value)
          for (let i in d) {
            temp.push(d[i])
          }
          this.banners = temp
        }
      } catch(e) {
        console.log(e)
        // this.$catchError(e)
      }
    },
    queryList (params) {
      return this.$service.university.getList(params)
    }
  }
}
</script>
<style lang="stylus">
.index-list
  position relative
  height 100%
  > div
    margin-bottom 0.2rem
  .school-list
    position absolute
    top 3.72rem
    bottom 0
    left 0
    right 0
</style>
