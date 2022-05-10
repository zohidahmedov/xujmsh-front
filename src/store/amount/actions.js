import {
  store, service,
} from '@/api/payment'

export const actions = {
  // eslint-disable-next-line no-unused-vars
  store(commit, data) {
    return new Promise((resolve, reject) => {
      store(data)
        .then(res => {
          resolve(res)
        })
        .catch(res => {
          reject(res)
        })
    })
  },
  service({ commit }, id) {
    return new Promise((resolve, reject) => {
      service(id).then(res => {
        // console.log(res.data)
        commit('SET_ITEMS', res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
}
