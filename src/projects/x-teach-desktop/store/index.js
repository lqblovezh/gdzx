import Vue from 'vue'
import Vuex from 'vuex'
import exam from './modules/exam'
import home from './modules/home'
import lives from './modules/lives'
import userCenter from './modules/user'
import course from './modules/course'
import search from './modules/search'
import intearal from './modules/intearal'
import teacher from './modules/teacher'
import learn from './modules/learn'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      title: 'no',
      isLoginDialog: false,
      loginDialogCurrKey: 'login',
      user: '', // 用户信息
      pwd_back_code: {}, //
      cart: {}, //购物车
      currCard: '', // 优惠券
      choosePayType: {
        pay_from: 'alipay',
      },
      application: {},
      payTypes: {
        alipay: {
          name: '支付宝',
          icon: 'icon-payali',
          type: 'alipay',
        },
        wechat: {
          name: '微信',
          icon: 'icon-paywe',
          type: 'wechat',
        },
      },
    },
    actions: {
      init: ({ commit }, title) => {
        return new Promise(resolve => {
          resolve()
        })
      },
    },
    getters: {
      cartList: state => {
        let arr = []
        for (const key in state.cart) {
          if (state.cart.hasOwnProperty(key)) {
            const element = state.cart[key]
            if (element) {
              arr.push(element)
            }
          }
        }
        return arr
      },
      totalCart: state => {
        let price = 0
        let checkedNum = 0
        let checkedIds = []
        for (const key in state.cart) {
          if (state.cart.hasOwnProperty(key)) {
            const element = state.cart[key]
            if (element) {
              if (element.checked) {
                checkedNum++
                price += element.price * 1
                checkedIds.push(element.id)
              }
            }
          }
        }
        price = price.toFixed(2) * 1
        if (state.currCard && price) {
          price -= state.currCard
          if (price < 0) {
            price = 0
          } else {
            price = price.toFixed(2)
          }
        }
        return { price, checkedNum, checkedIds }
      },
    },
    mutations: {
      SET_APPLICATION(state, data) {
        state.application = data
      },
    },
    modules: {
      exam,
      home,
      lives,
      userCenter,
      course,
      search,
      intearal,
      teacher,
      learn,
    },
  })
}
