import * as globalFuncs from './globalFuncs.js'
import directives from './directives'
import filters from './filters'

export default {
  install(Vue) {
    injectDirectives(Vue)
    injectGlobalFuncs(Vue)
    injectFilters(Vue)
  }
}

function injectGlobalFuncs (Vue) {
  for (let i in globalFuncs) {
    if (Vue.prototype['$'+i]) {
      throw new Error(`This method: $${i} has defined`)
    } else {
      Vue.prototype['$'+i] = globalFuncs[i]
    }
  }
}

function injectDirectives(Vue) {
  for (let name in directives) {
    Vue.directive(name, directives[name])
  }
}
function injectFilters(Vue) {
  for (let name in filters) {
    Vue.filter(name, filters[name])
  }
}