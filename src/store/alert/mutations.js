export const mutations = {
  SET_ERRORS: (state, error) => {
    error.time = new Date().toLocaleDateString()
    state.errors.push(error)
  },
  SET_SUCCESS: (state, success) => { state.success = success },
  SET_INFO: (state, info) => { state.info = info },

  SET_ERRORS_EMPTY: state => { state.errors = [] },
}
