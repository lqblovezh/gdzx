export default  {
  state:{
    list:null,
    groupList:null,
    page:null,
  },
  mutations:{
    setAdlist(state, data){
      state.list = data
    },
    setAdlistPage(state, data){
      state.page = data
    },
    setAdGrouplist(state, data){
      state.groupList = data
    },
  },
  actions:{}, //异步操作state
  getters:{},
}
