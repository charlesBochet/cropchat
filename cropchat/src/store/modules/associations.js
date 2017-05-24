const state = {
  list: [],
  selected: {}
}

const getters = {
  getAssociations (state) {
    return state.list
  },
  getAssoById (state, id) {
    return state.list.filter(asso => asso.id === id)
  },
  getSelectedAssociation (state) {
    return state.selected
  }
}

const mutations = {
  selectAssoById (state, id) {
    var assos = state.list.filter(asso => asso.id === id)
    state.selected = assos[0]
  },
  setAssoList (state, context) {
    if (context.list) {
      console.log('setting asso list')
      state.list = context.list
      return
    }
    console.log('not setting asso list')
  },
  resetAssoList (state) {
    state.list = []
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
