import request from '../libs/axios'

const slug = '/amount'

// eslint-disable-next-line import/prefer-default-export
export function store(data) {
  return request({
    url: slug,
    method: 'post',
    data,
  })
}
export function service(id) {
  return request({
    url: `flat-service/${id}`,
    method: 'get',
  })
}
