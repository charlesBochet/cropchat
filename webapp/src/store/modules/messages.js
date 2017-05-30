const state = {
  errorMessages: [],
  warningMessage: '',
  infoMessage: '',
  successMessage: ''
}

const getters = {
  getErrors (state) {
    return state.errorMessages
  },
  getWarning (state) {
    return state.warningMessage
  },
  getInfo (state) {
    return state.infoMessage
  },
  getSuccess (state) {
    return state.successMessage
  }
}

const mutations = {
  setErrors (state, errors) {
    for (var i = 0; i < errors.length; i++) {
      console.log(errors[i])
      if (errors[i].error) {
        state.errorMessages.push(errors[i].error)
      }
    }
  },
  resetMessages (state) {
    state.errorMessages = []
    state.warningMessage = ''
    state.infoMessage = ''
    state.successMessage = ''
  },
  setError (state, error) {
    state.errorMessages.push(error)
  },
  setWarning (state, warning) {
    state.warningMessage = warning
  },
  setInfo (state, info) {
    state.infoMessage = info
  },
  setSuccess (state, success) {
    state.successMessage = success
  }
}

const actions = {
  error (context) {
    context.commit('setErrors')
  },
  warning (context) {
    context.commit('setWarning')
  },
  info (context) {
    context.commit('setInfo')
  },
  success (context) {
    context.commit('setSuccess')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
