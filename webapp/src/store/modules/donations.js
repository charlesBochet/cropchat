const state = {
  total_donations: 0
}

const getters = {
  getDonationsTotal (state) {
    return state.total_donations
  }
}

const mutations = {
  setDonationTotal (state, context) {
    state.total_donations = (parseFloat(context.total_donations) / 100)
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
