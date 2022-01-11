import request from '../libs/axios'

const slug = '/flats'

export function index(params) {
  return request({
    url: slug,
    method: 'get',
    params,
  })
}

export function show(id) {
  return request({
    url: `${slug}/${id}`,
    method: 'get',
  })
}

export function store(data) {
  return request({
    url: slug,
    method: 'post',
    data,
  })
}

export function update(data) {
  console.log(data)
  return request({
    url: `${slug}/${data.id}`,
    method: 'put',
    data,
  })
}

export function destroy(id) {
  return request({
    url: `${slug}/${id}`,
    method: 'delete',
  })
}
