import axios from 'axios'

const request = axios.create({
  baseURL: '/',
  timeout: 20000
})

request.interceptors.response.use(res => {
  return Promise.resolve(res.data)
}, err => {
  return Promise.reject(err)
})

export default request
