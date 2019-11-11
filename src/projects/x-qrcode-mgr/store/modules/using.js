export default  {
  state:{
    list:null,
    groupList:null,
    page:null,
  },
  mutations:{
    setUselist(state, data){
      state.list = data
    },
    setUselistPage(state, data){
      state.page = data
    },
    setUseGrouplist(state, data){
      state.groupList = data
    },
  },
  actions:{}, //异步操作state
  getters:{},
}
