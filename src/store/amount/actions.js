import {
  store, service
} from '@/api/amount'
import { show } from '@/api/service'

export const actions = {
  // eslint-disable-next-line no-unused-vars
  store({ commit }, data) {
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
        console.log(res)
        commit('SET_ITEMS', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
}
