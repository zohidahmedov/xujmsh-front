export const actions = {
  pushError({ commit }, message) {
    return new Promise((resolve, reject) => {
      commit('SET_ERRORS', message)
      resolve(message)
    })
  },
  closeErrors({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_ERRORS_EMPTY')
      resolve('')
    })
  },
}
