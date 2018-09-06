import axios from 'axios'

axios.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})

export default {
  install (Vue, options) {
    const instance = axios.create({
      baseURL: 'http://127.0.0.1:8000',
      timeout: 20000,
      validateStatus: function (status) {
        return status < 500
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json'
      }
    })
    Vue.prototype.$axios = instance
  }
}
