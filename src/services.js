/*
 * @Author: bingbing.geng
 * @Date: 2022-11-02 09:56:20
 * @LastEditTime: 2022-11-02 10:04:46
 * @FilePath: \cicd-vue\src\services.js
 */
import Axios from 'axios'

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

axios.interceptors.response.use(function (response) {
  const data = response.data
  if (data.code === 200) {
    return data.data
  }
  data.message = data.message || data.msg
  return Promise.reject(data)
})