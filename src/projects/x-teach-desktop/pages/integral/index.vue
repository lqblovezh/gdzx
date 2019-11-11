<script>
import IntegralList from './comp/IntegralList'
import Detail from './comp/Detail'
import { mapActions, mapState } from 'vuex'

export default {
  async asyncData({ store, route }) {
    return store.dispatch('intearal/getList', route.query)
  },
  components: {
    IntegralList,
    Detail,
  },
  computed: {
    ...mapState('intearal', {
      page: state => state.page,
      list: state => state.list,
    }),
    ...mapState({
      user: state => state.user,
    }),
  },
  data() {
    return {
      detailDialog: false, // 详情弹出层
      currentItem: null, // 当前兑换的类型
      currentNave: 'books',
      tabList: [
        {
          type: 'books',
          name: '纸书',
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
  created() {
    if (this.$route.query.type) {
      this.currentNave = this.$route.query.type
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch('intearal/getList', to.query)
    next()
  },
  methods: {
    exchange(item) {
      if (!this.user) {
        return this.$message.warning('请先登录')
      }
      this.currentItem = item
      this.detailDialog = true
    },
    pageChangeHandler(pageNum) {
      this.$go('/integral-mall', { pageNum })
    },
    close() {
      this.statusDialog = this.detailDialog = this.addressDialog = false
    },
    ...mapActions('intearal', ['getList']),
  },
  provide() {
    return {
      close: this.close,
      submit: this.submit,
    }
  },
  watch: {
    currentNave() {
      this.$go('/integral-mall', { type: this.currentNave, pageNum: 1 })
    },
  },
}
</script>

<template lang="pug">
  .page-integral-mall
    Top(:search="false")
    //- TopNav( :activeIndex="3")
    .wrap.c_f5_bg
      .navbar.cbox
        el-radio-group(v-model="currentNave" size="mini")
          el-radio-button(:label="item.type" v-for="item,index in tabList" :key="item.name" :class='{active:currentNave=="item.type"}') {{item.name}}
      .conatiner.cbox.c_f_bg
        IntegralList(:list="list" @click="exchange")
        .page-wrap
          PageMy(
            @currentChange="pageChangeHandler"
            :total="page.total"
            :pageOffset="page.pageOffset"
            :pageNum="page.pageNum"
          )
      .dialog
        Detail(
          :item="currentItem"
          :currentNave="currentNave"
          :detailDialog.sync="detailDialog"
          v-if="detailDialog"
        )
    MainFooter
</template>

<style lang="stylus">
.page-integral-mall
  >.wrap
    padding 30px 0 70px 0
    .navbar
      height 78px
      line-height 90px
      background #fff
      box-sizing border-box
      border-bottom 1px solid #ebebeb
      padding 0 30px
    >.conatiner
      padding 30px
      box-sizing border-box
    >.dialog
      .el-dialog
        border-radius 4px
      .el-dialog__header
        border-bottom 1px solid #e6e6e6
        font-size 18px
        color #4c4c4c
      .el-dialog__body
        padding 40px 30px
</style>
