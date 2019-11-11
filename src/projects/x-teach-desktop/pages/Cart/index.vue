<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      // isAllChecked: true,
      cards: {},
    }
  },
  created() {
    this.getIntegral()
  },
  computed: {
    ...mapState({
      user: state => state.user,
      cart: state => state.cart,
      currCard: state => state.currCard, // 优惠券
      payTypes: state => state.payTypes,
      choosePayType: state => state.choosePayType,
    }),
    ...mapGetters(['cartList', 'totalCart']),
    isAllChecked() {
      for (const item of this.cartList) {
        if (item.checked) {
          return true
        }
      }
      return false
    },
  },
  watch: {
    user() {
      this.getIntegral()
    },
  },
  methods: {
    check(flag) {
      for (const item of this.cartList) {
        this.$set(item, 'checked', flag)
      }
    },
    getIntegral() {
      if (!this.$user) return
      this.$service.intearal
        .MyList({ pageNum: 1, pageOffset: 100 })
        .then(res => {
          this.cards = this.distinct(res.data)
          console.log(this.cards, 11111)
        })
    },
    distinct(data) {
      let obj = {}
      data.forEach(item => {
        obj[item.coupon_money] = item
      })
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key]
        }
      }
      return obj
    },
    itemCheckHandler(item) {
      this.$set(item, 'checked', !item.checked)
      // item.checked = !item.checked
    },
    changeAllCheck() {
      // 全部选中的情况下, 才全部反选
      let shouldCheck = false
      for (const item of this.cartList) {
        if (!item.checked) {
          shouldCheck = true
          break
        }
      }
      this.check(shouldCheck)
    },
    // 清空全部
    cleanAll() {
      this.$service.cart.clean().then(res => {
        this.$store.state.cart = {}
      })
    },
    // 清空选中
    clean() {
      // this.$service.cart.clean()
      this.$service.cart.del({ ids: this.totalCart.checkedIds })
      this.totalCart.checkedIds.forEach(id => {
        this.$delete(this.cart, id)
      })
    },
    del(item) {
      if (this.$user) {
        this.$service.cart.del({ ids: [item.id] })
      }
      this.$delete(this.cart, item.id)
    },
    changePay(type) {
      this.$store.state.choosePayType.pay_from = type
    },
    pay() {
      if (!this.$user) {
        this.$message.error('请登陆!')
        return
      }
      if (!this.totalCart.checkedNum) {
        this.$message.error('请选择商品!')
        return
      }
      let coupon
      if (this.currCard) {
        coupon = this.cards[this.currCard].id
      }
      let data = {
        goods: this.totalCart.checkedIds,
        redirect: window.location.href.replace(/(?:cart).*/, 'user/course'),
        ...this.choosePayType,
        coupon,
      }
      this.$service.cart
        .pay(data)
        .then(res => {
          location.href = res.data
        })
        .catch(({ payload, message }) => {
          this.$message.error(payload.message)
        })
    },
    add() {
      this.$openReplyDialog()
        .then(res => {
          //console.log(res)
        })
        .catch(err => {
          //console.log(err)
        })
    },
  },
}
</script>

<template lang="pug">
  div 
    NormalWrap
      .page-cart.c_f5_bg
        .cbox.c_f_bg
          .top.bd_line.c_4.f16 
            span 购物车 
            .btns.fr
              //- .mybtn.og(@click="cleanAll") 清除购物车
              .mybtn.og(@click="clean") 删除
          .content 
            .table-wrap 
              table.table 
                thead 
                  tr 
                    th 
                      div.cp(@click="changeAllCheck")
                        NormalCheck( :checked="isAllChecked"  )
                        span.ml20 全选 
                    th 课程名称
                    th 单价(元)
                    th 操作
                tbody 
                  tr(
                    :key="item.id" 
                    v-for="item in cartList"
                  )
                    td 
                      div.vm-all.cp( @click="itemCheckHandler(item)" )
                        NormalCheck( :checked="item.checked"  )
                        img.img.ml20( :src="item.img"  alt="alt")
                    td 
                      div.ellipsis
                        span {{item.name}}    
                    td 
                      div.c_price ￥{{item.price}}
                    td(width="100")
                      .btns  
                        el-button( @click="del(item)" plain size="small") 删除
                        //- el-button(plain size="small" type="danger") 删除
            .pay-type(v-if="cards && cartList.length")
              .name.f18
                span 使用优惠券
                span.f14.c_9.pl20 (扣除的优惠券将在取消订单后返还)
              .types 
                el-select( v-model="$store.state.currCard" placeholder="请选择")
                  el-option(
                    key="item"
                    label="不使用优惠券"
                    :value="null")
                  el-option(
                    v-for="item,key in cards"
                    :key="item.id"
                    :label="item.coupon_name"
                    :value="item.coupon_money"
                    v-show="item.coupon_money<=totalCart.price")
            .pay-type
              .name.f18  支付方式
              .types 
                .ls  
                  .item.ib.c_f5_bg.bbox( 
                    v-for="item,key in payTypes"
                    :class="{checked: key === choosePayType.pay_from }"  
                    @click="changePay(key)"
                  )   
                    .icon(:class="item.icon")
            .total.fix.c_f5_bg.c_4
              .ib.f16 
                span 已选择
                span.c_price {{totalCart.checkedNum}}
                span 件商品
              .btns.fr 
                .ib.price
                  span 总计：
                  span.f24.c_price.f600 ￥{{totalCart.price}}
                  //- span (可获得积分 46)
                .mybtn.og(@click="pay") 去支付 
            
</template>
<style lang="stylus">
.page-cart
  padding 30px 0px
  >.cbox
    >.top
      height 60px
      line-height 60px
      padding 0 30px
    >.content
      padding 30px
      >.table-wrap
        margin-top 0
        >.table
          td
            max-width 300px
            .img
              width 160px
              height 90px
      >.total
        height 90px
        line-height 90px
        padding 0 30px
        >.btns
          >.price
            margin 0 20px
            >.c_price
              margin-right 10px
      >.pay-type
        margin 30px 0
        >.name
          height 50px
        >.types
          >.ls
            >.item
              border-radius 6px
              margin-right 50px
              box-sizing border-box
              border 2px solid #fff
              &.checked
                border 2px solid #309fc3
</style>
