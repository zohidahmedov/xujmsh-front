import request from '../libs/axios'

const slug = '/auth'

export function login() {
  return request({
    url: `${slug}/login`,
    method: 'post',
  })
}
export function me() {
  return request({
    url: `${slug}/me`,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: `${slug}/logout`,
    method: 'get',
  })
}
