/*
 * @Author: bingbing.geng
 * @Date: 2022-11-03 08:42:14
 * @LastEditTime: 2022-11-03 11:01:56
 * @FilePath: \cicd-vue\src\api\article.js
 */
import { axios } from '@/services'

export async function getList (params) {
  return axios.get('/getList', { params })
}

export async function getArticleById (params) {
  return axios.post('/getArticleById', { id: params })
}

export async function postSave (data) {
  return axios.post('/article/save', data)
}

export async function postUpdate (data) {
  return axios.post('/article/update', data)
}

export async function postDelete (data) {
  return axios.post('/article/delete', data)
}