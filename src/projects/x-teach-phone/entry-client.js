import { createApp } from './app'
import setToken from 'projects/common/util/setToken'

setToken()
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

global.log = console.log

router.onReady(() => {
  hidePreLoad()

  app.$mount('#app')
})

function hidePreLoad() {
  let node = document.querySelector('.my-pre-mask')
  if (node) {
    node.classList.add('load-hide')
    setTimeout(() => {
      node.style.display = 'none'
    }, 600)
  }
}
