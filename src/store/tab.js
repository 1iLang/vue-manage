export default {
  state: {
    isCollapse: false,
    pageName:'00'
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    changePageName(state,pName){
      state.pageName = pName
    }
  }
}