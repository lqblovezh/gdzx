import {
  SET_RESOURCE_LIST,
} from '../types'
// import * as services from 'services/x-library-pro/implement/hymz'


export default {
  namespaced: true,
  state: {
		resource_list: []  
	},
  mutations: {
    [SET_RESOURCE_LIST](state, data) {
     	state.resource_list = data
    },
  },
  actions: {
    async init({ dispatch }, payload) {

    },
	}
}
