import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  //拦截器
  instance.interceptors.request.use(config =>{
    return config
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  //发送真正的网络请求
  //返回的是promise
  return instance(config)
}