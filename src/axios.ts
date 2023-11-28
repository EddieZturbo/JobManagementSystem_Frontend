import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://' : 'http://',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 60000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 可以在发送请求之前做些事情
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 可以在这里对响应数据做些处理
    return response.data
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  },
)

const axiosInstance = {
  get: (url: string, config?: AxiosRequestConfig) => instance.get(url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig) => instance.post(url, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) => instance.put(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) => instance.delete(url, config),
}

export default axiosInstance
