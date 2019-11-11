<script>
import integralBooks from './integralBooks'
import integralCoupon from './integralCoupon'
import integralResources from './integralResources'

export default {
  components: { integralBooks, integralCoupon, integralResources },
  data() {
    return {
      ids: [],
      sourcesType: 'books',
      tabList: [
        {
          type: 'books',
          name: '纸质书',
        },
        {
          type: 'resources',
          name: '资源',
        },
        {
          type: 'coupon',
          name: '优惠券',
        },
      ],
    }
  },
  methods: {
    change(type) {
      this.sourcesType = type
    },
    isOnline(data) {
      this.detailData = data
      if (data.state == 'false') {
        this.dialogVisible = true
        return
      }
      service
        .isOnline({
          id: data.id,
        })
        .then(_ => {
          this.$message.success('下架成功')
          this.detailData.state = 'false'
        })
    },
    send() {
      service
        .isOnline({
          id: this.detailData.id,
          integral: this.detailData.integral,
          limit: this.detailData.limit,
        })
        .then(res => {
          if (res.data) {
            this.$message.success('上架成功')
            this.detailData.state = 'true'
          }
        })
      this.dialogVisible = false
    },
  },
  computed: {
    componentType() {
      switch (this.sourcesType) {
        case 'books':
          return 'integralBooks'
        case 'resources':
          return 'integralResources'
        case 'coupon':
          return 'integralCoupon'
          break
        default:
          return 'integralCoupon'
          break
      }
    },
  },
}
</script>

<template lang="pug">
.index
  .navTab
    el-button-group
      el-button(@click="change(item.type)" :type="sourcesType==item.type?'primary':''" v-for="item in tabList" :key="item.name") {{item.name}}
  component(:is="componentType" slot="list") 
</template>

<style lang="stylus" scoped>
.navTab
  padding 20px
</style>
