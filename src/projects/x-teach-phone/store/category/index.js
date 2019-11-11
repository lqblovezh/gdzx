import {
  search
} from 'services/x-teach/front/search'

module.exports = {
  namespaced: true,
  state: {
    list: [],
    loaded: false,
    ids: null,
    page: {
      pageStart: 0,
      pageOffset: 10
    }
  },
  mutations: {
    set_list(state, data) {
      state.list = data
    },
    set_page(state, data) {
      state.page = Object.assign(state.page, data)
    },
    toggle_loaded_status(state, data) {
      state.loaded = data
    },
    set_ids(state, data) {
      state.ids = data
    }
  },
  actions: {
    async queryCourseList({ commit, state }, {
      clear = false,
      ...queries
    }) {
      if (clear) {
        commit('set_page', { pageStart: 0 })
        commit('toggle_loaded_status', false)
        commit('set_ids', queries)
      }
      try {
        const { data, page } = await search({
          type: 1,
          ...state.ids,
          ...state.page
        })
        let list = [...state.list]
        if (data && !clear) {
          list = [...list, ...data]
        } else if (data && clear) {
          list = data
        } else {
          list = []
        }
        commit('set_list', list)
        commit('set_page', { pageStart: list.length })
        if (page.total === list.length) {
          commit('toggle_loaded_status', true)
        }
      } catch (e) {
        console.log(e.toString())
        commit('set_list', [])
      }
    }
  }
}
