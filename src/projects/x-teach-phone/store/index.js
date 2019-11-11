import Vue from 'vue'
import Vuex from 'vuex'

import common from './common/'
import user from './user/'
// import course from './course'
import course from './course/rewrite'
import category from './category'
import search from './search'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: () => ({
      historyRouteLength: 0,
    }),
    modules: {
      common,
      user,
      category,
      course,
      search,
    },
  })
}
