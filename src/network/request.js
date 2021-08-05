import axios from "axios";

export function request(config){
  //1.创建axios实例，并设置一些默认配置，之后再通过config加入配置
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2.发送网络请求，返回的是一个promise
  return instance(config)
}