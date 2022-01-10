import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken, clearForLogout } from '@/utils/auth'
import { errorsAlert } from '@/utils/requestAlerts'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 500000, // request timeoutqs
})
service.interceptors.request.use(
  config => {
    // store.commit('app/TOGGLE_OVERLAY', true)
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  response => {
    store.commit('app/TOGGLE_OVERLAY', false)
    const res = response.data
    if (response.status !== 200) {
      console.log('service.interceptors.response.use response', response)
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  error => {
    // store.commit('app/TOGGLE_OVERLAY', false)
    errorsAlert(error.response)
    if (error.response.status == 401) {
      logout()
    }
    return Promise.reject(error.response)
  },
)

function logout() {
  clearForLogout()
  return router.push({ name: 'auth-login' })
}

export default service
