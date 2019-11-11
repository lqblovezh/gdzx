import Vue from 'vue'
import { mapState } from 'vuex'
import { sync } from 'vuex-router-sync'
import App from './pages/App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import service from 'services/x-teach/front'
import * as signin from 'services/x-teach/signin'
import { installGlobalComponents } from './components'
import initGlobalMethod from './common/js/initUtil'
import objectFitImages from 'object-fit-images'
import { getRouteObj } from './common/js/util'
import './static/video/video.min.js'

import './common/css'
import UIDialog from './common/js/dialog'

Vue.prototype.$service = service
Vue.prototype.$service.signin = signin
Vue.use(installGlobalComponents)
Vue.use(initGlobalMethod)
Vue.use(UIDialog) // 注册弹框插件

export function createApp() {
  const store = createStore()
  const router = createRouter()
  router.beforeEach((to, from, next) => {
    globalRouterHandler({ to, from, store, next })
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
  mounted() {
    this.$nextTick(() => {
      objectFitImages(false, {
        watchMQ: true,
      })
    })
  },
  computed: {
    ...mapState({
      $user: state => state.user,
    }),
  },
})

// 全局路由钩子, 全写这里面
function globalRouterHandler({ to, from, store, next }) {
  if (to.matched && to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    if (global.sessionStorage) {
      if (!sessionStorage.getItem('token')) {
        store.state.loginDialogCurrKey = 'login'
        store.state.isLoginDialog = true
        if (location.href.indexOf(to.path) > -1) {
          next(getRouteObj('/home'))
        }
      } else {
        next()
      }
    } else if (global.apitoken) {
      next()
    } else {
      store.state.loginDialogCurrKey = 'login'
      store.state.isLoginDialog = true
      next(getRouteObj('/home'))
    }
  } else {
    next()
  }
}
