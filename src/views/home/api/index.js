import request from 'utils/request.js'

export function getTypeList () {
  return request({
    url: '/api/type/list',
    method: 'get'
  })
}
export function addBill (data) {
  return request({
    url: '/api/bill/add',
    method: 'post',
    data
  })
}
