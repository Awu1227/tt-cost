import axios from 'axios'
import { showFailToast } from 'vant'
import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

service.defaults.headers.post['Content-Type'] = 'application/json'

// request interceptor
service.interceptors.request.use(config => {
  // do something before request send
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers.Authorization = `${localStorage.getItem('token') || null}`
  return config
},
error => {
  // do something  with request error
  console.log(error)
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 200) {
    if (res.msg) showFailToast(res.msg)
    if (res.code === 401) {
      router.push({ path: '/login-register' })
    }
    return Promise.reject(res.msg)
  }
  return res
})

export default service
