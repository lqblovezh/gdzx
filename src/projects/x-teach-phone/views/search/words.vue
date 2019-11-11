<script>
import { mapState } from 'vuex'

import WordPanel from './comp/WordPanel'
export default {
  asyncData ({ route, store }) {
    return store.dispatch('search/getHots')
  },
  data () {
    return {
      search_list: []
    }
  },
  components: {
    WordPanel
  },
  computed: {
    ...mapState('search', {
      hots: state => state.hots
    })
  },
  mounted () {
    this.getHistoryList()
  },
  methods: {
    getHistoryList () {
      this.search_list = JSON.parse(localStorage.getItem('history_list')) || []
    },
    clearAll() {
      localStorage.clear('history_list')
      this.getHistoryList()
    },
  }
}
</script>
<template lang="pug">
.page-word
  .container
    WordPanel(title="搜索历史" :list="search_list")
      span.icon-trash.fr(@click="clearAll")
    WordPanel(title="热门搜索" :list="hots")
</template>