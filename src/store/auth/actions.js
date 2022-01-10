import { me, login, logout } from '@/api/auth'
import { setToken, clearForLogout } from '@/utils/auth'

export const actions = {
  me({ commit }) {
    return new Promise((resolve, reject) => {
      me()
        .then(res => {
          if (res.success && res.data) {
            commit('SET_IS_AUTH', true)
            commit('SET_USER', res.data)
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  login({ commit }, credientials) {
    return new Promise((resolve, reject) => {
      login(credientials)
        .then(res => {
          commit('SET_USER', res.data.user)
          commit('SET_IS_AUTH', true)
          setToken(res.data.access_token)
          resolve()
        }).catch(err => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().finally(() => {
        clearForLogout()
        commit('SET_USER', null)
        commit('SET_IS_AUTH', false)
        resolve(true)
      })
    })
  },
}
