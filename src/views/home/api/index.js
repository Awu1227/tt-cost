import request from 'utils/request.js'

export function getTypeList () {
  return request({
    url: '/api/type/list',
    method: 'get'
  })
}
