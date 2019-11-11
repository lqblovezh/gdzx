import './assets/css'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import service from 'services/x-teach/front'
import * as normal from 'services/common/normal'
import { createStore } from './store'
import { createRouter } from './router'

import loadingPic from './assets/img/default.png'
import errorPic from './static/img/icon-btn-teacher.png'
import gc from './components/index.js'
import { MessageBox, Toast } from 'mint-ui'
import { CascadePicker, Slide, Swipe } from 'cube-ui'
import inject from './utils/inject'

Vue.use(gc)
Vue.use(inject)
Vue.use(CascadePicker)
Vue.use(Slide)
Vue.use(Swipe)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorPic,
  loading: loadingPic,
  attempt: 1,
  listenEvents: ['scroll'],
})

Vue.prototype.$service = service
Vue.prototype.$normal = normal
Vue.prototype.$Toast = Toast
Vue.prototype.$MessageBox = MessageBox

Vue.filter('capnum', function(value) {
  if (value > 10000) {
    value = `${(value / 10000).toFixed(1)}万`
  }
  return value
})

export function createApp() {
  const store = createStore()
  const router = createRouter()
  router.beforeEach((to, from, next) => {
    store.state.historyRouteLength++
    if (!localStorage.getItem('token')) {
      store.state.userInfo = null
    }
    if (to.matched && to.matched.some(record => record.meta.auth)) {
      // 判断该路由是否需要登录权限
      if (global.localStorage) {
        if (!localStorage.getItem('token')) {
          next({ name: 'login' })
        } else {
          next()
        }
      } else if (global.apitoken) {
        next()
      } else {
        next({ name: 'login' })
      }
    } else {
      next()
    }
    // if (to.meta.auth) {
    //   try {
    //     if (global.localStorage && !global.localStorage.getItem('token')) {
    //       next({
    //         name: 'login'
    //       })
    //     } else {
    //       next()
    //     }

    //   } catch (e) {
    //     console.log(`${e.toString()}----`)
    //   }
    // } else {
    //   next()
    // }
  })
  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App),
  })
  return { app, store, router }
}
Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      })
    }
  },
})
