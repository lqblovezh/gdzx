import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import YDUI from 'vue-ydui'
import { Spinner } from 'mint-ui'
import 'vue-ydui/dist/ydui.rem.css'
import '@/assets/css/public.styl'
import '@/assets/css/login.styl'
import '@/assets/css/icon.styl'
import { toast_err, check_form } from '@/util/'
import { thirdLogin } from 'services/common/member'
import join from 'url-join'
Vue.use(YDUI)

Vue.prototype.$toast_err = toast_err
Vue.prototype.$check_form = check_form
Vue.component(Spinner.name, Spinner)

// router.beforeEach((to, from, next) => {
//   if(!window.sessionStorage.getItem('token') && !to.query.token_id && !from.query.token_id){
// 		// thirdLogin({
// 		// type:'qq_web',
// 		// back_url:location.href,
// 		// }).then(res=>{
// 		// 	location.href = res.data.login_link
// 		// })
// 		console.log('enter')
// 		next('/login')
// 	}else{
// 		// next()
// 	}
// 	// next()
// })
async function main () {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}
main()
