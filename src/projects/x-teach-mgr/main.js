// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import config from './config'
import progress from './util/progress'
import '@/static/theme/index.css'
import ElementUI from 'element-ui'
import vali from './util/vali'
import TimePick from '@/components/common/TimePick'
import VaForm from 'projects/x-publish-mgr/components/common/VaForm'
import MetaData from 'projects/x-publish-mgr/components/common/metaData'
import TPL from '@/components/common/tpl'
import Icon from '@/components/common/Icon'
import { getChecked, checkAll, unCheck, globalUpdateFile } from './util/dom'
import { platInfo } from 'services/x-publish/common'
import { isLogin } from 'services/common/manager'
import store from './store'
import './assets/css/incon-fonts.css'
import './assets/css/commom.styl'
import './assets/css/el-reset.styl'
import './assets/css/reset.css'
import animated from 'animate.css'
import { addFavicon } from 'projects/common/util'

if (process.env.NODE_ENV === 'development') {
  global.log = console.log
  global.dir = console.dir
} else {
  global.log = _ => ''
  global.dir = _ => ''
}
Vue.config.productionTip = false
Vue.prototype.$config = config //全局配置文件
Vue.prototype.$getChecked = getChecked
Vue.prototype.$checkAll = checkAll
Vue.prototype.$unCheck = unCheck
Vue.prototype.$globalUpdateFile = globalUpdateFile

Vue.use(ElementUI)
Vue.use(vali)
Vue.use(animated)
Vue.use(progress) //进度插件

Vue.component('TimePick', TimePick) //全局时间
Vue.component('VaForm', VaForm) //全局表单验证
Vue.component('Icon', Icon) //全局图标按钮
Vue.component('MetaData', MetaData) //全局元数据
Vue.component('TPL', TPL) //全局上架弹框

router.beforeEach(async (to, from, next) => {
  try {
    await isLogin().then(res => {
      sessionStorage.userFlag = 'true'
      Vue.prototype.$config.userInfo = res.data
      Vue.prototype.$config.isTeacher = res.data.user.is_teacher
    })
    await platInfo({ id: 'current' }).then(res => {
      const { application } = res.data
      Vue.prototype.$config.plantInfo = application
      let icon = application && application.icon_absolute
      addFavicon(icon)
    })
    next()
  } catch (error) {
    console.error(error)
    // location.href = '../'
  }
})

// 用于关闭全局input输入时的默认提示
Vue.mixin({
  mounted() {
    this.$nextTick(() => {
      let node = document.querySelectorAll('input')
      node.forEach(item => {
        item.setAttribute('autocomplete', 'off')
      })
    })
  },
})

async function main() {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  })
}

main()
