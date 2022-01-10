import request from '../libs/axios'

const slug = '/auth'

export function login(data) {
  return request({
    url: `${slug}/login`,
    method: 'post',
    data,
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
