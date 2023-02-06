import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

axios.defaults.baseURL = process.env.NODE_ENV === '/api'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDkxLCJ1c2VybmFtZSI6ImFkbWluMTIyNyIsImlhdCI6MTY3NTU4MTMwNH0.1F9J49O90wXRQulBPIMv4BcRK3K-vgXh3P2kGgavTLM'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code !== 200) {
    if (res.data.msg) Toast.fail(res.data.msg)
    if (res.data.code === 401) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default axios
