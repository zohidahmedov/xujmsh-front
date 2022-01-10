import Cookies from 'js-cookie'
import { removeItem } from '@/utils/storage'

const accessTokenKey = 'xujmsh_access_token'
const accessTokenKeyTime = 'access_token_time'
const refreshTokenKey = 'refresh_token'

export function getToken() {
  return Cookies.get(accessTokenKey)
}

export function setToken(token) {
  setTokenTime()
  return Cookies.set(accessTokenKey, token)
}

export function getRefreshToken() {
  return Cookies.get(refreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(refreshTokenKey, token)
}

export function removeToken() {
  Cookies.remove(accessTokenKey)
  return Cookies.remove(refreshTokenKey)
}

export function clearForLogout() {
  Cookies.remove(accessTokenKey)
  Cookies.remove(refreshTokenKey)
  removeItem('user')
  return true
}

export function setTokenTime() {
  const d = new Date()
  d.setHours(d.getHours() + 6)
  Cookies.set(accessTokenKeyTime, d.getTime())
}

export function checkTokenTime() {
  const tokenTime = Cookies.get(accessTokenKeyTime)
  return tokenTime > (new Date()).getTime()
}
