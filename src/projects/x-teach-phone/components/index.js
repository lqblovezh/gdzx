import globalComponents from './comp'

let gc = {}

gc.install = function(Vue, options) {
  for (let i in globalComponents) {
    Vue.component(globalComponents[i].name || i, globalComponents[i])
  }
}
export default gc