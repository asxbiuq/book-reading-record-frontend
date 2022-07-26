import axios from 'axios'

const state = $(useLocalState())

// 创建一个独立的axios实例
const service = axios.create({
  // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
  baseURL: import.meta.env.VITE_COMMENT_URL,
  // 定义统一的请求头部
  // headers: {
  //    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  // },
  // 配置请求超时时间
  // timeout: 10000,
  // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
  // withCredentials: true
})
// 请求拦截
service.interceptors.request.use((config) => {
  // 自定义header，可添加项目token
  config.headers.Authorization = `Bearer ${state.token}`
  return config
})

const useAxiosService = () => {
  return { service }
}

export default useAxiosService
